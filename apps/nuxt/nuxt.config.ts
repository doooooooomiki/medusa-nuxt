// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-03-02",

  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/medusa",
  ],

  shadcn: {
    componentDir: "./app/components/ui",
  },

  i18n: {
    vueI18n: "./i18n.config.ts",
    locales: ["en", "fr", "uk"],
    defaultLocale: "uk",
    strategy: "prefix",
  },

  medusa: {
    server: true,
    publishableKey: process.env.MEDUSA_PUBLISHABLE_KEY,
  },
});
