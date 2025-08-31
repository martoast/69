import { OpenAI } from 'openai'

export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (getMethod(event) !== 'POST') {
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
    const { messages, property } = body

    // Get the last user message
    const lastUserMessage = messages.findLast(m => m.role === 'user')
    
    if (!lastUserMessage) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No user message found'
      })
    }

    // For now, let's use a simple chat completion instead of assistants
    // This will work immediately and we can upgrade to assistants later
    const propertyContext = createPropertyContext(property)
    
    // Console log the property context for debugging in production
    console.log('=== AI CHAT PROPERTY CONTEXT ===')
    console.log('User Question:', lastUserMessage.content)
    console.log('Property Data Being Sent to AI:')
    console.log(propertyContext)
    console.log('=== END PROPERTY CONTEXT ===')
    
    const systemMessage = `You are a real estate investment advisor. Help analyze deals and answer questions about properties. Here is the current property data:

${propertyContext}

Provide helpful, actionable advice about real estate investments. Be specific about the numbers and calculations shown above.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        ...messages.filter(m => m.role === 'user').slice(-5), // Last 5 user messages for context
        { role: "user", content: lastUserMessage.content }
      ],
      max_tokens: 1000,
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
    
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Failed to get a response from the AI"
    })
  }
})

// Helper function to format property information
function createPropertyContext(property) {
  if (!property) return "No property information available."
  
  const inputs = property.inputs || {}
  const calculations = property.calculations || {}
  
  return `
    PROPERTY ANALYSIS:
    =================
    Address: ${inputs.propertyAddress || 'Unknown'}
    Purchase Price: ${inputs.purchasePrice || 'Unknown'}
    Gross Monthly Rent: ${inputs.grossMonthlyRent || 'Unknown'}
    Monthly Expenses: ${inputs.monthlyExpenses || 'Unknown'}
    
    FINANCING DETAILS:
    =================
    DSCR Interest Rate: ${inputs.dscrInterestRate || 'Unknown'}%
    DSCR LTV: ${inputs.dscrLTV || 'Unknown'}%
    Seller Finance Rate: ${inputs.sellerFinanceRate || 'Unknown'}%
    Down Payment to Seller: ${inputs.downPaymentToSeller || 'Unknown'}
    Payment Type: ${inputs.paymentType || 'Unknown'}
    Balloon Years: ${inputs.balloonYears || 'Unknown'}
    
    CALCULATED VALUES:
    =================
    Monthly NOI: ${calculations.monthlyNOI || 'Unknown'}
    DSCR Loan Amount: ${calculations.dscrLoanAmount || 'Unknown'}
    DSCR Monthly Payment: ${calculations.dscrMonthlyPayment || 'Unknown'}
    Seller Carry Amount: ${calculations.sellerCarryAmount || 'Unknown'}
    Seller Carry Payment: ${calculations.sellerCarryPayment || 'Unknown'}
    Monthly Cash Flow: ${calculations.monthlyCashFlow || 'Unknown'}
    Net Cash to Seller: ${calculations.netCashToSeller || 'Unknown'}
    
    SELLER INFORMATION:
    =================
    Seller Name: ${inputs.sellerName || 'Unknown'}
    LLC Name: ${inputs.llcName || 'Unknown'}
    Agent Email: ${inputs.agentEmail || 'Unknown'}
    Agent Phone: ${inputs.agentPhone || 'Unknown'}
  `
}