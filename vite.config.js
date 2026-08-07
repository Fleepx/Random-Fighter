import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // El alias tiene que existir aca ademas de en jsconfig.json: jsconfig
    // solo guia al editor y a shadcn, quien resuelve en el build es Vite.
    alias: {
      "@": path.resolve(new URL(".", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"), "src"),
    },
  },
  server: { historyApiFallback: true },
  preview: { historyApiFallback: true },
});
