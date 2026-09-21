import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { AiBadge, Page } from "@/components/civic/Layout";
import { SearchBox } from "@/components/civic/SearchBox";
import { ServiceCard } from "@/components/civic/ServiceCard";
import { CATEGORIES, LOCATIONS, searchServices, SERVICES } from "@/lib/civic-data";

type ServiceSearch = { q: string; category: string; location: string };

export const Route = createFileRoute("/services/")({
  validateSearch: (search: Record<string, unknown>): ServiceSearch => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
    category: typeof search["category"] === "string" ? search["category"] : "all",
    location: typeof search["location"] === "string" ? search["location"] : "All India",
  }),
  head: () => ({
    meta: [
      { title: "Government Services Directory — CivicSeva" },
      {
        name: "description",
        content:
          "Browse and filter Indian government services by category and state: certificates, pensions, Aadhaar, ration card and more.",
      },
      { property: "og:title", content: "Government Services Directory — CivicSeva" },
      {
        property: "og:description",
        content: "Search government services in plain language and filter by category and location.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { q, category, location } = Route.useSearch();
  const navigate = useNavigate({ from: "/services" });

  const base = q ? searchServices(q) : SERVICES.map((service) => ({ service, reason: "" }));
  const results = base.filter(({ service }) => {
    const catOk = category === "all" || service.category === category;
    const locOk =
      location === "All India" ||
      service.states.includes(location) ||
      service.states.includes("All India");
    return catOk && locOk;
  });

  const setFilter = (patch: Partial<ServiceSearch>) =>
    void navigate({ search: (prev: ServiceSearch) => ({ ...prev, ...patch }) });

  return (
    <Page>
      <div className="border-b border-border bg-cream">
        <div className="container-page py-8">
          {q ? (
            <>
              <AiBadge />
              <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">
                Results for “{q}”
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                These suggestions are generated automatically from your description. Always confirm
                details on the official source linked in each service page.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold sm:text-3xl">All Government Services</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Browse the full directory, or describe your need to get matched suggestions.
              </p>
            </>
          )}
          <div className="mt-6 max-w-3xl">
            <SearchBox label="Refine your search" cta="Find Services" initialValue={q} />
          </div>
        </div>
      </div>

      <div className="container-page grid gap-8 py-8 lg:grid-cols-[250px_1fr]">
        <aside className="rounded-lg border border-border bg-card p-5 lg:sticky lg:top-28 lg:self-start">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </h2>

          <fieldset className="mt-4">
            <legend className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Category
            </legend>
            <div className="mt-2 flex flex-wrap gap-2 lg:flex-col lg:items-start">
              {["all", ...CATEGORIES].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter({ category: c })}
                  className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                    category === c
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {c === "all" ? "All categories" : c}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-5">
            <label
              htmlFor="location"
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Location
            </label>
            <select
              id="location"
              value={location}
              onChange={(e) => setFilter({ location: e.target.value })}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <Link
            to="/services"
            search={{ q: "", category: "all", location: "All India" }}
            className="mt-5 block rounded-md border border-border px-3 py-2 text-center text-sm hover:bg-secondary"
          >
            Reset filters
          </Link>
        </aside>

        <section>
          <p className="text-sm text-muted-foreground">
            {results.length} service{results.length === 1 ? "" : "s"} found
          </p>
          {results.length === 0 ? (
            <div className="mt-4 rounded-lg border border-dashed border-border bg-card p-10 text-center">
              <p className="font-medium">No services match these filters.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different category or select “All India” as the location.
              </p>
            </div>
          ) : (
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              {results.map(({ service, reason }) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  {...(q && reason ? { reason } : {})}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </Page>
  );
}
