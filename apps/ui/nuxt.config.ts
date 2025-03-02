import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export default defineNuxtConfig({
  compatibilityDate: "2025-03-02",

  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"],

  shadcn: {
    prefix: "",
    componentDir: "./components",
  },

  components: [
    {
      path: join(dirname(fileURLToPath(import.meta.url)), "./components"),
      extensions: [".vue"],
    },
  ],
});
