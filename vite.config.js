import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const options = {
  base: "/Pomodoro-App/",
  includedAssets: ["**/*"],
  workbox: { globPatterns: ["**/*"] },
  manifest: {
    name: "Pomodoro",
    short_name: "Pomodoro",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    start_url: "/Pomodoro-App/",
    icons: [
      {
        src: "icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Pomodoro-App/",
  plugins: [react(), VitePWA(options)],
});
