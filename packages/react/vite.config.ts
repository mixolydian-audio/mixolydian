import { defineConfig } from "vite";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "react",
      formats: ["iife", "cjs", "umd", "es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
  plugins: [dts()],
});
