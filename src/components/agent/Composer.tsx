import { useRef, useState } from "react";

type Props = {
  disabled: boolean;
  streaming: boolean;
  onSubmit: (text: string) => void;
  onCancel: () => void;
  placeholder: string;
};

export default function Composer({
  disabled,
  streaming,
  onSubmit,
  onCancel,
  placeholder,
}: Props) {
  const [text, setText] = useState("");
  const taRef = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);

  const handleSubmit = () => {
    const t = text.trim();
    if (!t || disabled || streaming) return;
    onSubmit(t);
    setText("");
    if (taRef.current) taRef.current.style.height = "auto";
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 220) + "px";
  };

  return (
    <div className="border-t border-white/[0.06] bg-black/25 px-6 py-4">
      <div
        className={`relative flex items-end gap-4 border-b pb-2 pt-3 transition ${
          focused
            ? "border-white/30"
            : "border-white/10"
        }`}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-ink-500 pb-3">»</span>
        <textarea
          ref={taRef}
          value={text}
          onChange={autoResize}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={1}
          placeholder={placeholder}
          disabled={disabled}
          className="max-h-[220px] flex-1 resize-none bg-transparent py-2 text-[15px] leading-relaxed text-white outline-none placeholder:text-ink-500 placeholder:italic placeholder:font-light disabled:cursor-not-allowed"
        />

        {streaming ? (
          <button
            onClick={onCancel}
            className="btn-link shrink-0 pb-3 text-danger-400 hover:text-danger-300"
            title="Stop"
          >
            ■ Stop
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || disabled}
            className="btn-link shrink-0 pb-3 text-white disabled:text-ink-500"
            title="Send (Enter)"
          >
            Send ↵
          </button>
        )}
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
        Enter<span className="mx-1.5 opacity-40">·</span>send
        <span className="mx-2.5 opacity-40">/</span>
        Shift + Enter<span className="mx-1.5 opacity-40">·</span>newline
        <span className="mx-2.5 opacity-40">/</span>
        Informational only, not tax advice
      </p>
    </div>
  );
}
