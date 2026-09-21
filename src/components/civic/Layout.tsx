import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeading({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <div className="border-b border-border bg-cream">
      <div className="container-page py-8">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wider text-teal">{eyebrow}</p>
        ) : null}
        <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
    </div>
  );
}

export function AiBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-ai-soft px-2.5 py-1 text-xs font-medium text-ai ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-ai" />
      AI-assisted service discovery
    </span>
  );
}
