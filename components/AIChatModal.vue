<template>
    <!-- Floating Chat Button -->
    <div v-if="!isOpen" class="fixed bottom-4 right-4 z-40">
      <button
        @click="openChat"
        class="bg-yellow-gold hover:bg-yellow-300 text-black p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
      >
        <img src="/ai-logo.PNG" class="h-10 w-10"/>
      </button>
    </div>
  
    <!-- Chat Modal -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-end justify-end p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="closeChat"
        ></div>
  
        <!-- Chat Container -->
        <div class="relative bg-gray-900 rounded-lg shadow-2xl w-full max-w-md h-[600px] flex flex-col border border-gray-700">
          <!-- Chat Header -->
          <div class="bg-gray-800 p-4 rounded-t-lg border-b border-gray-700 flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <img src="/ai-logo.PNG" class="h-6 w-6"/>
              <h3 class="text-lg font-medium text-white">69 AI Assistant</h3>
            </div>
            <button 
              @click="closeChat" 
              class="text-gray-400 hover:text-white transition-colors p-1"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
          
          <!-- Chat Messages -->
          <div 
            ref="chatContainer" 
            class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900"
          >
            <!-- Welcome Message -->
            <div v-if="messages.length === 0" class="text-center text-gray-400 py-8">
              <img src="/ai-logo.PNG" class="h-12 w-12 mx-auto"/>
              <p class="font-medium mb-2">Ask me about your deal</p>
              <p class="text-sm mb-4">I can help analyze the financials, suggest improvements, or answer questions about the property.</p>
              
              <!-- Quick Suggestions -->
              <div class="grid grid-cols-1 gap-2 text-left">
                <button 
                  v-for="(suggestion, i) in chatSuggestions" 
                  :key="i"
                  @click="sendMessage(suggestion)"
                  class="bg-gray-800 hover:bg-gray-700 py-2 px-3 rounded-md text-sm text-left transition-colors text-yellow-gold"
                >
                  {{ suggestion }}
                </button>
              </div>
            </div>
            
            <!-- Messages -->
            <template v-for="(message, index) in messages" :key="index">
              <!-- User Message -->
              <div v-if="message.role === 'user'" class="flex justify-end">
                <div class="bg-yellow-gold text-black rounded-lg py-2 px-4 max-w-[80%] font-medium">
                  <p class="whitespace-pre-wrap text-sm">{{ message.content }}</p>
                </div>
              </div>
              
              <!-- AI Message -->
              <div v-else class="flex justify-start">
                <div class="bg-gray-800 text-gray-100 rounded-lg py-2 px-4 max-w-[80%] border border-gray-700">
                  <p class="whitespace-pre-wrap text-sm" v-html="formatMessage(message.content)"></p>
                </div>
              </div>
            </template>
            
            <!-- Loading Indicator -->
            <div v-if="loading" class="flex justify-start">
              <div class="bg-gray-800 text-gray-100 rounded-lg py-2 px-4 border border-gray-700">
                <div v-if="!isLongWait" class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-yellow-gold rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                  <div class="w-2 h-2 bg-yellow-gold rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                  <div class="w-2 h-2 bg-yellow-gold rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                </div>
                <div v-else class="text-sm text-yellow-gold">
                  Analyzing your deal in detail. This might take a moment...
                </div>
              </div>
            </div>
          </div>
          
          <!-- Chat Input -->
          <div class="bg-gray-800 p-4 rounded-b-lg border-t border-gray-700">
            <form @submit.prevent="sendMessage()" class="flex space-x-2">
              <input
                v-model="userInput"
                type="text"
                placeholder="Ask about your deal..."
                class="flex-1 px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-gold focus:border-transparent text-sm"
                :disabled="loading"
              />
              <button
                type="submit"
                class="px-4 py-2 bg-yellow-gold text-black font-medium rounded-md hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="loading || !userInput.trim()"
              >
                <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Teleport>
  </template>
  
  <script setup>
  import { ref, nextTick, watch, computed } from 'vue'
  
  const props = defineProps({
    dealData: {
      type: Object,
      default: () => ({})
    }
  })
  
  // Chat state
  const isOpen = ref(false)
  const userInput = ref('')
  const messages = ref([])
  const loading = ref(false)
  const isLongWait = ref(false)
  const longWaitTimer = ref(null)
  const chatContainer = ref(null)
  const threadId = ref(null)
  
  // Chat suggestions
  const chatSuggestions = [
    "Is this deal profitable?",
    "What are the risks with this property?",
    "How can I improve the cash flow?",
    "What's the return on investment?",
    "Should I negotiate the price?"
  ]
  
  // Open/close chat
  const openChat = () => {
    isOpen.value = true
    nextTick(() => scrollToBottom())
  }
  
  const closeChat = () => {
    isOpen.value = false
  }
  
  // Format message content
  const formatMessage = (content) => {
    if (!content) return ''
    
    let formatted = content.replace(/\n/g, '<br>')
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    return formatted
  }
  
  // Scroll to bottom
  const scrollToBottom = async () => {
    await nextTick()
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  }
  
  // Send message
  const sendMessage = async (text) => {
    const messageContent = text || userInput.value.trim()
    if (!messageContent || loading.value) return
    
    // Add user message
    messages.value.push({
      role: 'user',
      content: messageContent
    })
    
    userInput.value = ''
    scrollToBottom()
    
    // Show loading
    loading.value = true
    isLongWait.value = false
    
    // Set long wait timer
    if (longWaitTimer.value) {
      clearTimeout(longWaitTimer.value)
    }
    longWaitTimer.value = setTimeout(() => {
      isLongWait.value = true
    }, 15000)
    
    try {
      const response = await $fetch('/api/ai-chat', {
        method: 'POST',
        body: {
          messages: messages.value,
          property: props.dealData,
          threadId: threadId.value
        }
      })
      
      if (response.status === 'success' && response.message) {
        if (response.threadId) {
          threadId.value = response.threadId
        }
        
        messages.value.push({
          role: 'assistant',
          content: response.message.content
        })
      } else {
        messages.value.push({
          role: 'assistant',
          content: "I'm sorry, I encountered an error. Please try again."
        })
      }
    } catch (error) {
      console.error('AI Chat Error:', error)
      messages.value.push({
        role: 'assistant',
        content: "I'm sorry, there was a problem connecting to the AI service. Please try again later."
      })
    } finally {
      loading.value = false
      clearTimeout(longWaitTimer.value)
      isLongWait.value = false
      scrollToBottom()
    }
  }
  
  // Watch messages for auto-scroll
  watch(messages, () => {
    scrollToBottom()
  })
  </script>
  
  <style scoped>
  .bg-yellow-gold {
    background-color: #d4af37;
  }
  
  .text-yellow-gold {
    color: #d4af37;
  }
  
  .border-yellow-gold {
    border-color: #d4af37;
  }
  
  .hover\:bg-yellow-300:hover {
    background-color: #fde047;
  }
  
  .focus\:ring-yellow-gold:focus {
    --tw-ring-color: #d4af37;
  }
  </style>