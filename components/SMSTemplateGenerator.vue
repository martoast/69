<!-- components/SMSTemplateGenerator.vue -->
<template>
    <!-- Modal Overlay -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @keydown.esc="closeModal"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/90 backdrop-blur-sm"
          @click="closeModal"
        ></div>
  
        <!-- Modal Content -->
        <div class="relative w-full max-w-3xl h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900 flex items-center">
              <span class="mr-2">📱</span>
              SMS Template
            </h2>
            <div class="flex items-center space-x-3">
              <!-- Edit Mode Toggle -->
              <button
                @click="toggleEditMode"
                class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                :class="isEditMode ? 'bg-yellow-500 text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
              >
                {{ isEditMode ? 'Preview Mode' : 'Edit Mode' }}
              </button>
              
              <!-- Copy to Clipboard Button -->
              <button
                @click="copyToClipboard"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                {{ copied ? 'Copied!' : 'Copy SMS' }}
              </button>
              
              <!-- Close Button -->
              <button
                @click="closeModal"
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
  
          <!-- Content Area -->
          <div class="flex-1 overflow-y-auto">
            <!-- Edit Mode -->
            <div v-if="isEditMode" class="p-6">
              <textarea
                v-model="editableContent"
                class="w-full h-full min-h-[400px] p-4 border border-gray-300 rounded-lg text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Edit your SMS template here..."
              ></textarea>
              <div class="mt-3 flex justify-between text-xs text-gray-500">
                <span>Character count: {{ editableContent.length }}</span>
                <span class="text-yellow-600" v-if="editableContent.length > 160">
                  Warning: SMS over 160 characters may be split into multiple messages
                </span>
              </div>
            </div>
  
            <!-- Preview Mode -->
            <div v-else class="p-8">
              <div class="max-w-sm mx-auto">
                <!-- Phone Mockup -->
                <div class="bg-gray-900 rounded-3xl p-2 shadow-2xl">
                  <div class="bg-white rounded-2xl overflow-hidden">
                    <!-- Phone Header -->
                    <div class="bg-gray-50 px-4 py-3 border-b">
                      <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span class="text-white text-xs font-bold">OC</span>
                        </div>
                        <div>
                          <div class="font-medium text-sm text-gray-900">Orbius Capital</div>
                          <div class="text-xs text-gray-500">Text Message</div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- SMS Content -->
                    <div class="p-4 min-h-[300px] bg-white">
                      <div class="bg-blue-500 text-white px-4 py-3 rounded-2xl rounded-br-sm max-w-[85%] text-sm leading-relaxed">
                        {{ formattedContent }}
                      </div>
                      <div class="text-xs text-gray-400 mt-2">
                        {{ getCurrentTime() }}
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Character Counter -->
                <div class="mt-4 text-center">
                  <div class="text-sm text-gray-600">
                    {{ formattedContent.length }} characters
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  
  // Props
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    },
    dealData: {
      type: Object,
      required: true
    }
  })
  
  // Emits
  const emit = defineEmits(['close'])
  
  // Component state
  const isEditMode = ref(false)
  const editableContent = ref('')
  const copied = ref(false)
  
  // Toggle edit mode
  const toggleEditMode = () => {
    if (!isEditMode.value) {
      // Switching to edit mode - use current formatted content
      editableContent.value = formattedContent.value
    }
    isEditMode.value = !isEditMode.value
  }
  
  // Close modal
  const closeModal = () => {
    emit('close')
  }
  
  // Get current time for SMS display
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }
  
  // Generate SMS template content
  const generateSMSTemplate = () => {
    const { inputs } = props.dealData
    
    return `Hi, this is ${inputs.buyerName || 'Mikhail Kravtsov'} with Orbius Capital Group. We're actively acquiring commercial real estate nationwide and are only seeking opportunities with owner financing. Do you have any properties available that might fit this criteria?`
  }
  
  // Format content with deal data
  const formattedContent = computed(() => {
    if (isEditMode.value) return ''
    
    const content = editableContent.value || generateSMSTemplate()
    const { inputs } = props.dealData
    
    // Replace placeholders with actual data
    return content
      .replace(/\[Your Name\]/g, inputs.buyerName || 'Mikhail Kravtsov')
      .replace(/\{Your Name\}/g, inputs.buyerName || 'Mikhail Kravtsov')
      .replace(/\{phone\}/g, inputs.agentPhone || '[Your Phone]')
      .replace(/\{email\}/g, inputs.agentEmail || '[Your Email]')
  })
  
  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      const textToCopy = isEditMode.value ? editableContent.value : formattedContent.value
      await navigator.clipboard.writeText(textToCopy)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = isEditMode.value ? editableContent.value : formattedContent.value
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    }
  }
  
  // Initialize content when modal opens
  watch(() => props.isOpen, (newValue) => {
    if (newValue) {
      editableContent.value = generateSMSTemplate()
      isEditMode.value = false
      copied.value = false
    }
  })
  </script>