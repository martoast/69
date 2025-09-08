// server/api/ai-chat.post.js
import { OpenAI } from 'openai'
import { extractText } from 'unpdf'

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

    // Check what type of files we have
    const hasImages = files && files.some(f => f.type.startsWith('image/'))
    
    // Prepare system message
    const systemMessage = `You are an expert commercial real estate investment advisor for the 69 Tool platform. 
You help users analyze deals, structure offers, and make smart investment decisions.

Current property data:
${propertyContext}

When analyzing documents:
- Extract key financial information (NOI, cap rates, rents, expenses)
- Identify deal terms and conditions
- Highlight risks and opportunities
- Suggest negotiation strategies
- Provide specific recommendations based on the numbers

Be specific, actionable, and focus on helping users close profitable deals.

IMPORTANT: When a user uploads a scanned PDF (detected when text extraction fails), explain that their PDF is a scanned image document, not a text PDF, and provide friendly instructions to screenshot and upload as images instead.`

    // Build messages based on content type
    let apiMessages = []
    let model = "gpt-3.5-turbo"
    
    if (hasImages) {
      // Use GPT-4 Vision for images
      model = "gpt-4o"
      
      const contentArray = [
        {
          type: "text",
          text: lastUserMessage.content || "Please analyze the attached images and relate them to the real estate deal."
        }
      ]
      
      // Add images to content
      if (files) {
        files.forEach(file => {
          if (file.type.startsWith('image/')) {
            contentArray.push({
              type: "image_url",
              image_url: {
                url: file.content,
                detail: "high"
              }
            })
          }
        })
      }
      
      apiMessages = [
        { role: "system", content: systemMessage },
        { role: "user", content: contentArray }
      ]
      
    } else {
      // Handle text-based files including PDFs
      let userContent = lastUserMessage.content || "Please analyze the attached files."
      
      if (files && files.length > 0) {
        for (const file of files) {
          if (file.type === 'application/pdf') {
            try {
              const base64Data = file.content.split(',')[1]
              const pdfBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))
              
              console.log(`Processing PDF: ${file.name}`)
              
              // Extract text using unpdf - much simpler!
              const { totalPages, text } = await extractText(pdfBuffer, { mergePages: true })
              
              console.log(`PDF Pages: ${totalPages}`)
              console.log(`PDF Text Length: ${text.length} characters`)
              console.log('PDF Text Preview:', text.substring(0, 500))
              
              if (text.trim().length > 200) {
                // We have enough text, it's a real text PDF
                userContent += `\n\n=== PDF Document: ${file.name} ===\n`
                userContent += `Total Pages: ${totalPages}\n`
                userContent += `\n--- Extracted Content ---\n`
                userContent += text
                userContent += `\n--- End of ${file.name} ---\n`
              } else {
                // This is a scanned PDF - tell the AI to explain it to the user
                console.log('PDF appears to be scanned or image-based')
                userContent = `The user uploaded a PDF file "${file.name}" with ${totalPages} pages, but it's a SCANNED PDF (image-based, not text-based). Only ${text.trim().length} characters could be extracted, which means it's essentially photos of documents rather than actual text.

Please explain to the user that:
1. Their PDF is a scanned document (like a photo of paper)
2. That's why you can't read it directly
3. The simple solution is to take screenshots of the PDF pages and upload those as images
4. You'll be able to analyze everything perfectly once they upload screenshots

Be friendly and helpful about this!`
              }
              
            } catch (error) {
              console.error('Error processing PDF:', error)
              userContent += `\n\n[Error processing PDF "${file.name}": ${error.message}]\n`
              userContent += `The PDF couldn't be processed. Suggest to the user to try uploading screenshots of the PDF pages instead.\n`
            }
            
          } else if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
            try {
              const base64Data = file.content.split(',')[1]
              const csvContent = Buffer.from(base64Data, 'base64').toString('utf-8')
              userContent += `\n\nCSV Data from ${file.name}:\n${csvContent}\n`
            } catch (error) {
              console.error('Error processing CSV:', error)
            }
            
          } else if (file.type === 'text/plain') {
            try {
              const base64Data = file.content.split(',')[1]
              const textContent = Buffer.from(base64Data, 'base64').toString('utf-8')
              userContent += `\n\nContent of ${file.name}:\n${textContent}\n`
            } catch (error) {
              console.error('Error processing text file:', error)
            }
          }
        }
      }
      
      // Log what we're sending to OpenAI
      console.log('=== CONTENT BEING SENT TO AI ===')
      console.log(userContent.substring(0, 1000))
      console.log('=== END CONTENT PREVIEW ===')
      
      // Use GPT-4 for better document analysis if we have files
      if (files && files.length > 0) {
        model = "gpt-4-turbo-preview"
      }
      
      // Build message array with context
      apiMessages = [
        { role: "system", content: systemMessage }
      ]
      
      // Add some previous context if available
      const previousMessages = messages.slice(-5, -1)
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
    console.log(`Message count: ${apiMessages.length}`)
    
    // Make the API call
    try {
      const completion = await openai.chat.completions.create({
        model: model,
        messages: apiMessages,
        max_tokens: 3000,
        temperature: 0.7
      })
      
      return {
        status: "success",
        message: {
          role: "assistant",
          content: completion.choices[0].message.content,
        }
      }
    } catch (apiError) {
      console.error("OpenAI API Error:", apiError)
      
      // Fallback to GPT-3.5 if GPT-4 fails
      if (apiError.status === 404 || apiError.message?.includes('model')) {
        console.log("Falling back to GPT-3.5-turbo...")
        
        const fallbackCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: apiMessages.map(msg => {
            if (Array.isArray(msg.content)) {
              return {
                ...msg,
                content: msg.content.find(c => c.type === 'text')?.text || "Please analyze this content."
              }
            }
            return msg
          }),
          max_tokens: 2000,
          temperature: 0.7
        })
        
        return {
          status: "success",
          message: {
            role: "assistant",
            content: fallbackCompletion.choices[0].message.content + "\n\n[Note: Using GPT-3.5. For better document analysis, ensure GPT-4 access.]",
          }
        }
      }
      
      throw apiError
    }
    
  } catch (error) {
    console.error("AI Chat API Error:", error)
    console.error("Error details:", error.response?.data || error.message)
    
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to process your request. Please try again or contact support if the issue persists."
    })
  }
})

// Helper function to format property information
function createPropertyContext(property) {
  if (!property || !property.inputs) return "No property data provided."
  
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
  
  const details = []
  
  if (inputs.propertyAddress) details.push(`Property: ${inputs.propertyAddress}`)
  if (inputs.purchasePrice) details.push(`Purchase Price: ${formatCurrency(inputs.purchasePrice)}`)
  if (inputs.grossMonthlyRent) details.push(`Monthly Rent: ${formatCurrency(inputs.grossMonthlyRent)}`)
  if (inputs.monthlyExpenses) details.push(`Monthly Expenses: ${formatCurrency(inputs.monthlyExpenses)}`)
  if (calculations.monthlyNOI) details.push(`Monthly NOI: ${formatCurrency(calculations.monthlyNOI)}`)
  if (calculations.monthlyCashFlow) details.push(`Cash Flow: ${formatCurrency(calculations.monthlyCashFlow)}/month`)
  if (calculations.dscrLoanAmount) details.push(`DSCR Loan: ${formatCurrency(calculations.dscrLoanAmount)}`)
  if (calculations.sellerCarryAmount) details.push(`Seller Financing: ${formatCurrency(calculations.sellerCarryAmount)}`)
  
  return details.length > 0 ? details.join('\n') : "No property data provided."
}