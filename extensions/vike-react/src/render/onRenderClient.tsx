import { type Root, createRoot, hydrateRoot } from "react-dom/client";
import type { OnRenderClientSync } from "vike/types";
import { PageElement } from "../components/PageElement";
import { getPrimitiveOrContextValue } from "../utils/getPrimtiveOrContextValue";

let app: Root;
const onRenderClient: OnRenderClientSync = (pageContext) => {
  pageContext.config.onBeforeRenderClient?.(pageContext);

  const page = PageElement(pageContext);
  const container = document.getElementById("root");
  if (!container) throw new Error("Aww - No root element - No app");
  if (container.innerHTML !== "" && pageContext.isHydration) {
    // Hydration
    app = hydrateRoot(container, page);
  } else {
    if (!app) {
      // First rendering
      app = createRoot(container);
    } else {
      // Client navigation
      const title = getPrimitiveOrContextValue("title", pageContext);
      const lang = getPrimitiveOrContextValue("lang", pageContext) || "en";
      if (title) document.title = title;
      document.documentElement.lang = lang;
    }

    app.render(page);
  }

  pageContext.config.onAfterRenderClient?.(pageContext);
};

export default onRenderClient;
