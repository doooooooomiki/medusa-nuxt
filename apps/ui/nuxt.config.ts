// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-03-02",

  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"],

  shadcn: {
    prefix: "",
    componentDir: "./components",
  },
});
