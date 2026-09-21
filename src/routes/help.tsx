import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Page, PageHeading } from "@/components/civic/Layout";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & Support — CivicSeva" },
      {
        name: "description",
        content:
          "Find answers to common questions about CivicSeva, how it works, and how to reach the helpdesk.",
      },
      { property: "og:title", content: "Help & Support — CivicSeva" },
      {
        property: "og:description",
        content: "Frequently asked questions, how CivicSeva works, and helpdesk contact information.",
      },
    ],
  }),
  component: HelpPage,
});

const FAQS = [
  {
    q: "What is CivicSeva?",
    a: "CivicSeva is a citizen service navigator that helps you discover the right government service without needing to know the department or exact scheme name. Describe your need in plain language and CivicSeva suggests matching services with eligibility, documents, and where to apply.",
  },
  {
    q: "Does CivicSeva collect my documents or payments?",
    a: "No. CivicSeva only guides you to the right service. All applications are completed on the official government portal or at an authorised service centre. We never collect your documents or process payments.",
  },
  {
    q: "How do I track my application?",
    a: "Use the Track Application page and enter the reference number from your acknowledgement receipt. You will see the current stage — Submitted, Verified, Under Review, or Completed — along with dates and details for each stage.",
  },
  {
    q: "Which languages does CivicSeva support?",
    a: "CivicSeva currently supports English, Hindi, Telugu, and Tamil. You can switch languages at any time using the language selector in the header, and your choice is remembered on this device.",
  },
  {
    q: "Can I apply for services directly through CivicSeva?",
    a: "No. CivicSeva helps you find the right service and understand the requirements. Each service page links to the official portal where you complete the actual application, or you can visit a nearby service centre listed on the Service Centres page.",
  },
  {
    q: "How accurate is the service information?",
    a: "Service details are curated from official government sources and reviewed regularly. However, always confirm the latest eligibility, documents, fees, and processing times on the official source linked in each service page.",
  },
];

const HOW_IT_WORKS = [
  {
    icon: MessageSquareText,
    title: "Describe your need",
    text: "Type what you need help with in everyday language — no department names or scheme codes required.",
  },
  {
    icon: Search,
    title: "Get matched services",
    text: "CivicSeva suggests government services that fit your situation, with the reason for each match shown.",
  },
  {
    icon: ShieldCheck,
    title: "Check eligibility & documents",
    text: "See who can apply, the exact document checklist, fees, and processing time for each service.",
  },
  {
    icon: MapPin,
    title: "Apply and track",
    text: "Apply on the official portal or at a nearby centre, then track your reference number on CivicSeva.",
  },
];

function FaqItem({ item, open, onToggle }: { item: { q: string; a: string }; open: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
      >
        <span className="text-sm font-semibold">{item.q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? <p className="px-4 pb-4 text-sm text-muted-foreground">{item.a}</p> : null}
    </div>
  );
}

function HelpPage() {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const q = query.trim().toLowerCase();
  const filteredFaqs = q
    ? FAQS.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
    : FAQS;

  return (
    <Page>
      <PageHeading
        eyebrow="Support"
        title="Help & Support"
        subtitle="Find answers to common questions, learn how CivicSeva works, and reach the helpdesk if you need more assistance."
      />

      <div className="container-page py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-10">
            <section>
              <div className="relative max-w-xl">
                <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search help topics…"
                  className="w-full rounded-md border border-input bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-ring"
                />
              </div>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <HelpCircle className="h-5 w-5 text-teal" /> Frequently Asked Questions
              </h2>
              <div className="mt-4 space-y-3">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((item, i) => (
                    <FaqItem
                      key={item.q}
                      item={item}
                      open={openIndex === i}
                      onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                    />
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
                    No results for “{query}”. Try a different search term.
                  </div>
                )}
              </div>
            </section>

            <section className="border-t border-border pt-8">
              <h2 className="text-xl font-semibold">How CivicSeva Works</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {HOW_IT_WORKS.map((step, i) => (
                  <div key={step.title} className="rounded-lg border border-border bg-card p-5">
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
            </section>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-lg border border-border bg-card p-6 shadow-card">
              <h2 className="text-base font-semibold">Contact the Helpdesk</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Our helpdesk is available for citizens who need help finding a service or understanding
                the application process.
              </p>

              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </span>
                  <div>
                    <p className="font-semibold">Helpline</p>
                    <p className="text-muted-foreground">1800-000-CIVIC (toll free)</p>
                    <p className="text-xs text-muted-foreground">Mon–Sat, 9 AM – 6 PM</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </span>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">helpdesk@civicseva.gov.in</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </span>
                  <div>
                    <p className="font-semibold">Visit a centre</p>
                    <p className="text-muted-foreground">Find an authorised service centre near you.</p>
                    <Link to="/centers" className="mt-1 inline-flex font-medium text-primary hover:underline">
                      Find a centre
                    </Link>
                  </div>
                </li>
              </ul>

              <div className="mt-6 border-t border-border pt-5">
                <h3 className="text-sm font-semibold">Quick links</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link to="/services" className="text-primary hover:underline">Browse all services</Link>
                  </li>
                  <li>
                    <Link to="/track" className="text-primary hover:underline">Track an application</Link>
                  </li>
                  <li>
                    <Link to="/assistant" className="text-primary hover:underline">Ask the AI assistant</Link>
                  </li>
                  <li>
                    <Link to="/sign-in" className="text-primary hover:underline">
                      <span className="inline-flex items-center gap-1">
                        <UserRound className="h-3.5 w-3.5" /> Sign in
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Page>
  );
}
