import type { Client, Conversation } from "../../lib/advisor/types";

type Props = {
  conversations: Conversation[];
  activeId: string | null;
  clients: Client[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ConversationList({
  conversations,
  activeId,
  clients,
  onSelect,
  onDelete,
}: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <span className="label-xs">Recent</span>
        <span className="font-mono text-[10px] text-ink-500">
          {String(conversations.length).padStart(2, "0")}
        </span>
      </div>

      {conversations.length === 0 && (
        <p className="px-5 py-6 text-xs leading-relaxed text-ink-500">
          No conversations yet.
          <br />
          Start one from the button above.
        </p>
      )}

      <div className="flex flex-col">
        {conversations.map((c) => {
          const client = clients.find((cl) => cl.id === c.clientId);
          const active = activeId === c.id;
          return (
            <div
              key={c.id}
              className={`hairline-row group flex items-start gap-3 px-5 py-3 ${
                active ? "is-active" : ""
              }`}
            >
              <button
                className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left"
                onClick={() => onSelect(c.id)}
              >
                <span
                  className={`line-clamp-2 text-[13.5px] leading-snug transition ${
                    active ? "text-white" : "text-ink-200 group-hover:text-white"
                  }`}
                >
                  {c.title}
                </span>
                <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
                  {client?.name ?? "No client"}
                  <span className="mx-1.5 opacity-50">·</span>
                  {new Date(c.updatedAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </button>
              <button
                onClick={() => onDelete(c.id)}
                className="p-1 text-ink-500 opacity-0 transition hover:text-danger-400 group-hover:opacity-100"
                aria-label="Delete conversation"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <path d="M3 6h18" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
