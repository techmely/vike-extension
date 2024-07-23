import type { Config } from "vike/types";

const serverClient = { server: true, client: true };

const config = {
  name: "@techmely/vike-react-query",
  queryClientConfig: undefined,
  Wrapper: "import:@techmely/vike-react/ReactQueryProvider:default",
  FallbackErrorBoundary:
    "import:@techmely/vike-react/FallbackErrorBoundary:default",
  meta: {
    queryClientConfig: { env: serverClient },
    FallbackErrorBoundary: { env: serverClient },
  },
} as unknown as Config;

export type * from "./typing.d";
export default config;
