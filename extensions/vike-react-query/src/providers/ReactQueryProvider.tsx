import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type FC, type PropsWithChildren, useState } from "react";
import type { PageContext } from "vike/types";
import { StreamedHydration } from "../components/StreamedHydration";
import { usePageContext } from "@techmely/vike-react/usePageContext";

type Props = {
  pageContext: PageContext;
};

const ReactQueryProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const pageContext = usePageContext();
  const { queryClientConfig, FallbackErrorBoundary = PassThrough } =
    pageContext.config;
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-expect-error Ignore typing here */}
      <FallbackErrorBoundary>
        <StreamedHydration client={queryClient}>{children}</StreamedHydration>
      </FallbackErrorBoundary>
    </QueryClientProvider>
  );
};

function PassThrough({ children }: any) {
  return <>{children}</>;
}
export default ReactQueryProvider;
