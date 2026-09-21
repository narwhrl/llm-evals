import { DEFAULT_READING, FRAGMENTS, KIND_LABEL } from "../data/fragments";

interface MarginReadingProps {
  committedId: string | null;
  phase: string;
}

export function MarginReading({ committedId, phase }: MarginReadingProps) {
  const frag = FRAGMENTS.find((f) => f.id === committedId);
  const text = frag?.reading ?? DEFAULT_READING;

  return (
    <aside className="margin-reading" aria-live="polite">
      <div className="margin-meta mono">
        <span>margin note</span>
        <span aria-hidden="true">/</span>
        <span>{frag ? KIND_LABEL[frag.kind] : "identity"}</span>
        <span aria-hidden="true">/</span>
        <span>{phase}</span>
      </div>
      <p key={committedId ?? "default"} className="margin-body">
        {text}
      </p>
      {frag && (
        <p className="margin-hint mono">
          provisional verdict · reopen anytime
        </p>
      )}
    </aside>
  );
}
