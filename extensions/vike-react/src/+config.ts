import type { Config, ConfigEnv } from "vike/types";

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
    metadata: { env: serverClient },
    onAfterRenderClient: { env: clientOnly },
    onBeforeRenderClient: { env: clientOnly },
  },
} satisfies Config;

export default config;
export * from "./typing.d";
