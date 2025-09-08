// server/api/ai-chat.post.js
import { OpenAI } from 'openai'

export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    // Get the OpenAI API key from runtime config
    const config = useRuntimeConfig()
    
    if (!config.openaiApiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'OpenAI API key not configured'
      })
    }

    const openai = new OpenAI({
      apiKey: config.openaiApiKey
    })

    // Parse the request body
    const body = await readBody(event)
    const { messages, property, files } = body

    // Get the last user message
    const lastUserMessage = messages.findLast(m => m.role === 'user')
    
    if (!lastUserMessage) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No user message found'
      })
    }

    // Create property context
    const propertyContext = createPropertyContext(property)
    
    // Console log for debugging
    console.log('=== AI CHAT REQUEST ===')
    console.log('User Question:', lastUserMessage.content)
    if (files && files.length > 0) {
      console.log('Files attached:', files.length)
      files.forEach(f => {
        console.log(`- ${f.name} (${f.type})`)
      })
    }
    console.log('=== END REQUEST ===')
    
    // Prepare system message
    const systemMessage = `You are a real estate investment advisor. Help analyze deals and answer questions about properties.

Current property data:
${propertyContext}

Be specific about numbers and calculations when relevant.`

    // Check if we have images
    const hasImages = files && files.some(f => f.type.startsWith('image/'))
    
    // Choose the appropriate model and prepare messages
    let apiMessages = []
    let model = "gpt-3.5-turbo" // Default model
    
    if (hasImages) {
      // Use GPT-4o for vision capabilities
      model = "gpt-4o" // or "gpt-4-turbo" if you have access
      
      // Build the content array for vision model
      const contentArray = [
        {
          type: "text",
          text: lastUserMessage.content || "Please analyze the attached images and relate them to the real estate deal."
        }
      ]
      
      // Add each image
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          contentArray.push({
            type: "image_url",
            image_url: {
              url: file.content, // This should be the base64 data URL
              detail: "high" // Can be "low", "high", or "auto"
            }
          })
        }
      })
      
      // For text files, add their content as text
      files.forEach(file => {
        if (file.type === 'text/plain' || file.type.includes('text')) {
          try {
            const base64Data = file.content.split(',')[1]
            const textContent = Buffer.from(base64Data, 'base64').toString('utf-8')
            contentArray.push({
              type: "text",
              text: `\nContent of ${file.name}:\n${textContent}`
            })
          } catch (error) {
            console.error('Error processing text file:', error)
          }
        } else if (file.type === 'application/pdf') {
          // Add a note about PDF
          contentArray.push({
            type: "text",
            text: `\n[Note: PDF file "${file.name}" was uploaded. For full PDF analysis, consider using a PDF extraction service or copy the text content.]`
          })
        }
      })
      
      apiMessages = [
        { role: "system", content: systemMessage },
        { role: "user", content: contentArray }
      ]
      
    } else {
      // No images - use standard text format
      let userContent = lastUserMessage.content || "Please help me analyze this deal."
      
      // Process any text files
      if (files && files.length > 0) {
        files.forEach(file => {
          if (file.type === 'text/plain' || file.type.includes('text')) {
            try {
              const base64Data = file.content.split(',')[1]
              const textContent = Buffer.from(base64Data, 'base64').toString('utf-8')
              userContent += `\n\nContent of ${file.name}:\n${textContent}`
            } catch (error) {
              console.error('Error processing text file:', error)
            }
          } else if (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel' || 
                     file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                     file.name.endsWith('.csv')) {
            // Process CSV files
            try {
              const base64Data = file.content.split(',')[1]
              const csvContent = Buffer.from(base64Data, 'base64').toString('utf-8')
              userContent += `\n\nCSV Data from ${file.name}:\n${csvContent}\n\nPlease analyze this spreadsheet data in the context of the real estate deal.`
            } catch (error) {
              console.error('Error processing CSV file:', error)
              userContent += `\n\n[Note: CSV file "${file.name}" was uploaded but could not be processed.]`
            }
          } else if (file.type === 'application/pdf') {
            userContent += `\n\n[Note: PDF file "${file.name}" was uploaded. For analysis, please copy and paste the relevant text content.]`
          }
        })
      }
      
      // Add context from previous messages (last 3 exchanges)
      apiMessages = [
        { role: "system", content: systemMessage }
      ]
      
      const previousMessages = messages.slice(-7, -1)
      previousMessages.forEach(msg => {
        if (msg.role === 'user' || msg.role === 'assistant') {
          apiMessages.push({
            role: msg.role,
            content: msg.content
          })
        }
      })
      
      apiMessages.push({
        role: "user",
        content: userContent
      })
    }
    
    console.log(`Using model: ${model}`)
    console.log(`Number of messages: ${apiMessages.length}`)
    
    // Make the API call
    const completion = await openai.chat.completions.create({
      model: model,
      messages: apiMessages,
      max_tokens: hasImages ? 4096 : 2000,
      temperature: 0.7
    })

    return {
      status: "success",
      message: {
        role: "assistant",
        content: completion.choices[0].message.content,
      }
    }
    
  } catch (error) {
    console.error("AI Chat API Error:", error)
    
    if (error.response) {
      console.error("OpenAI API Response:", error.response.status)
      console.error("Error details:", error.response.data)
      
      // Check for specific errors
      const errorMessage = error.response.data?.error?.message || ""
      
      if (errorMessage.includes("model") || error.response.status === 404) {
        // Model not available - fallback to basic model
        console.log("Model not available, falling back to gpt-3.5-turbo...")
        
        // Retry with basic model
        try {
          const config = useRuntimeConfig()
          const openai = new OpenAI({ apiKey: config.openaiApiKey })
          const body = await readBody(event)
          const { messages, property } = body
          const lastUserMessage = messages.findLast(m => m.role === 'user')
          
          const fallbackMessages = [
            { 
              role: "system", 
              content: `You are a real estate investment advisor. ${createPropertyContext(property)}`
            },
            { 
              role: "user", 
              content: lastUserMessage.content + "\n\n[Note: File uploads are not supported with the current model. Please describe the content you'd like analyzed.]"
            }
          ]
          
          const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: fallbackMessages,
            max_tokens: 2000,
            temperature: 0.7
          })
          
          return {
            status: "success",
            message: {
              role: "assistant",
              content: completion.choices[0].message.content + "\n\n[Note: Image analysis requires GPT-4 Vision capabilities. Please ensure you have access to gpt-4o or gpt-4-turbo models.]",
            }
          }
        } catch (fallbackError) {
          console.error("Fallback also failed:", fallbackError)
        }
      }
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to process your request. Please try again or contact support if the issue persists."
    })
  }
})

// Helper function to format property information
function createPropertyContext(property) {
  if (!property || !property.inputs) return ""
  
  const inputs = property.inputs || {}
  const calculations = property.calculations || {}
  
  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return 'Not provided'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }
  
  return `
Property: ${inputs.propertyAddress || 'Not specified'}
Price: ${formatCurrency(inputs.purchasePrice)}
Rent: ${formatCurrency(inputs.grossMonthlyRent)}/month
Cash Flow: ${formatCurrency(calculations.monthlyCashFlow)}/month`
}