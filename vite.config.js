import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "ReactGeometryNodeGraph",
      formats: ["es", "umd"],
      fileName: (format) => `react-geometry-node-graph.${format}.js`,
    },
  },
});
