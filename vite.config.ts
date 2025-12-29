import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  // CRITICAL FIX: In GitHub Actions (and other CI systems), secrets are often passed
  // as shell environment variables (process.env). Vite's loadEnv mainly targets .env files.
  // We must explicitly fall back to process.env.API_KEY to capture the injected secret.
  const apiKey = process.env.API_KEY || env.API_KEY;

  return {
    plugins: [react()],
    // This allows us to use process.env.API_KEY in the client-side code
    // by replacing it with the string value at build time.
    define: {
      "process.env.API_KEY": JSON.stringify(apiKey),
    },
    // IMPORTANT: For User Pages (https://username.github.io), the base must be '/'
    // If this was a project site (https://username.github.io/project), it would be '/project/'
    base: "/",
    build: {
      outDir: "dist",
    },
  };
});
