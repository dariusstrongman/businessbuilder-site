export type ClassValue = string | false | 0 | 0n | null | undefined;

/** Joins class names, dropping falsy values. */
export function cn(...values: ClassValue[]): string {
  return values.filter((v): v is string => typeof v === "string" && v.length > 0).join(" ");
}
