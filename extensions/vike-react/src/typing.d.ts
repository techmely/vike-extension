import type { StringEnum } from "@techmely/types";
import type { FC, PropsWithChildren, ReactNode } from "react";
import type { PageContext, PageContextClient } from "vike/types";

type PageProps = Record<string, any>;

declare global {
  type FcWithPageContext = FC<
    PropsWithChildren<{ pageContext: PageContext; [key: string]: any }>
  >;

  type VikeLoading = {
    component?: () => FC<PropsWithChildren<any>>;
    layout?: () => FC<PropsWithChildren<any>>;
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
      Head?: HeadMetadata;
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
      Head?: HeadMetadata;
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
    userAgent: string;
    isMobile: boolean;
    /**
     * <html lang="${locale}">
     * @default 'en'
     * **/
    locale: string;
    /**
     * Record<string, Record<EntityId, any>>
     */
    initStoreState: Record<string, Record<string, any>>;
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
    stream: boolean | "node" | "web";
    /**
     * If `true`, the page is rendered twice: on the server-side (to HTML) and on the client-side (hydration).
     *
     * If `false`, the page is rendered only once in the browser.
     *
     * See https://vike.dev/ssr
     * @default true
     */
    ssr: boolean;
    [key: string]: any;
  };

  interface Window {
    __vike?: Record<string, Record<string, unknown>>;
  }

  type HeadMetaAuthor = {
    name: string;
    url: string;
  };

  type HeadMetaRobots = {
    index?: boolean;
    follow?: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
    noimageindex?: boolean;
    nocache?: boolean;
    notranslate?: boolean;
    indexifembedded?: boolean;
    nositelinkssearchbox?: boolean;
    unavailable_after?: string;
    "max-video-preview"?: number | string;
    "max-image-preview"?: "none" | "standard" | "large";
    "max-snippet"?: number;
    googleBot?: string | HeadMetaRobots;
  };

  interface HeadMetadata {
    title?: string;
    description?: string;
    thumbnail?: string;
    /**
     * The robots setting for the document.
     *
     * @see https://developer.mozilla.org/docs/Glossary/Robots.txt
     * @example
     *
     * { index: false, follow: false }
     * <meta name="robots" content="noindex, nofollow" />
     * ```
     */
    robots?: HeadMetaRobots;
    /**
     * @example
     * { canonical: "https://example.com" }
     * <link rel="canonical" href="https://example.com" />
     */
    canonical?: string;
    /**
     * <meta name="application-name" content="Techmely" />
     */
    applicationName?: string;
    /**
     * @example * <meta name="author" content="Techmely Team" />
     * <link rel="author" href="https://techmely.com/about-us" />
     */
    authors?: HeadMetaAuthor | HeadMetaAuthor[];
    /**
     * @example * <meta name="generator" content="VikeJs" />
     */
    generator?: string;
    /**
     * @example <meta name="keywords" content="education, documents, blog, courses" />
     * ```
     */
    keywords?: string | string[];
    /**
     * @example <meta name="creator" content="Techmely Team" />
     */
    creator?: string;
    /**
     * <meta name="publisher" content="Cloudflare" />
     * ```
     */
    publisher?: string;
    /**
     * The category meta name property.
     * @example
     * "Education"
     * <meta name="category" content="Education" />
     */
    category?: string;
    /**
     * The additional JSON LD
     * @example
     * <script type="application/ld+json">
        {"@context": "http://schema.org"}
       </script>
     */
    jsonLd?: string[];
  }
}
