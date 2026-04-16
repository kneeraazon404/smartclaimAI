import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@/lib/auth";

const fieldNames = [
  "chronic_wound_4wks",
  "measurement_4wks_ago",
  "current_measurement",
  "wound_decreased_50",
  "failed_response",
  "wound_clean",
  "culture_date",
  "infection_confirmed",
  "rx_iv_date",
  "adequate_circulation",
  "referred_for_abi",
  "abi_test_date",
  "abi_results",
  "surgery_needed",
  "surgery_date",
  "surgery_details",
  "dfu_present",
  "diabetes_type1_or_2",
  "active_diabetes_mgmt",
  "offloading_measures",
  "edema_control",
  "edema_explanation",
  "underlying_issues_eliminated",
  "xray_mri_date",
  "imaging_results",
  "debridement_done",
  "vsu_present",
  "referred_for_venous_insufficiency",
  "vascular_assessment_results",
  "vascular_test_date",
  "vsu_abi_results",
  "vsu_surgery_date",
  "compression_provided",
  "compression_start_date",
  "compression_tolerance_explanation",
  "vsu_wound_free_infection",
  "vsu_culture_date",
  "healing_environment_provided",
  "other_offloading_measures",
  "xray_bony_area",
  "xray_date",
  "xray_results",
  "other_wound_free_infection",
  "other_culture_date",
  "smoking_counseling",
  "doctor_notes",
  "general_notes",
];

const FieldEvaluation = z.object({
  status: z.enum(["pass", "fail"]),
  reason: z.string(),
});

const EvaluationSchema = z.object(
  Object.fromEntries(fieldNames.map((name) => [name, FieldEvaluation])),
);

export async function POST(req: NextRequest) {
  // Require authentication — evaluate is a paid API call
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const input = await req.json();

    const systemPrompt = `
You are a licensed medical evaluator specializing in wound care. Your task is to assess a wound checklist based on clinical standards and CMS Medicare LCD Novitas guidelines for coverage of Cellular and Tissue-Based Products (CTPs) or skin substitutes.

The input JSON contains various fields related to wound care. For each field, you will evaluate whether the provided value meets the criteria outlined in the LCD guidelines.

Evaluation logic:
- The wound must be chronic (lasting more than 4 weeks).
- The wound must be clean and free of infection.
- All reasoning should reflect whether the field supports or violates coverage.

Return a valid JSON object where each key is the original field name and the value is:
{
  "status": "pass" | "fail",
  "reason": "short explanation of clinical reasoning (even for pass)"
}

Do not omit any fields from the output.
`;

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Evaluate the following wound checklist JSON:\n\n${JSON.stringify(input, null, 2)}\n\nReturn the evaluation result in JSON.`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "LLM",
      messages,
      response_format: zodResponseFormat(EvaluationSchema, "evaluation"),
    });

    const content = completion.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "AI returned an empty response. Please try again." },
        { status: 500 },
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      console.error("[EVALUATE] JSON parse error");
      return NextResponse.json(
        { error: "AI returned an unstructured response. Please try again." },
        { status: 500 },
      );
    }

    const { error: dbError } = await supabase.from("wound_checklist").insert({
      username: session.user?.email ?? session.user?.id ?? "unknown",
      input_data: input,
      evaluation_result: parsed,
    });

    if (dbError) {
      // Log internally but don't block the response — evaluation succeeded
      console.error("[EVALUATE] Supabase insert error:", dbError.message);
    }

    return NextResponse.json({ evaluation: parsed });
  } catch (err) {
    console.error("[EVALUATE] Unexpected error:", err);
    return NextResponse.json(
      { error: "Unexpected server error. Please try again." },
      { status: 500 },
    );
  }
}
