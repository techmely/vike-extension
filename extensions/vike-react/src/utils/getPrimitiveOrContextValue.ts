import type { PageContext } from "vike/types";

export function getPrimitiveOrContextValue(
  setting: string,
  pageContext: PageContext
): undefined | null | string {
  const config = pageContext.configEntries.metadata?.[setting]?.[0];
  if (!config) return undefined;
  const val = config.configValue;
  if (typeof val === "string") return val;
  if (!val) return null;
  if (typeof val === "function") {
    if (typeof val !== "string") {
      throw new Error(`${config.configDefinedAt} should return a string`);
    }
    return val;
  }
  throw new Error(
    `${config.configDefinedAt} should be a string or a function returning a string`
  );
}
