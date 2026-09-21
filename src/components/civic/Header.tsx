import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Globe, Landmark, Menu, UserRound, X } from "lucide-react";
import { LANGUAGES, useLanguage, type Lang } from "@/lib/civic-store";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/assistant", label: "AI Assistant" },
  { to: "/track", label: "Track Application" },
  { to: "/centers", label: "Service Centres" },
  { to: "/help", label: "Help" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card">
      <div className="bg-navy text-navy-foreground">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 py-1.5 text-xs">
          <span>A citizen service discovery initiative · Government services made findable</span>
          <span className="hidden sm:block">Helpline 1800-000-CIVIC · Toll free</span>
        </div>
      </div>

      <div className="container-page flex items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Landmark className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold text-foreground">CivicSeva</span>
            <span className="block text-[11px] text-muted-foreground">
              Unified Citizen Service Navigator
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-accent text-accent-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <label className="hidden items-center gap-1 rounded-md border border-border px-2 py-1.5 sm:flex">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Select language</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className="bg-transparent text-sm text-foreground outline-none"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>

          <Link
            to="/sign-in"
            className="hidden items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 sm:inline-flex"
          >
            <UserRound className="h-4 w-4" /> Sign In
          </Link>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md border border-border p-2 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border bg-card lg:hidden">
          <div className="container-page flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/sign-in"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-md bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground"
            >
              Sign In
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
