import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  Bookmark,
  BookmarkCheck,
  Building2,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  FileText,
  IndianRupee,
  MapPin,
  Users,
} from "lucide-react";
import { Page } from "@/components/civic/Layout";
import { getService } from "@/lib/civic-data";
import { recordVisit, useSavedServices } from "@/lib/civic-store";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found — CivicSeva" }, { name: "robots", content: "noindex" }] };
    }
    const { service } = loaderData;
    return {
      meta: [
        { title: `${service.name} — CivicSeva` },
        { name: "description", content: service.summary },
        { property: "og:title", content: `${service.name} — CivicSeva` },
        { property: "og:description", content: service.summary },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const { isSaved, toggle } = useSavedServices();
  const saved = isSaved(service.slug);

  useEffect(() => {
    recordVisit(service.slug);
  }, [service.slug]);

  return (
    <Page>
      <div className="border-b border-border bg-cream">
        <div className="container-page py-8">
          <nav className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="px-1.5">/</span>
            <Link to="/services" search={{ q: "", category: "all", location: "All India" }} className="hover:text-foreground">
              Services
            </Link>
            <span className="px-1.5">/</span>
            <span className="text-foreground">{service.shortName}</span>
          </nav>

          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <span className="inline-block rounded bg-teal-soft px-2 py-0.5 text-xs font-medium text-teal">
                {service.category}
              </span>
              <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">{service.name}</h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" /> {service.department}
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggle(service.slug)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary"
            >
              {saved ? <BookmarkCheck className="h-4 w-4 text-teal" /> : <Bookmark className="h-4 w-4" />}
              {saved ? "Saved" : "Save service"}
            </button>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-8 py-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Section title="About this service">
            <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
          </Section>

          <Section title="Eligibility" icon={<Users className="h-4 w-4 text-teal" />}>
            <ul className="space-y-2">
              {service.eligibility.map((e) => (
                <li key={e} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  {e}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Required documents" icon={<FileText className="h-4 w-4 text-teal" />}>
            <ul className="grid gap-2 sm:grid-cols-2">
              {service.documents.map((d) => (
                <li
                  key={d}
                  className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-secondary-foreground"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Application steps">
            <ol className="space-y-3">
              {service.steps.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-sm text-muted-foreground">{s}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Service centre information" icon={<MapPin className="h-4 w-4 text-teal" />}>
            <p className="text-sm text-muted-foreground">
              This service is available {service.mode.toLowerCase()}. Authorised centres can complete
              the submission on your behalf if you do not wish to apply online.
            </p>
            <Link
              to="/centers"
              className="mt-3 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
            >
              <MapPin className="h-4 w-4" /> Find Service Center
            </Link>
          </Section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <h2 className="text-sm font-semibold">Processing information</h2>
            <dl className="mt-3 space-y-3 text-sm">
              <Row icon={<CalendarClock className="h-4 w-4" />} label="Processing time" value={service.processingTime} />
              <Row icon={<IndianRupee className="h-4 w-4" />} label="Fee" value={service.fee} />
              <Row icon={<MapPin className="h-4 w-4" />} label="Mode" value={service.mode} />
              <Row icon={<Building2 className="h-4 w-4" />} label="Available in" value={service.states.join(", ")} />
            </dl>

            <a
              href={service.applyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Apply Online <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              to="/track"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-secondary"
            >
              Track an existing application
            </Link>
          </div>

          <div className="rounded-lg border border-border bg-teal-soft p-5">
            <h2 className="text-sm font-semibold text-accent-foreground">Official source</h2>
            <p className="mt-1 text-sm text-muted-foreground">{service.officialSource.label}</p>
            <a
              href={service.officialSource.url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-2 hover:underline"
            >
              Visit official portal <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </aside>
      </div>
    </Page>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-card">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        {icon}
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <div>
        <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
        <dd className="text-sm text-foreground">{value}</dd>
      </div>
    </div>
  );
}
