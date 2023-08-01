import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";
import { name } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name,
      formats: ["es", "umd"],
      fileName: (format) => `${name}.${format}.js`,
    },
  },
  rollupOptions: {
    external: ["react", "react-dom"],
    output: {
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
  },
});
