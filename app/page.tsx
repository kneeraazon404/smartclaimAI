import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  Zap,
  FileSearch,
  ClipboardList,
  BarChart3,
  Brain,
} from "lucide-react";
import type { Metadata } from "next";
import ChatWidgetLoader from "@/components/ChatWidgetLoader";

export const metadata: Metadata = {
  title: {
    absolute: "SmartClaimAI — AI-Powered Wound Care Compliance",
  },
  description:
    "Instantly evaluate wound care checklists against CMS Medicare LCD L35041 guidelines. AI-powered compliance analysis for wound care providers — secure, rapid, and accurate.",
  openGraph: {
    title: "SmartClaimAI — AI-Powered Wound Care Compliance",
    description:
      "Instantly evaluate wound care checklists against CMS Medicare LCD L35041 guidelines. Secure, rapid, and accurate.",
  },
};

const trustIndicators = [
  { label: "LLM Powered", icon: Brain },
  { label: "CMS LCD L35041", icon: ShieldCheck },
  { label: "HIPAA Data Practices", icon: CheckCircle },
  { label: "Field-Level Feedback", icon: BarChart3 },
];

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Fill the Wizard",
    description:
      "Enter clinical data across structured categories: wound type, duration, conservative care history, diagnostics, and more.",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Evaluates in Seconds",
    description:
      "LLM cross-references every field against strict Medicare LCD requirements, applying the same criteria payers use to adjudicate claims.",
  },
  {
    number: "03",
    icon: FileSearch,
    title: "Review & Act on Results",
    description:
      "Get an instant compliance report with field-level pass/fail status and clinical reasoning. Fix deficiencies before billing.",
  },
];

const features = [
  {
    icon: Zap,
    title: "Instant AI Analysis",
    description:
      "Drop clinical notes directly into our structured wizard. LLM processes each field in seconds, immediately flagging missing or non-compliant documentation.",
  },
  {
    icon: ShieldCheck,
    title: "CMS LCD Compliant",
    description:
      "Built strictly around CMS Medicare LCD Novitas guidelines for Skin Substitutes and CTPs (L35041). Every evaluation criterion maps directly to a published requirement.",
  },
  {
    icon: CheckCircle,
    title: "Actionable Field Feedback",
    description:
      "Don't just get a pass or fail. Receive precise per-field highlighting and clinical reasoning explaining exactly what requirement was missed and why.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-20 pb-28 flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-50 dark:from-emerald-900/20 via-white dark:via-gray-950 to-white dark:to-gray-950 -z-10"
          aria-hidden="true"
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#10b981 1px, transparent 1px), linear-gradient(to right, #10b981 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-full text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-8">
          <ShieldCheck className="w-4 h-4" aria-hidden="true" />
          CMS LCD L35041 — AI Compliance Verification
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 max-w-4xl leading-tight">
          Stop Claim Denials{" "}
          <span className="text-emerald-600 dark:text-emerald-500">
            Before They Start
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed">
          SmartClaimAI evaluates wound care documentation against CMS Medicare
          LCD guidelines in seconds — giving instant, field-level compliance
          feedback before you bill.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/evaluate"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 active:bg-emerald-800 shadow-lg shadow-emerald-500/25 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Start Free Evaluation
            <ArrowRight
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            How It Works
          </Link>
        </div>
      </section>

      {/* ── Trust indicators ─────────────────────────────────────────────── */}
      <section
        aria-label="Trust indicators"
        className="w-full border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 py-5"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ul
            className="flex flex-wrap justify-center gap-x-8 gap-y-4"
            role="list"
          >
            {trustIndicators.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                <Icon
                  className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0"
                  aria-hidden="true"
                />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        aria-labelledby="how-heading"
        className="w-full py-24 bg-white dark:bg-gray-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2
              id="how-heading"
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Three Steps to Compliance Confidence
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              From raw clinical notes to a verified, submission-ready evaluation
              in under a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line — desktop only */}
            <div
              className="absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200 dark:from-emerald-900 dark:via-emerald-700 dark:to-emerald-900 hidden md:block"
              aria-hidden="true"
            />

            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number + icon */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center">
                    <step.icon
                      className="w-9 h-9 text-emerald-600 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="features-heading"
        className="w-full py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2
              id="features-heading"
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Why Providers Choose SmartClaimAI
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Purpose-built by clinicians and engineers to eliminate the
              guesswork in wound care billing compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-start p-7 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-5 text-emerald-600 dark:text-emerald-400"
                  aria-hidden="true"
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────────────────────── */}
      <section className="w-full py-20 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Eliminate Claim Denials?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            Experience the confidence of zero-gap documentation. No commitment
            required — start your first evaluation now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/evaluate"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              Start Your Evaluation
              <ArrowRight
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>

      <ChatWidgetLoader />
    </div>
  );
}
