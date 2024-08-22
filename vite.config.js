import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/ml": "http://localhost:5000",
      "/java": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    "process.env": process.env,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@tailwindConfig": path.resolve(__dirname, "tailwind.config.js"),
    },
  },
  optimizeDeps: {
    include: ["@tailwindConfig"],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
