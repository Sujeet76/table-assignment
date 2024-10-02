import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "/favicon/favicon.ico",
        "/favicon/apple-touch-icon.png",
        "/favicon/favicon-16x16.png",
        "/favicon/favicon-32x32.png",
      ],
      manifest: {
        name: "Chemical Supplies Management",
        short_name: "ChemSupplies",
        description:
          "Manage your chemical supplies with our reusable table component",
        theme_color: "#ffffff",
        icons: [
          {
            src: "favicon/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "favicon/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "favicon/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "favicon/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "favicon/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "favicon/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
