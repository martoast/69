<!-- components/EmailTemplateGenerator.vue -->
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
        <div class="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900 flex items-center">
              <span class="mr-2">📧</span>
              Email Template
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
                {{ copied ? 'Copied!' : 'Copy Email' }}
              </button>

              <!-- Open in Email Client Button -->
              <button
                @click="openInEmailClient"
                class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Open in Email App
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
              <div class="space-y-4">
                <!-- Subject Line -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
                  <input
                    v-model="editableSubject"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email subject"
                  />
                </div>
                
                <!-- Email Body -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email Body</label>
                  <textarea
                    v-model="editableContent"
                    class="w-full h-96 p-4 border border-gray-300 rounded-lg text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Edit your email template here..."
                  ></textarea>
                </div>
              </div>
            </div>
  
            <!-- Preview Mode -->
            <div v-else class="p-8">
              <!-- Email Mockup -->
              <div class="max-w-4xl mx-auto bg-white border rounded-lg shadow-sm">
                <!-- Email Header -->
                <!-- <div class="border-b bg-gray-50 p-4">
                  <div class="grid grid-cols-12 gap-4 text-sm">
                    <div class="col-span-2 font-medium text-gray-700">Subject:</div>
                    <div class="col-span-10 font-medium text-gray-900">{{ formattedSubject }}</div>
                  </div>
                  <div class="grid grid-cols-12 gap-4 text-sm mt-2">
                    <div class="col-span-2 font-medium text-gray-700">From:</div>
                    <div class="col-span-10 text-gray-900">
                      {{ dealData.inputs.buyerName || 'Your Name' }} &lt;{{ dealData.inputs.agentEmail || 'your.email@example.com' }}&gt;
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4 text-sm mt-2">
                    <div class="col-span-2 font-medium text-gray-700">To:</div>
                    <div class="col-span-10 text-gray-900">{{ dealData.inputs.sellerName || '[Owner/Agent Name]' }} &lt;recipient@example.com&gt;</div>
                  </div>
                </div> -->
                
                <!-- Email Body -->
                <div class="p-6">
                  <div class="whitespace-pre-wrap text-gray-900 leading-relaxed" v-html="formattedContentHtml"></div>
                </div>
                
                <!-- Email Signature -->
                <div class="border-t bg-gray-50 p-4">
                  <div class="text-sm text-gray-600">
                    <div class="font-medium">{{ dealData.inputs.buyerName || 'Your Name' }}</div>
                    <div>Orbius Capital Group LLC</div>
                    <div class="mt-1">
                      <span v-if="dealData.inputs.buyerPhone">Phone: {{ dealData.inputs.buyerPhone }}</span>
                      <span v-if="dealData.inputs.buyerPhone && dealData.inputs.buyerEmail"> | </span>
                      <span v-if="dealData.inputs.buyerEmail">Email: {{ dealData.inputs.buyerEmail }}</span>
                    </div>
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
  const editableSubject = ref('')
  const copied = ref(false)
  
  // Toggle edit mode
  const toggleEditMode = () => {
    if (!isEditMode.value) {
      // Switching to edit mode - use current formatted content
      editableContent.value = generateEmailTemplate()
      editableSubject.value = generateEmailSubject()
    }
    isEditMode.value = !isEditMode.value
  }
  
  // Close modal
  const closeModal = () => {
    emit('close')
  }
  
  // Generate email subject
  const generateEmailSubject = () => {
    return 'Seeking Owner-Financed Commercial Properties'
  }
  
  // Generate email template content
  const generateEmailTemplate = () => {
    const { inputs } = props.dealData
    
    return `Hello ${inputs.sellerName || '[Owner/Agent Name]'},

My name is ${inputs.buyerName || '[Your Name]'} with Orbius Capital Group LLC. We are actively acquiring commercial real estate on behalf of a private equity group and are currently seeking properties that can be purchased with owner financing.

If you have any listings or off-market opportunities that meet this criteria, I'd be glad to review them and present an offer. We typically structure straightforward transactions where:

• Buyer covers 100% of closing costs
• Property is purchased as-is (no repairs or credits requested)
• Flexible balloon terms with interest-only payments

Please feel free to reply with details on any available properties, or let me know if you'd like to discuss further.

Looking forward to connecting,

${inputs.buyerName || '[Your Name]'}`
  }
  
  // Format subject with deal data
  const formattedSubject = computed(() => {
    const subject = isEditMode.value ? editableSubject.value : generateEmailSubject()
    const { inputs } = props.dealData
    
    return subject
      .replace(/\[Your Name\]/g, inputs.buyerName || '[Your Name]')
      .replace(/\{Your Name\}/g, inputs.buyerName || '[Your Name]')
  })
  
  // Format content with deal data
  const formattedContent = computed(() => {
    if (isEditMode.value) return editableContent.value
    
    const content = generateEmailTemplate()
    const { inputs } = props.dealData
    
    // Replace placeholders with actual data
    return content
      .replace(/\[Owner\/Agent Name\]/g, inputs.sellerName || '[Owner/Agent Name]')
      .replace(/\[Your Name\]/g, inputs.buyerName || '[Your Name]')
      .replace(/\{Your Name\}/g, inputs.buyerName || '[Your Name]')
      .replace(/\{phone\}/g, inputs.buyerPhone || '[Your Phone]')
      .replace(/\{email\}/g, inputs.agentEmail || '[Your Email]')
  })
  
  // Format content as HTML for display
  const formattedContentHtml = computed(() => {
    return formattedContent.value
      .replace(/\n/g, '<br>')
      .replace(/•/g, '&bull;')
  })
  
  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      const fullEmail = `Subject: ${formattedSubject.value}\n\n${formattedContent.value}`
      await navigator.clipboard.writeText(fullEmail)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = `Subject: ${formattedSubject.value}\n\n${formattedContent.value}`
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
  
  // Open in email client
  const openInEmailClient = () => {
    const subject = encodeURIComponent(formattedSubject.value)
    const body = encodeURIComponent(formattedContent.value)
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`
    
    // Open the mailto link
    window.location.href = mailtoLink
  }
  
  // Initialize content when modal opens
  watch(() => props.isOpen, (newValue) => {
    if (newValue) {
      editableContent.value = generateEmailTemplate()
      editableSubject.value = generateEmailSubject()
      isEditMode.value = false
      copied.value = false
    }
  })
  </script>