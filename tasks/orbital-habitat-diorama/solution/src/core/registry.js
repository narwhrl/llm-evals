// Registry of per-frame updatables and pointer-interactive objects.

/** @type {Array<(dt:number, t:number, clock:object) => void>} */
export const updatables = [];

/**
 * Interactive entries. `object` is raycast recursively (children included).
 * @typedef {{
 *   id: string,
 *   object: import('three').Object3D,
 *   onClick?: (hit: import('three').Intersection) => void,
 *   focus?: { target: import('three').Vector3, zoom: number } | null,
 *   cursor?: string,
 *   scrub?: boolean,
 *   priority?: number,
 * }} Interactive
 */
/** @type {Interactive[]} */
export const interactives = [];

/** Register a per-frame function. Returns an unregister function. */
export function addUpdatable(fn) {
  updatables.push(fn);
  return () => {
    const i = updatables.indexOf(fn);
    if (i >= 0) updatables.splice(i, 1);
  };
}

/**
 * Register an interactive object.
 * - `focus`: clicking focuses the camera there (click again / click empty space => overview).
 * - `scrub`: pointerdown on it is claimed by interaction.js for orbit-time scrubbing (big porthole only).
 * - `priority`: higher wins when several interactives are hit at similar depth (default 0).
 * @param {import('three').Object3D} object
 * @param {Omit<Interactive,'object'|'id'> & {id?: string}} opts
 */
export function addInteractive(object, opts = {}) {
  const entry = {
    id: opts.id || object.name || `interactive-${interactives.length}`,
    object,
    onClick: opts.onClick || null,
    focus: opts.focus || null,
    cursor: opts.cursor || 'pointer',
    scrub: !!opts.scrub,
    priority: opts.priority || 0,
  };
  object.traverse((o) => {
    o.userData.interactive = entry;
  });
  interactives.push(entry);
  return entry;
}

export const registry = { updatables, interactives, addUpdatable, addInteractive };
