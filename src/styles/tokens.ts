/** Colour names defined as --color-<name> in tokens.css. */
export type ColorToken = "paper" | "ink" | "graphite" | "rule" | "acid";

const cache = new Map<ColorToken, string>();

/** Reads a colour token from CSS, for code that can't use var(--…), like three.js materials. */
export function cssColor(name: ColorToken): string {
  const cached = cache.get(name);
  if (cached) return cached;

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${name}`)
    .trim();
  if (!value) throw new Error(`Colour token --color-${name} is not defined in tokens.css`);

  cache.set(name, value);
  return value;
}
