import type { QueryClientConfig } from "@tanstack/react-query";
import type { ReactNode } from "react";
import type { ImportString } from "vike/types";

declare global {
  namespace VikePackages {
    interface ConfigVikeReact {
      queryClientConfig?: QueryClientConfig;
      FallbackErrorBoundary:
        | ((props: { children: ReactNode }) => ReactNode)
        | ImportString;
    }
  }
}
