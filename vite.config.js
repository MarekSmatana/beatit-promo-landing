import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const page = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [react()],
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
