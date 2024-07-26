import type { Config, ConfigEffect, ConfigEnv } from "vike/types";

const isProd = process.env.NODE_ENV === "production";

const serverClient: ConfigEnv = {
  client: true,
  server: true,
};
const clientOnly: ConfigEnv = {
  client: true,
  server: false,
};
const serverOnly: ConfigEnv = {
  client: false,
  server: true,
};

const passToClient = ["metadata", "routeParams", "initStoreState"];
if (!isProd) {
  // https://github.com/vikejs/vike-react/issues/25
  passToClient.push("$$typeof");
}

const config = {
  name: "@techmely/vike-react",
  passToClient,
  clientRouting: true,
  hydrationCanBeAborted: true,
  prefetchStaticAssets: "hover",
  onRenderHtml: "import:@techmely/vike-react/onRenderHtml:default",
  onRenderClient: "import:@techmely/vike-react/onRenderClient:default",
  meta: {
    Head: { env: serverOnly, cumulative: true },
    Layout: { env: serverClient, cumulative: true },
    Wrapper: { env: serverClient, cumulative: true },
    Loading: { env: serverClient },
    lang: { env: serverClient },
    ssr: { env: { config: true }, effect: ssrEffect },
    stream: { env: { server: true } },
    metadata: { env: serverClient, cumulative: true },
    onAfterRenderClient: { env: clientOnly },
    onBeforeRenderClient: { env: clientOnly },
  },
} satisfies Config;

export type * from "./typing.d";
export default config;

function ssrEffect({
  configDefinedAt,
  configValue,
}: Parameters<ConfigEffect>[0]): ReturnType<ConfigEffect> {
  if (typeof configValue !== "boolean")
    throw new Error(`${configDefinedAt} should be a boolean`);
  const env = {
    // Always load on the client-side.
    client: true,
    // When the SSR flag is false, we want to render the page only on the client-side.
    // We achieve this by loading `Page` only on the client-side: when onRenderHtml()
    // gets a `Page` value that is undefined it skip server-side rendering.
    server: configValue !== false,
  };
  return {
    meta: {
      Page: { env },
      Layout: { env },
      Loading: { env },
    },
  };
}
