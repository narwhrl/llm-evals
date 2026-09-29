import { CLOSURE, IDENTITY } from "../core/copy.js";
import { useAppState } from "../core/store.js";

/** 收束时压在那条亮线上的一行字。结构没了，落款还在。 */
export default function Slab() {
  const state = useAppState();
  const on = state.collapsed || state.phase === "closed";

  return (
    <div className="slab" data-on={on ? "true" : "false"} aria-hidden={on ? "false" : "true"}>
      <div className="slab__inner">
        <p className="slab__title">{CLOSURE.colophon}</p>
        <span className="slab__credit">
          {IDENTITY.model} · {CLOSURE.credit.split("·").pop().trim()}
        </span>
      </div>
    </div>
  );
}
