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
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '69 - Generate Letters of Intent with Ease',
      meta: [
        // Essential SEO tags
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1,viewport-fit=cover,maximum-scale=1'
        },
        { 
          name: 'description', 
          content: 'The tools you need to analyze properties and generate professional letters of intent. Close more wholesale deals with data-driven offers that get accepted.'
        },
        // Facebook domain verification (keep this if you need it)
        {
          name: 'facebook-domain-verification',
          content: 'kmve28gubfhfg1vgfz3xpxxwqyde9e'
        },
        // Open Graph / Facebook
        { 
          property: 'og:type', 
          content: 'website'
        },
        { 
          property: 'og:url', 
          content: 'https://69-loi-generator.netlify.app/'
        },
        { 
          property: 'og:title', 
          content: '69 - Generate Letters of Intent with Ease'
        },
        { 
          property: 'og:description', 
          content: 'The tools you need to analyze properties and generate professional letters of intent. Close more wholesale deals with data-driven offers that get accepted.'
        },
        { 
          property: 'og:image', 
          content: 'https://69-loi-generator.netlify.app/logo.jpeg'
        },
        { 
          property: 'og:image:width', 
          content: '1200'
        },
        { 
          property: 'og:image:height', 
          content: '630'
        },
        // Twitter
        { 
          name: 'twitter:card', 
          content: 'summary_large_image'
        },
        { 
          name: 'twitter:title', 
          content: '69 - Generate Letters of Intent with Ease'
        },
        { 
          name: 'twitter:description', 
          content: 'The tools you need to analyze properties and generate professional letters of intent. Close more wholesale deals with data-driven offers that get accepted.'
        },
        { 
          name: 'twitter:image', 
          content: 'https://69-loi-generator.netlify.app/logo.jpeg'
        }
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    openaiAssistantId: process.env.OPENAI_ASSISTANT_ID,
  }
})