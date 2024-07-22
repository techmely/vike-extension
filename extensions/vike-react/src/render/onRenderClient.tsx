import type { ReactNode } from "react";
import { type Root, createRoot, hydrateRoot } from "react-dom/client";
import type { OnRenderClientSync } from "vike/types";
import { AppPage } from "../utils/App";
import { getHeadSetting } from "../utils/getHead";

let app: Root;
const onRenderClient: OnRenderClientSync = (pageContext) => {
  pageContext.config.onBeforeRenderClient?.(pageContext);

  const page = AppPage(pageContext) as ReactNode;
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
      const title = getHeadSetting("title", pageContext);
      const lang = getHeadSetting("lang", pageContext) || "en";
      if (title) document.title = title;
      document.documentElement.lang = lang;
    }

    app.render(page);
  }

  pageContext.config.onAfterRenderClient?.(pageContext);
};

export default onRenderClient;
