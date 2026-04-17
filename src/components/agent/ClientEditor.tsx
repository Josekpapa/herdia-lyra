import { useState } from "react";
import type { Client, FilingStatus } from "../../lib/advisor/types";
import { FILING_STATUS_LABEL } from "../../lib/advisor/types";
import { createClient } from "../../lib/advisor/store";

type Props = {
  initial?: Client;
  onSave: (client: Client) => void;
  onCancel: () => void;
};

export default function ClientEditor({ initial, onSave, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>(initial?.filingStatus ?? "single");
  const [state, setState] = useState(initial?.state ?? "");
  const [age, setAge] = useState<string>(initial?.age?.toString() ?? "");
  const [dependents, setDependents] = useState<string>(initial?.dependents?.toString() ?? "");
  const [wages, setWages] = useState<string>(initial?.income?.wages?.toString() ?? "");
  const [selfEmployment, setSelfEmployment] = useState<string>(
    initial?.income?.selfEmployment?.toString() ?? "",
  );
  const [investment, setInvestment] = useState<string>(
    initial?.income?.investment?.toString() ?? "",
  );
  const [rental, setRental] = useState<string>(initial?.income?.rental?.toString() ?? "");
  const [trad401k, setTrad401k] = useState<string>(
    initial?.retirement?.traditional401k?.toString() ?? "",
  );
  const [rothIra, setRothIra] = useState<string>(
    initial?.retirement?.rothIra?.toString() ?? "",
  );
  const [tags, setTags] = useState(initial?.tags?.join(", ") ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [err, setErr] = useState<string | null>(null);

  const num = (s: string): number | undefined => {
    if (s.trim() === "") return undefined;
    const v = Number(s.replace(/,/g, ""));
    return Number.isFinite(v) ? v : undefined;
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErr("Name is required.");
      return;
    }
    const base = initial ?? createClient({ name: name.trim(), filingStatus });
    const updated: Client = {
      ...base,
      name: name.trim(),
      email: email.trim() || undefined,
      filingStatus,
      state: state.trim() || undefined,
      age: num(age),
      dependents: num(dependents),
      income: {
        wages: num(wages),
        selfEmployment: num(selfEmployment),
        investment: num(investment),
        rental: num(rental),
      },
      retirement: {
        traditional401k: num(trad401k),
        rothIra: num(rothIra),
      },
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      notes: notes.trim() || undefined,
      updatedAt: Date.now(),
    };
    onSave(updated);
  };

  return (
    <form onSubmit={save} className="flex flex-col">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 border-b border-white/[0.06] px-8 py-6">
        <div className="flex flex-col gap-2">
          <span className="kicker">{initial ? "Edit client" : "New client"}</span>
          <h2 className="font-display text-[1.75rem] font-light leading-none tracking-tight text-white">
            {initial ? initial.name : <em className="italic text-brand-300/90">Untitled</em>}
          </h2>
        </div>
        <button type="button" onClick={onCancel} className="btn-link">
          Cancel
        </button>
      </div>

      <div className="flex flex-col gap-10 px-8 py-8">
        {/* Identity */}
        <Section label="Identity" code="01">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Name *">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="field"
                required
                placeholder="Jane Doe"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field"
                placeholder="jane@example.com"
              />
            </Field>
            <Field label="Filing status">
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
                className="field"
              >
                {(Object.keys(FILING_STATUS_LABEL) as FilingStatus[]).map((fs) => (
                  <option key={fs} value={fs} className="bg-ink-900">
                    {FILING_STATUS_LABEL[fs]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="State (abbr.)">
              <input
                value={state}
                onChange={(e) => setState(e.target.value.toUpperCase())}
                placeholder="NY"
                maxLength={2}
                className="field"
              />
            </Field>
            <Field label="Age">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="field"
                placeholder="—"
              />
            </Field>
            <Field label="Dependents">
              <input
                type="number"
                value={dependents}
                onChange={(e) => setDependents(e.target.value)}
                className="field"
                placeholder="0"
              />
            </Field>
          </div>
        </Section>

        {/* Income */}
        <Section label="Annual income ($)" code="02">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Wages (W-2)">
              <input inputMode="numeric" value={wages} onChange={(e) => setWages(e.target.value)} className="field data-num" placeholder="0" />
            </Field>
            <Field label="Self-employment">
              <input inputMode="numeric" value={selfEmployment} onChange={(e) => setSelfEmployment(e.target.value)} className="field data-num" placeholder="0" />
            </Field>
            <Field label="Investment">
              <input inputMode="numeric" value={investment} onChange={(e) => setInvestment(e.target.value)} className="field data-num" placeholder="0" />
            </Field>
            <Field label="Rental">
              <input inputMode="numeric" value={rental} onChange={(e) => setRental(e.target.value)} className="field data-num" placeholder="0" />
            </Field>
          </div>
        </Section>

        {/* Retirement */}
        <Section label="Retirement contributions YTD ($)" code="03">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Traditional 401(k)">
              <input inputMode="numeric" value={trad401k} onChange={(e) => setTrad401k(e.target.value)} className="field data-num" placeholder="0" />
            </Field>
            <Field label="Roth IRA">
              <input inputMode="numeric" value={rothIra} onChange={(e) => setRothIra(e.target.value)} className="field data-num" placeholder="0" />
            </Field>
          </div>
        </Section>

        {/* Tags + Notes */}
        <Section label="Context" code="04">
          <div className="flex flex-col gap-6">
            <Field label="Tags (comma-separated)">
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="high-earner, cross-border"
                className="field"
              />
            </Field>
            <Field label="Notes">
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="field-framed resize-y leading-relaxed"
                placeholder="Private notes visible only to advisors on this workspace…"
              />
            </Field>
          </div>
        </Section>
      </div>

      {err && (
        <div className="mx-8 mb-6 border-l-2 border-danger-500/60 px-3 py-2 text-sm text-danger-300">
          {err}
        </div>
      )}

      <div className="flex items-center gap-5 border-t border-white/[0.06] bg-black/20 px-8 py-4">
        <button type="submit" className="btn-primary">
          {initial ? "Save changes" : "Create client"}
        </button>
        <button type="button" onClick={onCancel} className="btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}

function Section({
  label,
  code,
  children,
}: {
  label: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5">
      <header className="flex items-center gap-4">
        <span className="font-mono text-[10px] tracking-[0.25em] text-ink-500">{code}</span>
        <span className="font-display text-[15px] font-light tracking-tight text-white">{label}</span>
        <span className="h-px flex-1 bg-white/[0.05]" />
      </header>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="label-xs">{label}</span>
      {children}
    </label>
  );
}
