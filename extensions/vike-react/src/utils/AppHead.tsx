import type { PageContext } from "vike/types";
import { composeHead, composeHeadMetadata } from "@techmely/head";
import { unique } from "@techmely/es-toolkit";

function generateAppHead(pageContext: PageContext): string {
  const { heads = [], metadata = [] } = pageContext?.config || [];
  const mergedMetadata = (metadata as VikeMetadata[]).reduce((acc, cur) => {
    // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
    return { ...acc, ...cur };
  }, {});
  const headMetadata = composeHeadMetadata(mergedMetadata);
  const _configHeads = composeHead(heads);

  const _heads = unique([...headMetadata, ..._configHeads]);
  return _heads.join("\n");
}

export default generateAppHead;
