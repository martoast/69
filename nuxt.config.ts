// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    openaiAssistantId: process.env.OPENAI_ASSISTANT_ID,
  }
})
