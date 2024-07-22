import { StrictMode, Suspense } from "react";
import type { PageContext } from "vike/types";
import { PageContextProvider } from "../providers/PageContextProvider";

export function PageElement(pageContext: PageContext): JSX.Element {
  const Layout = pageContext.config?.Layout || PassThrough;

  const { Page, Loading } = pageContext;
  let page = Page ? <Page /> : null;
  const AppWrapper = pageContext.config?.Wrapper || PassThrough;
  page = wrapSuspense(page, Loading?.layout, page);

  return (
    <StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <AppWrapper pageContext={pageContext}>
          <Layout>{page}</Layout>
        </AppWrapper>
      </PageContextProvider>
    </StrictMode>
  );
}

function PassThrough({ children }: any) {
  return <>{children}</>;
}

function wrapSuspense(
  el: JSX.Element | null,
  LoadingLayout: VikeLoading["layout"],
  page: JSX.Element
) {
  if (!LoadingLayout) return el;
  return <Suspense fallback={<LoadingLayout />}>{page}</Suspense>;
}
