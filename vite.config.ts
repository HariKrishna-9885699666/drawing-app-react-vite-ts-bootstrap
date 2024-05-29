import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load environment variables from the .env file
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@redux": path.resolve(__dirname, "./src/redux"),
        "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"), // Alias for Bootstrap
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~bootstrap/scss/bootstrap";`,
        },
      },
    },
    // Expose the loaded environment variables to the ViteJS configuration
    define: {
      "process.env": env,
    },
  };
});
