import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "build", // specify the output directory
        assetsInlineLimit: Infinity, // inline all assets
    },
});
