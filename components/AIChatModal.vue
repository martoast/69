<!-- Updated AI Chat Component with File Upload -->
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
            <p class="text-sm mb-4">I can help analyze the financials, suggest improvements, or answer questions about the property. You can also upload documents or images for analysis.</p>
            
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
                <!-- Display attached files if any -->
                <div v-if="message.attachments && message.attachments.length > 0" class="mt-2 space-y-1">
                  <div v-for="(attachment, i) in message.attachments" :key="i" class="text-xs bg-black/20 rounded px-2 py-1">
                    📎 {{ attachment.name }}
                  </div>
                </div>
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
                {{ uploadingFiles ? 'Processing your files...' : 'Analyzing your deal in detail. This might take a moment...' }}
              </div>
            </div>
          </div>
          
          <!-- File Upload Preview -->
          <div v-if="selectedFiles.length > 0" class="flex justify-end">
            <div class="bg-gray-800 rounded-lg p-2 max-w-[80%] border border-gray-600">
              <div class="text-xs text-gray-400 mb-1">Files to upload:</div>
              <div class="space-y-1">
                <div 
                  v-for="(file, index) in selectedFiles" 
                  :key="index"
                  class="flex items-center justify-between bg-gray-700/50 rounded px-2 py-1"
                >
                  <span class="text-xs text-gray-300 truncate flex-1">
                    {{ file.type.startsWith('image/') ? '🖼️' : '📄' }} {{ file.name }}
                  </span>
                  <button
                    @click="removeFile(index)"
                    class="ml-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Chat Input -->
        <div class="bg-gray-800 p-4 rounded-b-lg border-t border-gray-700">
          <!-- File Upload Input (Hidden) -->
          <input
            ref="fileInput"
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx,.xls"
            @change="handleFileSelect"
            class="hidden"
          />
          
          <form @submit.prevent="sendMessage()" class="flex space-x-2">
            <!-- File Upload Button -->
            <button
              type="button"
              @click="$refs.fileInput.click()"
              class="p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="loading"
              title="Attach files"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
              </svg>
            </button>
            
            <!-- Text Input -->
            <input
              v-model="userInput"
              type="text"
              placeholder="Ask about your deal or upload documents..."
              class="flex-1 px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-gold focus:border-transparent text-sm"
              :disabled="loading"
            />
            
            <!-- Send Button -->
            <button
              type="submit"
              class="px-4 py-2 bg-yellow-gold text-black font-medium rounded-md hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="loading || (!userInput.trim() && selectedFiles.length === 0)"
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
import { ref, nextTick, watch } from 'vue'

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

// File upload state
const fileInput = ref(null)
const selectedFiles = ref([])
const uploadingFiles = ref(false)

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
  // Clear selected files when closing
  selectedFiles.value = []
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

// File handling functions
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  
  // Validate file size (max 20MB per file)
  const maxSize = 20 * 1024 * 1024 // 20MB
  const validFiles = files.filter(file => {
    if (file.size > maxSize) {
      alert(`File "${file.name}" is too large. Maximum size is 20MB.`)
      return false
    }
    return true
  })
  
  // Add valid files to selection
  selectedFiles.value = [...selectedFiles.value, ...validFiles].slice(0, 5) // Max 5 files
  
  // Clear the input
  event.target.value = ''
  
  scrollToBottom()
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

// Convert file to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

// Send message with file support
const sendMessage = async (text) => {
  const messageContent = text || userInput.value.trim()
  
  // Check if we have content or files
  if (!messageContent && selectedFiles.value.length === 0) return
  if (loading.value) return
  
  // Prepare attachments data
  const attachments = []
  const fileContents = []
  
  // Process selected files
  if (selectedFiles.value.length > 0) {
    uploadingFiles.value = true
    
    for (const file of selectedFiles.value) {
      try {
        const base64Content = await fileToBase64(file)
        
        attachments.push({
          name: file.name,
          type: file.type,
          size: file.size
        })
        
        fileContents.push({
          name: file.name,
          type: file.type,
          content: base64Content
        })
      } catch (error) {
        console.error('Error processing file:', error)
        alert(`Failed to process file: ${file.name}`)
      }
    }
  }
  
  // Add user message with attachments info
  messages.value.push({
    role: 'user',
    content: messageContent || 'Please analyze the attached files.',
    attachments: attachments.length > 0 ? attachments : undefined
  })
  
  // Clear input and files
  userInput.value = ''
  selectedFiles.value = []
  uploadingFiles.value = false
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
        messages: messages.value.map(m => ({
          role: m.role,
          content: m.content
        })),
        property: props.dealData,
        threadId: threadId.value,
        files: fileContents // Send file contents to backend
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