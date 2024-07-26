import type { PageContext } from "vike/types";
import { composeHead, composeHeadMetadata } from "@techmely/head";
import { unique } from "@techmely/es-toolkit";

function generateAppHead(pageContext: PageContext): string {
  const configHeads = pageContext?.config?.heads || [];
  const headMetadata = pageContext?.config?.metadata?.head || {};
  const _headMetadata = composeHeadMetadata(headMetadata);
  const _configHeads = composeHead(configHeads);

  const heads = unique([..._headMetadata, ..._configHeads]);
  return heads.join("\n");
}

export default generateAppHead;
