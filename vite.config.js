import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { renderSharePreview } from "./server/share.js";

const page = (path) => fileURLToPath(new URL(path, import.meta.url));
const examplePostId = "00000000-0000-4000-8000-000000000001";

function sharePreviewExamples() {
  const examples = new Map([
    ["/user/demo_athlete", ["user", "demo_athlete", { username: "demo_athlete", display_name: "Demo Athlete" }]],
    [`/post/${examplePostId}`, ["post", examplePostId, { title: "Full Body Strength", owner_username: "demo_athlete", owner_display_name: "Demo Athlete", completed_at: "2026-09-30T12:00:00Z" }]],
  ]);

  return {
    name: "share-preview-examples",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = new URL(request.url, "http://localhost").pathname;
        const example = examples.get(pathname);
        if (!example) return next();

        const preview = renderSharePreview(...example);
        response.statusCode = preview.status;
        for (const [name, value] of preview.headers) response.setHeader(name, value);
        response.end(await preview.text());
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), sharePreviewExamples()],
  build: {
    rollupOptions: {
      input: {
        main: page("index.html"),
        privacy: page("privacy/index.html"),
        terms: page("terms/index.html"),
        contact: page("contact/index.html"),
      },
    },
  },
});
