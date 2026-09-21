import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  FileText,
  Search,
  User,
} from "lucide-react";
import { Page, PageHeading } from "@/components/civic/Layout";
import { APPLICATIONS, getApplication, STAGES, type Application, type TrackingStage } from "@/lib/civic-data";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Your Application — CivicSeva" },
      {
        name: "description",
        content:
          "Enter your application reference number to track the status of your government service application.",
      },
      { property: "og:title", content: "Track Your Application — CivicSeva" },
      {
        property: "og:description",
        content: "Track the progress of your government service application from submission to completion.",
      },
    ],
  }),
  component: TrackApplication,
});

const STAGE_INDEX: Record<TrackingStage, number> = {
  Submitted: 0,
  Verified: 1,
  "Under Review": 2,
  Completed: 3,
};

function StatusTimeline({ application }: { application: Application }) {
  const currentIndex = STAGE_INDEX[application.currentStage];

  return (
    <ol className="mt-6 space-y-0">
      {STAGES.map((stage, i) => {
        const done = i < currentIndex;
        const current = i === currentIndex;
        const historyEntry = application.history.find((h) => h.stage === stage);

        return (
          <li key={stage} className="flex gap-4">
            <div className="flex flex-col items-center">
              {done || current ? (
                <CheckCircle2 className="h-6 w-6 text-teal" />
              ) : (
                <Circle className="h-6 w-6 text-muted-foreground/40" />
              )}
              {i < STAGES.length - 1 ? (
                <span
                  className={`mt-1 w-px flex-1 ${i < currentIndex ? "bg-teal" : "bg-border"}`}
                  style={{ minHeight: "2.5rem" }}
                />
              ) : null}
            </div>
            <div className={`flex-1 pb-6 ${i < STAGES.length - 1 ? "" : ""}`}>
              <p
                className={`text-sm font-semibold ${
                  done || current ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {stage}
              </p>
              {historyEntry ? (
                <>
                  <p className="mt-0.5 text-xs text-muted-foreground">{historyEntry.date}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{historyEntry.detail}</p>
                </>
              ) : (
                <p className="mt-0.5 text-xs text-muted-foreground">Pending</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function ApplicationCard({ application }: { application: Application }) {
  return (
    <article className="rounded-lg border border-border bg-card p-6 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="inline-block rounded bg-teal-soft px-2 py-0.5 text-xs font-medium text-teal">
            {application.currentStage}
          </span>
          <h2 className="mt-2 text-lg font-semibold">{application.serviceName}</h2>
          <p className="text-sm text-muted-foreground">Reference: {application.reference}</p>
        </div>
        <Link
          to="/services/$slug"
          params={{ slug: application.serviceSlug }}
          className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
        >
          <FileText className="h-4 w-4" /> View service
        </Link>
      </div>

      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-2 text-sm">
          <User className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Applicant</dt>
            <dd className="text-foreground">{application.applicant}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Applied on</dt>
            <dd className="text-foreground">{application.appliedOn}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2 text-sm sm:col-span-2">
          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Processing office</dt>
            <dd className="text-foreground">{application.office}</dd>
          </div>
        </div>
      </dl>

      <div className="mt-4 rounded-md bg-secondary p-3 text-sm text-secondary-foreground">
        {application.note}
      </div>

      <StatusTimeline application={application} />
    </article>
  );
}

function TrackApplication() {
  const [reference, setReference] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<Application | undefined>(undefined);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const found = getApplication(reference);
    setResult(found);
    setSearched(true);
  };

  return (
    <Page>
      <PageHeading
        eyebrow="Application status"
        title="Track your application"
        subtitle="Enter the reference number from your acknowledgement receipt to see the current status and progress."
      />

      <div className="container-page py-8">
        <form
          onSubmit={handleTrack}
          className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 shadow-card sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Enter reference number (e.g. CS-2026-001234)"
              className="w-full rounded-md border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-ring"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            <Search className="h-4 w-4" /> Track Application
          </button>
        </form>

        <p className="mt-3 text-xs text-muted-foreground">
          Try a sample reference:{" "}
          {APPLICATIONS.map((a, i) => (
            <span key={a.reference}>
              <button
                type="button"
                onClick={() => {
                  setReference(a.reference);
                  setResult(a);
                  setSearched(true);
                }}
                className="font-medium text-primary hover:underline"
              >
                {a.reference}
              </button>
              {i < APPLICATIONS.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>

        {searched ? (
          <div className="mt-6">
            {result ? (
              <ApplicationCard application={result} />
            ) : (
              <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
                <p className="font-medium">No application found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Check the reference number on your acknowledgement receipt and try again.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-8">
            <h2 className="text-lg font-semibold">Recent sample applications</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              These are demonstration records showing how tracking looks at different stages.
            </p>
            <div className="mt-4 grid gap-5 lg:grid-cols-3">
              {APPLICATIONS.map((app) => (
                <button
                  key={app.reference}
                  type="button"
                  onClick={() => {
                    setReference(app.reference);
                    setResult(app);
                    setSearched(true);
                  }}
                  className="text-left"
                >
                  <ApplicationCard application={app} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}
