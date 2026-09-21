import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, Send, UserRound } from "lucide-react";
import { AiBadge, Page, PageHeading } from "@/components/civic/Layout";
import { searchServices, type Service } from "@/lib/civic-data";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — CivicSeva" },
      {
        name: "description",
        content:
          "Describe your situation in plain words and the CivicSeva assistant suggests the right government services, documents and next steps.",
      },
      { property: "og:title", content: "AI Assistant — CivicSeva" },
      {
        property: "og:description",
        content: "Conversational guidance for finding the right Indian government service.",
      },
    ],
  }),
  component: Assistant,
});

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  services: Service[];
  followUps: string[];
};

const OPENING: Message = {
  id: 0,
  role: "assistant",
  text: "Namaste. Tell me what you need in your own words — for example “my father needs a monthly pension” or “I lost my ration card”. I will suggest the government services that fit.",
  services: [],
  followUps: [
    "I need a birth certificate for school admission",
    "How can I apply for a pension?",
    "What documents do I need for a caste certificate?",
    "I want to change my address in Aadhaar",
  ],
};

function buildReply(query: string, id: number): Message {
  const matches = searchServices(query).slice(0, 3);
  const top = matches[0];
  const services = matches.map((m) => m.service);

  const text = top
    ? `Based on what you described, the most relevant service looks like ${top.service.name}, handled by ${top.service.department}. It usually takes ${top.service.processingTime} and needs ${top.service.documents.length} documents. Open the service page for the full eligibility and document checklist.`
    : "I could not match that to a specific service yet. Could you tell me a little more about the purpose — for example admission, employment, welfare benefit or identity proof?";

  const followUps = top
    ? [
        `What documents are needed for ${top.service.shortName}?`,
        `Am I eligible for ${top.service.shortName}?`,
        `Where is the nearest centre for ${top.service.shortName}?`,
        "Show me related welfare schemes",
      ]
    : ["I need an identity document", "I need a welfare benefit", "I need a certificate for admission"];

  return { id, role: "assistant", text, services, followUps };
}

function Assistant() {
  const [messages, setMessages] = useState<Message[]>([OPENING]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function ask(text: string) {
    const q = text.trim();
    if (!q || thinking) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: q, services: [], followUps: [] };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, buildReply(q, Date.now() + 1)]);
      setThinking(false);
      inputRef.current?.focus();
    }, 650);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  const last = messages[messages.length - 1];
  const suggestions = last && last.role === "assistant" ? last.followUps : [];

  return (
    <Page>
      <PageHeading
        eyebrow="Conversational guidance"
        title="CivicSeva Assistant"
        subtitle="Describe your situation and get service suggestions, document checklists and next steps."
      />

      <div className="container-page grid gap-6 py-8 lg:grid-cols-[1fr_300px]">
        <section className="flex min-h-[520px] flex-col rounded-lg border border-border bg-card shadow-card">
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Bot className="h-4 w-4 text-teal" /> Service discovery chat
            </span>
            <AiBadge />
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex gap-3"}>
                {m.role === "assistant" ? (
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-soft text-teal">
                    <Bot className="h-4 w-4" />
                  </span>
                ) : null}
                <div className={m.role === "user" ? "max-w-[85%]" : "max-w-[85%] flex-1"}>
                  <div
                    className={
                      m.role === "user"
                        ? "rounded-lg rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                        : "text-sm leading-relaxed text-foreground"
                    }
                  >
                    {m.text}
                  </div>

                  {m.services.length > 0 ? (
                    <div className="mt-3 space-y-2">
                      {m.services.map((s) => (
                        <Link
                          key={s.slug}
                          to="/services/$slug"
                          params={{ slug: s.slug }}
                          className="block rounded-md border border-border bg-background p-3 transition-colors hover:bg-secondary"
                        >
                          <p className="text-sm font-semibold">{s.name}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{s.summary}</p>
                        </Link>
                      ))}
                      <p className="text-[11px] text-muted-foreground">
                        AI-generated guidance. Verify details on the official source before applying.
                      </p>
                    </div>
                  ) : null}
                </div>
                {m.role === "user" ? (
                  <span className="ml-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <UserRound className="h-4 w-4" />
                  </span>
                ) : null}
              </div>
            ))}

            {thinking ? (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Bot className="h-4 w-4 text-teal" /> Looking for matching services…
              </p>
            ) : null}
            <div ref={endRef} />
          </div>

          {suggestions.length > 0 ? (
            <div className="flex flex-wrap gap-2 border-t border-border px-5 py-3">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => ask(s)}
                  className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          ) : null}

          <form onSubmit={submit} className="flex gap-2 border-t border-border p-4">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe what you need…"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring"
            />
            <button
              type="submit"
              disabled={thinking}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
            >
              <Send className="h-4 w-4" /> Send
            </button>
          </form>
        </section>

        <aside className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-sm font-semibold">How to get better answers</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Say who the service is for (self, parent, child).</li>
              <li>Mention the purpose — admission, job, benefit, proof.</li>
              <li>Add your state if the rules differ locally.</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-ai-soft p-5">
            <h2 className="text-sm font-semibold text-ai">About AI guidance</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Responses are generated automatically from CivicSeva's service directory. They are
              guidance only and are not a government decision on your eligibility.
            </p>
          </div>
        </aside>
      </div>
    </Page>
  );
}
