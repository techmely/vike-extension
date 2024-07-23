import type { StringEnum } from "@techmely/types";
import type { FC, PropsWithChildren, ReactNode } from "react";
import type { PageContext, PageContextClient } from "vike/types";
import type { Head, HeadMetadata } from "@techmely/head";

type PageProps = Record<string, any>;

declare global {
  type FcWithPageContext = FC<
    PropsWithChildren<{ pageContext: PageContext; [key: string]: any }>
  >;

  type VikeLoading = {
    component?: () => ReactNode;
    layout?: () => ReactNode;
  };

  namespace VikePackages {
    interface ConfigVikeReact {
      Layout?: FC<PropsWithChildren<any>>;
      Page?: FC<PropsWithChildren<any>>;
      Wrapper?: FcWithPageContext;
      /**
       * +Loading.layout adds a `<Suspense>` boundary to the [`<Page>` component](https://vike.dev/Page) as well as to all [`<Layout>` components](https://vike.dev/Layout)
       */
      Loading?: { component?: () => ReactNode; layout?: () => ReactNode };
      Head?: Head[];
      headMetadata?: HeadMetadata;
      metadata?: VikeMetadata;
      /**
       * Client-side hook called before the page is rendered.
       */
      onBeforeRenderClient?: (pageContext: PageContextClient) => void;
      onAfterRenderClient?: (pageContext: PageContextClient) => void;
    }
  }

  namespace Vike {
    interface PageContext {
      Head?: Head[];
      headMetadata?: HeadMetadata;
      Layout?: FC<PropsWithChildren<any>>;
      Page?: FC<PropsWithChildren<any>>;
      /**
       * +Loading.layout adds a `<Suspense>` boundary to the [`<Page>` component](https://vike.dev/Page) as well as to all [`<Layout>` components](https://vike.dev/Layout)
       */
      Loading?: VikeLoading;
      metadata?: VikeMetadata;
    }
  }

  type VikeMetadata = {
    userAgent?: string;
    isMobile?: boolean;
    /**
     * <html lang="${locale}">
     * @default 'en'
     * **/
    locale?: string;
    /**
     * Record<string, Record<EntityId, any>>
     */
    initStoreState?: Record<string, Record<string, any>>;
    /**
     * Whether to stream the page's HTML.
     *
     * Requires Server-Side Rendering (`ssr: true`).
     *
     * A Node.js Stream is used whenever possible, falling back to a Web Stream otherwise.
     *
     * By setting the value to `web` or `node`, you force the usage of a Web Stream or Node.js Stream.
     *
     * @default false
     *
     * https://vike.dev/stream
     * boolean | 'node' | 'web'
     */
    stream?: boolean | "node" | "web";
    /**
     * If `true`, the page is rendered twice: on the server-side (to HTML) and on the client-side (hydration).
     *
     * If `false`, the page is rendered only once in the browser.
     *
     * See https://vike.dev/ssr
     * @default true
     */
    ssr?: boolean;
    /**
     * Inject some `data-` into the `<html>` tag.
     * @example { appVersion: "1.0.0"} --> data-app-version="1.0.0"
     */
    dataHeadHtml?: Record<string, string | number>;
    [key: string]: any;
  };

  interface Window {
    __vike?: Record<string, Record<string, unknown>>;
  }
}
