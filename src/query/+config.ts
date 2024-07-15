import type { Config } from "vike/types";

const config = {
  name: "@techmely/vike-react-query",
  queryClientConfig: undefined,
  ReactQueryProvider: "import:@techmely/vike-react/providers/ReactQueryProvider:default",
  FallbackErrorBoundary: "import:@techmely/vike-react/components/FallbackErrorBoundary:default",
  meta: {
    queryClientConfig: {
      env: {
        server: true,
        client: true,
      },
    },
    FallbackErrorBoundary: {
      env: {
        server: true,
        client: true,
      },
    },
  },
} as unknown as Config;

export default config;
