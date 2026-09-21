import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Locate, MapPin, Navigation, Phone, Search } from "lucide-react";
import { Page, PageHeading } from "@/components/civic/Layout";
import { CENTERS } from "@/lib/civic-data";

export const Route = createFileRoute("/centers")({
  head: () => ({
    meta: [
      { title: "Find a Service Centre — CivicSeva" },
      {
        name: "description",
        content:
          "Locate nearby citizen service centres, Aadhaar Seva Kendras and revenue offices with address, hours, distance and directions.",
      },
      { property: "og:title", content: "Find a Service Centre — CivicSeva" },
      {
        property: "og:description",
        content: "Nearby government service centres with hours, distance and directions.",
      },
    ],
  }),
  component: Centers,
});

function Centers() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string>(CENTERS[0]?.id ?? "");

  const q = query.trim().toLowerCase();
  const results = q
    ? CENTERS.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.address.toLowerCase().includes(q) ||
          c.services.some((s) => s.toLowerCase().includes(q)),
      )
    : CENTERS;

  const active = CENTERS.find((c) => c.id === selected);

  return (
    <Page>
      <PageHeading
        eyebrow="Service centres"
        title="Find a Service Centre"
        subtitle="Search by area, pincode or service to find an authorised centre near you."
      />

      <div className="container-page py-8">
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 shadow-card sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter locality, pincode or service (e.g. Ameerpet, 500038, Aadhaar)"
              className="w-full rounded-md border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-ring"
            />
          </div>
          <button
            type="button"
            onClick={() => setQuery("Hyderabad")}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-secondary"
          >
            <Locate className="h-4 w-4" /> Use my location
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{results.length} centres found near you</p>
            {results.map((c) => (
              <article
                key={c.id}
                className={`rounded-lg border bg-card p-5 shadow-card transition-colors ${
                  c.id === selected ? "border-teal" : "border-border"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="inline-block rounded bg-teal-soft px-2 py-0.5 text-xs font-medium text-teal">
                      {c.type}
                    </span>
                    <h2 className="mt-2 text-base font-semibold">{c.name}</h2>
                  </div>
                  <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                    {c.distanceKm} km away
                  </span>
                </div>

                <dl className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <div className="flex gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <dd>
                      {c.address}
                      <br />
                      {c.city}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                    <dd>{c.hours}</dd>
                  </div>
                  <div className="flex gap-2">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                    <dd>{c.phone}</dd>
                  </div>
                </dl>

                <div className="mt-3 flex flex-wrap gap-2">
                  {c.services.map((s) => (
                    <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelected(c.id)}
                    className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
                  >
                    Show on map
                  </button>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${c.name} ${c.city}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                  >
                    <Navigation className="h-4 w-4" /> Directions
                  </a>
                </div>
              </article>
            ))}

            {results.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
                No centres matched that search. Try a nearby locality or a service name.
              </div>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
              <div className="flex h-72 items-center justify-center bg-accent">
                <div className="text-center">
                  <MapPin className="mx-auto h-8 w-8 text-accent-foreground" />
                  <p className="mt-2 text-sm font-medium text-accent-foreground">Map preview</p>
                  <p className="text-xs text-accent-foreground/80">
                    Interactive map integration placeholder
                  </p>
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-sm font-semibold">Selected centre</h2>
                {active ? (
                  <>
                    <p className="mt-2 text-sm font-medium">{active.name}</p>
                    <p className="text-sm text-muted-foreground">{active.address}</p>
                    <p className="text-sm text-muted-foreground">{active.city}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{active.hours}</p>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">Select a centre to preview it.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Page>
  );
}
