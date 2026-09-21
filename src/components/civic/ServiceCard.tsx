import { Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, BookmarkCheck, Clock, Building2 } from "lucide-react";
import type { Service } from "@/lib/civic-data";
import { useSavedServices } from "@/lib/civic-store";

export function ServiceCard({ service, reason }: { service: Service; reason?: string }) {
  const { isSaved, toggle } = useSavedServices();
  const saved = isSaved(service.slug);

  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-raised">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-block rounded bg-teal-soft px-2 py-0.5 text-xs font-medium text-teal">
            {service.category}
          </span>
          <h3 className="mt-2 text-base font-semibold leading-snug">{service.name}</h3>
        </div>
        <button
          type="button"
          onClick={() => toggle(service.slug)}
          aria-label={saved ? "Remove from saved services" : "Save this service"}
          className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary"
        >
          {saved ? <BookmarkCheck className="h-4 w-4 text-teal" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">{service.summary}</p>

      {reason ? (
        <p className="mt-3 rounded-md bg-ai-soft px-3 py-2 text-xs text-ai">Why suggested: {reason}</p>
      ) : null}

      <dl className="mt-4 space-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Building2 className="h-3.5 w-3.5" />
          <dd>{service.department}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" />
          <dd>{service.processingTime}</dd>
        </div>
      </dl>

      <Link
        to="/services/$slug"
        params={{ slug: service.slug }}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        View Details <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
