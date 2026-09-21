import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { KeyRound, Landmark, Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import { Page } from "@/components/civic/Layout";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign In — CivicSeva" },
      {
        name: "description",
        content: "Sign in to CivicSeva to track your saved services and application history.",
      },
      { property: "og:title", content: "Sign In — CivicSeva" },
      {
        property: "og:description",
        content: "Sign in to CivicSeva with your mobile number or email.",
      },
    ],
  }),
  component: SignIn,
});

type Mode = "password" | "otp";

function SignIn() {
  const [identifierType, setIdentifierType] = useState<"mobile" | "email">("mobile");
  const [mode, setMode] = useState<Mode>("password");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Page>
      <section className="border-b border-border bg-cream">
        <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_1fr] lg:py-16">
          <div className="flex flex-col justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-teal">
              <ShieldCheck className="h-3.5 w-3.5" /> Citizen-first · Secure access
            </span>
            <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Sign in to CivicSeva
            </h1>
            <p className="mt-4 max-w-md text-base text-muted-foreground">
              Access your saved services, track applications, and pick up where you left off. This is a
              demonstration sign-in — no real account is created.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                Your data stays on this device. No external authentication is used.
              </li>
              <li className="flex items-start gap-2">
                <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                CivicSeva never collects documents or payments — sign-in only personalises your browsing.
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card sm:p-8">
            <div className="flex items-center gap-1 rounded-md border border-border bg-secondary p-1">
              <button
                type="button"
                onClick={() => setIdentifierType("mobile")}
                className={`flex-1 rounded px-3 py-2 text-sm font-medium transition-colors ${
                  identifierType === "mobile"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-4 w-4" /> Mobile
                </span>
              </button>
              <button
                type="button"
                onClick={() => setIdentifierType("email")}
                className={`flex-1 rounded px-3 py-2 text-sm font-medium transition-colors ${
                  identifierType === "email"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-4 w-4" /> Email
                </span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="identifier" className="text-sm font-medium text-foreground">
                  {identifierType === "mobile" ? "Mobile number" : "Email address"}
                </label>
                <div className="relative mt-1.5">
                  {identifierType === "mobile" ? (
                    <Phone className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  )}
                  <input
                    id="identifier"
                    type={identifierType === "mobile" ? "tel" : "email"}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={identifierType === "mobile" ? "Enter your mobile number" : "Enter your email"}
                    className="w-full rounded-md border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-ring"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1 rounded-md border border-border bg-secondary p-1">
                <button
                  type="button"
                  onClick={() => setMode("password")}
                  className={`flex-1 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                    mode === "password"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Password
                </button>
                <button
                  type="button"
                  onClick={() => setMode("otp")}
                  className={`flex-1 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                    mode === "otp"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  OTP
                </button>
              </div>

              {mode === "password" ? (
                <div>
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <div className="relative mt-1.5">
                    <KeyRound className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-md border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-ring"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="otp" className="text-sm font-medium text-foreground">
                    One-Time Password
                  </label>
                  <div className="relative mt-1.5">
                    <KeyRound className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="w-full rounded-md border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-ring"
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-2 text-xs font-medium text-primary hover:underline"
                  >
                    Send OTP
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="rounded border-border" />
                  Remember me
                </label>
                <button type="button" className="font-medium text-primary hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
              >
                <UserRound className="h-4 w-4" /> Sign In
              </button>

              {submitted ? (
                <p className="rounded-md bg-teal-soft px-3 py-2 text-center text-sm text-teal">
                  This is a demo sign-in. No account was created or verified.
                </p>
              ) : null}
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              New to CivicSeva?{" "}
              <button type="button" className="font-medium text-primary hover:underline">
                Create an account
              </button>
            </p>

            <div className="mt-6 border-t border-border pt-5">
              <p className="text-center text-xs text-muted-foreground">
                By signing in you agree to CivicSeva's{" "}
                <span className="font-medium text-foreground">Terms of Use</span> and{" "}
                <span className="font-medium text-foreground">Privacy Policy</span>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
