import type { PageContext } from "vike/types";

export function getHeadSetting(
  headSetting: "title" | "favicon" | "lang",
  pageContext: PageContext
) {
  const config = pageContext.configEntries[headSetting]?.[0];
  if (!config) {
    const titleHead = pageContext.Head?.title;
    return titleHead;
  }
  const val = config.configValue;
  if (typeof val === "string") return val;
  if (!val) return null;
  if (typeof val === "function") {
    const valStr = val(pageContext);
    if (typeof valStr !== "string") {
      throw new Error(`${config.configDefinedAt} should return a string`);
    }
    return valStr;
  }
  throw new Error(
    `${config.configDefinedAt} should be a string or a function returning a string`
  );
}
