import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accessibility,
  ArrowRight,
  FileText,
  Languages,
  MapPin,
  MessageSquareText,
  ScrollText,
  ShieldCheck,
  Sparkle,
} from "lucide-react";
import { Page } from "@/components/civic/Layout";
import { SearchBox } from "@/components/civic/SearchBox";
import { ServiceCard } from "@/components/civic/ServiceCard";
import { SERVICES } from "@/lib/civic-data";
import { copyFor, LANGUAGES, useLanguage } from "@/lib/civic-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CivicSeva — Find the right government service, simply" },
      {
        name: "description",
        content:
          "Describe what you need in your own words and CivicSeva helps you discover the right Indian government service, eligibility, documents and where to apply.",
      },
      { property: "og:title", content: "CivicSeva — Unified Citizen Service Navigator" },
      {
        property: "og:description",
        content:
          "AI-assisted discovery of Indian government services: eligibility, documents, application steps, service centres and application tracking.",
      },
    ],
  }),
  component: Home,
});

const STEPS = [
  {
    icon: MessageSquareText,
    title: "Describe your need",
    text: "Type it in everyday language. No department names or scheme codes required.",
  },
  {
    icon: Sparkle,
    title: "Get matched services",
    text: "CivicSeva suggests the government services that fit your situation, with the reason shown.",
  },
  {
    icon: ScrollText,
    title: "Check eligibility & documents",
    text: "See who can apply, the exact document checklist, fees and processing time.",
  },
  {
    icon: MapPin,
    title: "Apply and track",
    text: "Apply on the official portal or at a nearby centre, then track your reference number.",
  },
];

function Home() {
  const { lang } = useLanguage();
  const copy = copyFor(lang);
  const popular = SERVICES.filter((s) => s.popular);

  return (
    <Page>
      <section className="border-b border-border bg-cream">
        <div className="container-page grid gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-teal">
              <ShieldCheck className="h-3.5 w-3.5" /> Citizen-first · Department-agnostic
            </span>
            <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.6rem]">
              {copy.heroTitle}
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">{copy.heroSubtitle}</p>

            <div className="mt-7">
              <SearchBox label={copy.searchLabel} cta={copy.cta} />
            </div>

            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <Link
                to="/assistant"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 font-medium hover:bg-secondary"
              >
                <MessageSquareText className="h-4 w-4" /> Ask the assistant
              </Link>
              <Link
                to="/track"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 font-medium hover:bg-secondary"
              >
                <FileText className="h-4 w-4" /> Track an application
              </Link>
            </div>
          </div>

          <aside className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-base font-semibold">At a glance</h2>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              {[
                ["8", "Services mapped"],
                ["5", "Departments covered"],
                ["4", "Languages supported"],
                ["120+", "Service centres listed"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg bg-secondary p-4">
                  <dt className="text-2xl font-semibold text-primary">{value}</dt>
                  <dd className="text-xs text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">
              CivicSeva only guides you. Every application is completed on the department's own
              official portal or at an authorised service centre.
            </p>
          </aside>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Popular Services</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The services citizens look for most often.
            </p>
          </div>
          <Link to="/services" className="hidden items-center gap-1 text-sm font-medium text-primary sm:inline-flex">
            View all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card py-12">
        <div className="container-page">
          <h2 className="text-2xl font-semibold">How CivicSeva Works</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className="rounded-lg border border-border bg-background p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-teal-soft text-teal">
                    <step.icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page grid gap-8 py-12 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <Languages className="h-5 w-5" />
          </span>
          <h2 className="mt-4 text-xl font-semibold">Multilingual Support</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Search and read guidance in your preferred language. Switch languages any time from the
            header — your choice is remembered on this device.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {LANGUAGES.map((l) => (
              <span
                key={l.code}
                className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
              >
                {l.label}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-soft text-teal">
            <Accessibility className="h-5 w-5" />
          </span>
          <h2 className="mt-4 text-xl font-semibold">Why CivicSeva</h2>
          <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">No department knowledge needed.</strong> Describe the
              problem, not the scheme.
            </li>
            <li>
              <strong className="text-foreground">One checklist per service.</strong> Eligibility,
              documents, fee and processing time in one place.
            </li>
            <li>
              <strong className="text-foreground">Always linked to the official source.</strong> Every
              service page cites the department portal it came from.
            </li>
            <li>
              <strong className="text-foreground">Accessible by design.</strong> Plain language, high
              contrast and full keyboard navigation.
            </li>
          </ul>
        </div>
      </section>
    </Page>
  );
}
