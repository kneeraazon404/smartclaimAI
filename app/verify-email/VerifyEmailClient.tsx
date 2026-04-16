"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";

function VerifyEmailInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "no-token"
  >(token ? "loading" : "no-token");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setStatus("error");
          setMessage(data.error);
        } else {
          setStatus("success");
          setMessage(data.message);
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Verification failed. Please try again.");
      });
  }, [token]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center gap-4 text-gray-600 dark:text-gray-400">
        <Loader2
          className="w-12 h-12 animate-spin text-emerald-600"
          aria-hidden="true"
        />
        <p>Verifying your email…</p>
      </div>
    );
  }

  if (status === "no-token") {
    return (
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 text-center space-y-4">
        <Mail
          className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto"
          aria-hidden="true"
        />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Check your email
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          We sent a verification link to your email address. Click the link to
          activate your account.
        </p>
        <Link
          href="/login"
          className="inline-block mt-4 text-emerald-600 dark:text-emerald-400 font-medium hover:underline text-sm"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 text-center space-y-4">
      {status === "success" ? (
        <CheckCircle
          className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto"
          aria-hidden="true"
        />
      ) : (
        <XCircle
          className="w-16 h-16 text-red-500 mx-auto"
          aria-hidden="true"
        />
      )}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {status === "success" ? "Email Verified!" : "Verification Failed"}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{message}</p>
      {status === "success" ? (
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Sign In Now
        </Link>
      ) : (
        <Link
          href="/register"
          className="inline-block text-emerald-600 dark:text-emerald-400 font-medium hover:underline text-sm"
        >
          Register again
        </Link>
      )}
    </div>
  );
}

export default function VerifyEmailClient() {
  return (
    <Suspense
      fallback={
        <Loader2
          className="w-8 h-8 animate-spin text-emerald-600"
          aria-label="Loading"
        />
      }
    >
      <VerifyEmailInner />
    </Suspense>
  );
}
