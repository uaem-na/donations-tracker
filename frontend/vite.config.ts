import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  server: {
    host: true, // required for docker container to export port
    port: 8080,
    watch: {
      usePolling: true,
    },
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
});
