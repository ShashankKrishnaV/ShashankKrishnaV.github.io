import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // This allows us to use process.env.API_KEY in the client-side code
    // by replacing it with the string value at build time.
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    // IMPORTANT: For User Pages (https://username.github.io), the base must be '/'
    // If this was a project site (https://username.github.io/project), it would be '/project/'
    base: '/', 
    build: {
      outDir: 'dist',
    }
  };
});