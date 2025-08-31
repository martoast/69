import { OpenAI } from 'openai'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const openai = new OpenAI({ apiKey: config.openaiApiKey })
    
    // Test simple completion
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say hello" }],
      max_tokens: 10
    })
    
    return { success: true, response: completion.choices[0].message.content }
  } catch (error) {
    return { success: false, error: error.message }
  }
})