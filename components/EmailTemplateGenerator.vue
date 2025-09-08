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
              <div class="border-b bg-gray-50 p-4">
                <div class="grid grid-cols-12 gap-4 text-sm">
                  <div class="col-span-2 font-medium text-gray-700">Subject:</div>
                  <div class="col-span-10 font-medium text-gray-900">{{ formattedSubject }}</div>
                </div>
                <div class="grid grid-cols-12 gap-4 text-sm mt-2">
                  <div class="col-span-2 font-medium text-gray-700">From:</div>
                  <div class="col-span-10 text-gray-900">
                    {{ dealData.inputs.buyerName || 'Your Name' }} &lt;{{ dealData.inputs.buyerEmail || 'your.email@example.com' }}&gt;
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 text-sm mt-2">
                  <div class="col-span-2 font-medium text-gray-700">To:</div>
                  <div class="col-span-10 text-gray-900">{{ dealData.inputs.sellerName || '[Owner/Agent Name]' }} &lt;{{ dealData.inputs.agentEmail || 'recipient@example.com' }}&gt;</div>
                </div>
              </div>
              
              <!-- Email Body -->
              <div class="p-6">
                <div class="whitespace-pre-wrap text-gray-900 leading-relaxed" v-html="formattedContentHtml"></div>
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

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Generate email subject
const generateEmailSubject = () => {
  const { inputs } = props.dealData
  return `Letter of Intent – ${inputs.propertyAddress || '[Property Address]'}`
}

// Generate email template content
const generateEmailTemplate = () => {
  const { inputs, calculations } = props.dealData
  
  // Determine balloon terms based on years
  const balloonTerms = inputs.balloonYears 
    ? `${inputs.balloonYears} year balloon with flexible extension options`
    : 'Flexible balloon terms with extension options'
    
  return `Greetings,

My name is ${inputs.buyerName || '[Your Name]'} with Orbius Capital Group. Please see the attached Letter of Intent. We are actively acquiring commercial real estate on behalf of a private equity group and would like to present an offer on your listing at ${inputs.propertyAddress || '[Property Address]'}.

⸻
Estimated Offer Structure
    • Purchase Price: ${formatCurrency(inputs.purchasePrice)}
    • Down Payment to Seller: ${formatCurrency(calculations.downPayment)}
    • Seller Finance: ${formatCurrency(calculations.sellerCarryAmount)}
    • Interest Rate: ${inputs.sellerFinanceRate || '[Interest Rate]'}% (Interest-Only)
    • Monthly Payments to Seller: ${formatCurrency(calculations.sellerCarryPayment)}
    • Net Cash to Seller: ${formatCurrency(calculations.netCashToSeller)}

⸻
Additional Information
    • ${balloonTerms}
    • Buyer covers 100% of all closing costs
    • Property purchased as-is (no repairs or credits requested)
    • 15 day due diligence and 30-45 day closing window

⸻
Next Steps
If you are in agreement with these terms, please sign the LOI or provide counter terms along with financials. Once we reach an agreement, our team will immediately pass everything to our transaction coordinator and attorney to begin drafting the purchase agreement and open escrow.

⸻
${inputs.buyerName || '[Your Name]'}
Orbius Capital Group
Phone: ${inputs.buyerPhone || '[Your Phone]'}
Email: ${inputs.buyerEmail || '[Your Email]'}`
}

// Format subject with deal data
const formattedSubject = computed(() => {
  return isEditMode.value ? editableSubject.value : generateEmailSubject()
})

// Format content with deal data
const formattedContent = computed(() => {
  return isEditMode.value ? editableContent.value : generateEmailTemplate()
})

// Format content as HTML for display
const formattedContentHtml = computed(() => {
  return formattedContent.value
    .replace(/\n/g, '<br>')
    .replace(/•/g, '&bull;')
    .replace(/⸻/g, '<hr class="my-3 border-gray-300">')
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
  const to = props.dealData.inputs.agentEmail ? encodeURIComponent(props.dealData.inputs.agentEmail) : ''
  
  const mailtoLink = to 
    ? `mailto:${to}?subject=${subject}&body=${body}`
    : `mailto:?subject=${subject}&body=${body}`
  
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