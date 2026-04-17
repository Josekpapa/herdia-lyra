import { useMemo, useState } from "react";
import type { ChatMessage, DraftEmail, ToolCall } from "../../lib/advisor/types";

type Props = {
  message: ChatMessage;
  streaming: boolean;
};

export default function MessageView({ message, streaming }: Props) {
  if (message.role === "user") {
    return (
      <div className="flex flex-col gap-2">
        <span className="label-xs">Advisor</span>
        <blockquote className="msg-user">
          {message.content}
        </blockquote>
      </div>
    );
  }

  const isEmpty = !message.content && (message.toolCalls?.length ?? 0) === 0;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="label-xs text-brand-300/80">Fidelis</span>
        <span className="h-px flex-1 bg-white/[0.05]" />
        {message.usage && (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
            {message.usage.model.split("-").slice(0, 2).join("-")}
          </span>
        )}
      </div>

      {message.toolCalls && message.toolCalls.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {message.toolCalls.map((t) => (
            <ToolCallView key={t.id} tool={t} />
          ))}
        </div>
      )}

      {message.content && (
        <div className="msg-assistant prose prose-invert prose-sm max-w-none prose-headings:font-display prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-white prose-strong:text-white prose-strong:font-medium prose-a:text-brand-300 prose-a:no-underline hover:prose-a:underline prose-code:text-brand-300 prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none">
          <FormattedText text={message.content} />
        </div>
      )}

      {isEmpty && streaming && <ThinkingIndicator />}

      {message.drafts && message.drafts.length > 0 && (
        <div className="flex flex-col gap-3">
          {message.drafts.map((d, i) => (
            <EmailDraftCard key={i} draft={d} />
          ))}
        </div>
      )}

      {message.sources && message.sources.length > 0 && (
        <SourcesPanel sources={message.sources} />
      )}

      {message.usage && (
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
            <span className="data-num">{message.usage.inputTokens.toLocaleString()}</span> in
            <span className="mx-1 opacity-50">·</span>
            <span className="data-num">{message.usage.outputTokens.toLocaleString()}</span> out
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
            <span className="data-num">{(message.usage.durationMs / 1000).toFixed(1)}</span>s
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-300/90">
            <span className="data-num">${message.usage.costUsd.toFixed(5)}</span>
          </span>
        </div>
      )}
    </div>
  );
}

function ToolCallView({ tool }: { tool: ToolCall }) {
  const [open, setOpen] = useState(false);
  const running = !tool.finishedAt;
  const hasError = !!tool.error;

  const parsedResult = useMemo(() => {
    if (!tool.result) return null;
    try {
      return JSON.stringify(JSON.parse(tool.result), null, 2);
    } catch {
      return tool.result;
    }
  }, [tool.result]);

  const parsedArgs = useMemo(() => {
    if (!tool.args) return null;
    try {
      return JSON.stringify(JSON.parse(tool.args), null, 2);
    } catch {
      return tool.args;
    }
  }, [tool.args]);

  return (
    <div className={`tool-block ${running ? "is-running" : ""} ${hasError ? "is-error" : ""}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 text-left"
      >
        {running ? (
          <Spinner className="h-3 w-3 text-brand-400" />
        ) : hasError ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-danger-400">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4" />
            <path d="m12 16 .01 0" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-accent-400">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
        <span className="text-ink-500">fn</span>
        <span className="text-ink-100">{tool.name}</span>
        <span className="ml-auto text-[10px] uppercase tracking-[0.22em] text-ink-500">
          {running ? "running" : hasError ? "error" : "ok"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-3 w-3 text-ink-500 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="mt-3 flex flex-col gap-3 border-t border-white/[0.06] pt-3">
          {parsedArgs && (
            <div>
              <p className="label-xs mb-1.5">Arguments</p>
              <pre className="overflow-x-auto bg-black/40 p-2.5 font-mono text-[11px] leading-relaxed text-ink-200">
                {parsedArgs}
              </pre>
            </div>
          )}
          {(parsedResult || tool.error) && (
            <div>
              <p className={`label-xs mb-1.5 ${tool.error ? "text-danger-400" : ""}`}>
                {tool.error ? "Error" : "Result"}
              </p>
              <pre className="max-h-64 overflow-auto bg-black/40 p-2.5 font-mono text-[11px] leading-relaxed text-ink-200">
                {tool.error ?? parsedResult}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SourcesPanel({ sources }: { sources: ChatMessage["sources"] }) {
  if (!sources || sources.length === 0) return null;
  return (
    <div className="mt-2 border-t border-white/[0.05] pt-4">
      <p className="label-xs mb-3">
        Sources · <span className="data-num">{String(sources.length).padStart(2, "0")}</span>
      </p>
      <ol className="flex flex-col gap-2.5">
        {sources.map((s, i) => (
          <li key={s.id} className="flex gap-3 text-[13px]">
            <span className="mt-0.5 shrink-0 font-mono text-[10px] tracking-[0.18em] text-brand-300/80">
              [{String(i + 1).padStart(2, "0")}]
            </span>
            <div className="min-w-0">
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-ink-100 transition hover:text-brand-300"
                >
                  {s.title}
                </a>
              ) : (
                <span className="font-medium text-ink-100">{s.title}</span>
              )}
              <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-relaxed text-ink-500">
                {s.snippet}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex gap-1">
        <span className="h-1 w-1 animate-pulse rounded-full bg-ink-400 [animation-delay:-0.3s]" />
        <span className="h-1 w-1 animate-pulse rounded-full bg-ink-400 [animation-delay:-0.15s]" />
        <span className="h-1 w-1 animate-pulse rounded-full bg-ink-400" />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400">
        Thinking
      </span>
    </div>
  );
}

function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function FormattedText({ text }: { text: string }) {
  const blocks = useMemo(() => parseBlocks(text), [text]);
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "heading") {
          const H = b.level === 1 ? "h2" : b.level === 2 ? "h3" : "h4";
          return (
            <H key={i} className="mt-5 text-[1.15rem] font-normal tracking-tight text-white first:mt-0">
              {inline(b.content)}
            </H>
          );
        }
        if (b.type === "list") {
          return (
            <ul key={i} className="my-3 flex list-disc flex-col gap-1 pl-5 marker:text-ink-500">
              {b.items.map((it, j) => (
                <li key={j}>{inline(it)}</li>
              ))}
            </ul>
          );
        }
        if (b.type === "ol") {
          return (
            <ol key={i} className="my-3 flex list-decimal flex-col gap-1 pl-5 marker:text-ink-500">
              {b.items.map((it, j) => (
                <li key={j}>{inline(it)}</li>
              ))}
            </ol>
          );
        }
        if (b.type === "code") {
          return (
            <pre
              key={i}
              className="my-3 overflow-x-auto bg-black/40 p-3 font-mono text-[12px] leading-relaxed text-ink-100"
            >
              <code>{b.content}</code>
            </pre>
          );
        }
        return (
          <p key={i} className="my-3 leading-[1.72] first:mt-0">
            {inline(b.content)}
          </p>
        );
      })}
    </>
  );
}

type Block =
  | { type: "p"; content: string }
  | { type: "heading"; level: number; content: string }
  | { type: "list"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; content: string };

function parseBlocks(text: string): Block[] {
  const lines = text.split("\n");
  const out: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i]!;
    if (line.startsWith("```")) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i]!.startsWith("```")) {
        buf.push(lines[i]!);
        i++;
      }
      i++;
      out.push({ type: "code", content: buf.join("\n") });
      continue;
    }
    const heading = /^(#{1,3})\s+(.+)/.exec(line);
    if (heading) {
      out.push({ type: "heading", level: heading[1]!.length, content: heading[2]! });
      i++;
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i]!)) {
        items.push(lines[i]!.replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      out.push({ type: "list", items });
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i]!)) {
        items.push(lines[i]!.replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      out.push({ type: "ol", items });
      continue;
    }
    if (!line.trim()) {
      i++;
      continue;
    }
    const paraLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i]!.trim() &&
      !lines[i]!.startsWith("#") &&
      !lines[i]!.startsWith("```") &&
      !/^\s*[-*]\s+/.test(lines[i]!) &&
      !/^\s*\d+\.\s+/.test(lines[i]!)
    ) {
      paraLines.push(lines[i]!);
      i++;
    }
    out.push({ type: "p", content: paraLines.join(" ") });
  }
  return out;
}

function inline(s: string): React.ReactNode {
  const nodes: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(s)) !== null) {
    if (match.index > lastIndex) nodes.push(s.slice(lastIndex, match.index));
    const tok = match[0];
    if (tok.startsWith("**")) {
      nodes.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith("`")) {
      nodes.push(<code key={key++}>{tok.slice(1, -1)}</code>);
    } else {
      nodes.push(<em key={key++}>{tok.slice(1, -1)}</em>);
    }
    lastIndex = match.index + tok.length;
  }
  if (lastIndex < s.length) nodes.push(s.slice(lastIndex));
  return nodes;
}

/* -------------------------------------------------------------------------- */
/* Email draft review card                                                    */
/* -------------------------------------------------------------------------- */

function EmailDraftCard({ draft }: { draft: DraftEmail }) {
  const [subject, setSubject] = useState(draft.subject);
  const [body, setBody] = useState(draft.body);
  const [to, setTo] = useState(draft.to ?? "");
  const [copied, setCopied] = useState<"subject" | "body" | "all" | null>(null);

  const mailto = useMemo(() => {
    const qp = new URLSearchParams();
    qp.set("subject", subject);
    qp.set("body", body);
    if (draft.cc?.length) qp.set("cc", draft.cc.join(","));
    return `mailto:${encodeURIComponent(to)}?${qp.toString()}`;
  }, [subject, body, to, draft.cc]);

  const copy = async (which: "subject" | "body" | "all") => {
    const text =
      which === "subject" ? subject : which === "body" ? body : `Subject: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(null), 1400);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="border-l-2 border-accent-500/50 bg-accent-500/[0.03] px-5 py-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="label-xs text-accent-400">Draft email · advisor review required</span>
          <p className="mt-1 text-[11px] text-ink-500">
            Tone: {draft.tone} · Edit inline, then copy or open in your mail client.
          </p>
        </div>
        <span className="tag tag-warn">Unsent</span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <label className="flex items-baseline gap-4">
          <span className="label-xs w-14 shrink-0">To</span>
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="client@example.com"
            className="field flex-1"
          />
        </label>
        <label className="flex items-baseline gap-4">
          <span className="label-xs w-14 shrink-0">Subject</span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="field flex-1"
          />
        </label>
        <div>
          <span className="label-xs block pb-2">Body</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={Math.min(16, Math.max(6, body.split("\n").length + 1))}
            className="field-framed resize-y text-[14px] leading-relaxed"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-5">
        <a href={mailto} className="btn-link text-accent-400 hover:text-accent-300">
          Open in mail client →
        </a>
        <button onClick={() => copy("all")} className="btn-link">
          {copied === "all" ? "Copied" : "Copy all"}
        </button>
        <button onClick={() => copy("body")} className="btn-link">
          {copied === "body" ? "Copied" : "Copy body"}
        </button>
        <button onClick={() => copy("subject")} className="btn-link">
          {copied === "subject" ? "Copied" : "Copy subject"}
        </button>
      </div>
    </div>
  );
}
