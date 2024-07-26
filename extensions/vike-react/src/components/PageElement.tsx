import { StrictMode, Suspense } from "react";
import type { PageContext } from "vike/types";
import { PageContextProvider } from "../providers/PageContextProvider";

export function PageElement(pageContext: PageContext): JSX.Element {
  const {
    Page,
    config: { Loading },
  } = pageContext;
  let page = Page ? <Page /> : null;
  // @ts-expect-error Ignore type errors
  const loadingLayout: VikeLoading["layout"] = Loading?.layout;
  page = wrapSuspense(page, loadingLayout, page);
  /**
   * Only layout & wrapper components are cumulative
   */
  const wrapperComps = [
    // Inner wrapping
    ...((pageContext.config?.Layout || []) as unknown as JSX.Element[]),
    // Outer wrapping
    ...((pageContext.config?.Wrapper || []) as unknown as JSX.Element[]),
  ];

  for (const Wrap of wrapperComps) {
    // @ts-expect-error Ignore type errors
    page = <Wrap>{page}</Wrap>;
    page = wrapSuspense(page, loadingLayout, page);
  }

  return (
    <StrictMode>
      <PageContextProvider pageContext={pageContext}>
        {page}
      </PageContextProvider>
    </StrictMode>
  );
}

function wrapSuspense(
  el: JSX.Element | null,
  LoadingLayout: VikeLoading["layout"],
  page: JSX.Element | null
) {
  if (!LoadingLayout) return el;
  return <Suspense fallback={<LoadingLayout />}>{page}</Suspense>;
}
