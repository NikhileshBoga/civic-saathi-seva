import { useNavigate } from "@tanstack/react-router";
import { Search, Sparkle } from "lucide-react";
import { useState, type FormEvent } from "react";

const EXAMPLES = [
  "I need a birth certificate",
  "How can I apply for a pension?",
  "What documents do I need for a caste certificate?",
];

export function SearchBox({
  label,
  cta,
  initialValue = "",
}: {
  label: string;
  cta: string;
  initialValue?: string;
}) {
  const [value, setValue] = useState(initialValue);
  const navigate = useNavigate();

  function submit(e: FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    void navigate({ to: "/services", search: { q, category: "all", location: "All India" } });
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-raised sm:p-5">
      <form onSubmit={submit}>
        <label htmlFor="civic-search" className="block text-sm font-semibold">
          {label}
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <input
              id="civic-search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Describe your need, e.g. I need proof of my family income"
              className="w-full rounded-md border border-input bg-background py-3 pl-10 pr-3 text-base outline-none transition-colors focus:border-ring"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Sparkle className="h-4 w-4" />
            {cta}
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Try:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => setValue(ex)}
            className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            “{ex}”
          </button>
        ))}
      </div>
    </div>
  );
}
