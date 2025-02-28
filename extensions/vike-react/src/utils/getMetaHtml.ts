import { kebabize, mapObject } from "@techmely/es-toolkit";
import type { PageContextServer } from "vike/types";

export function getMetaHtml(pageContext: PageContextServer) {
  const dataHeadHtml =
    pageContext?.metadata?.dataHeadHtml || pageContext?.config?.metadata?.dataHeadHtml;
  const dataHead = dataHeadHtml
    ? Object.entries(mapObject(dataHeadHtml, (k, v) => [`data-${kebabize(k)}`, v.toString()]))
        .reduce((acc, [key, value]) => {
          return acc.concat(" ", `${key}=${value}`);
        }, "")
        .trimStart()
    : "";

  return dataHead;
}
