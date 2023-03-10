import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const options = {
  base: "/Pomodoro-App/",
  includedAssets: ["favicon.ico"],
  manifest: {
    name: "Pomodoro",
    short_name: "Pomodoro",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "fullscreen",
    start_url: "/Pomodoro-App/",
    icons: [
      {
        src: "icon-192x192.png",
        sizes: "192x192",
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
