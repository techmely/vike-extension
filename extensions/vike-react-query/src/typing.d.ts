import type { QueryClientConfig } from "@tanstack/react-query";
import type { ReactNode } from "react";
import type { ImportString } from "vike/types";

type PageProps = Record<string, any>;

declare global {
  namespace VikePackages {
    interface ConfigVikeReact {
      ReactQueryProvider?:
        | ((props: { children: ReactNode }) => ReactNode)
        | ImportString;
      queryClientConfig?: QueryClientConfig;
      FallbackErrorBoundary:
        | ((props: { children: ReactNode }) => ReactNode)
        | ImportString;
    }
  }
}
