import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    proxy: {
      "/api/countries": {
        target: "https://api.restcountries.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/countries/, "/countries/v5"),
      },
    },
  },
});
