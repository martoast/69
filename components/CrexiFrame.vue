<template>
  <!-- Trigger Button -->
  <button
    @click="openCrexi"
    class="inline-flex items-center justify-center px-6 py-3 bg-yellow-gold hover:bg-yellow-300 text-black font-semibold rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl"
  >
    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
    </svg>
    Open Crexi
  </button>

  <!-- Alternative: Embedded Browser Component -->
  <Teleport to="body">
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center"
      @keydown.esc="closeModal"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/90 backdrop-blur-sm"
        @click="closeModal"
      ></div>

      <!-- Modal Content -->
      <div class="relative w-full h-full max-w-none max-h-none m-0 bg-white">
        <!-- Header with Close Button -->
        <div class="absolute top-0 left-0 right-0 z-10 bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            <span class="text-white text-sm font-medium ml-4">Crexi Access</span>
          </div>
          
          <div class="flex items-center space-x-2">
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="p-2 text-gray-400 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200"
              title="Close"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="pt-16 h-full flex items-center justify-center bg-gray-50">
          <div class="text-center max-w-md mx-auto p-8">
            <div class="w-20 h-20 bg-yellow-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </div>
            
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Crexi Opened in New Window</h3>
            <p class="text-gray-600 mb-6">
              Crexi has been opened in a new browser window for the best experience. 
              You can now browse properties and analyze deals directly on their platform.
            </p>
            
            <div class="space-y-3">
              <button
                @click="openCrexi"
                class="w-full px-6 py-3 bg-yellow-gold hover:bg-yellow-300 text-black font-semibold rounded-lg transition-all duration-200"
              >
                Open Crexi Again
              </button>
              
              <button
                @click="closeModal"
                class="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-all duration-200"
              >
                Close This Window
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Component state
const isModalOpen = ref(false)
const creXiWindow = ref(null)

// Open Crexi function
const openCrexi = () => {
  // Close any existing Crexi window
  if (creXiWindow.value && !creXiWindow.value.closed) {
    creXiWindow.value.close()
  }
  
  // Open new window with Crexi
  creXiWindow.value = window.open(
    'https://www.crexi.com/',
    'crexi-window',
    'width=1200,height=800,scrollbars=yes,resizable=yes,status=yes,toolbar=yes,menubar=yes,location=yes'
  )
  
  // Show modal confirmation
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
  
  // Focus the new window
  if (creXiWindow.value) {
    creXiWindow.value.focus()
  }
  
  // Auto-close modal after 3 seconds
  setTimeout(() => {
    if (isModalOpen.value) {
      closeModal()
    }
  }, 3000)
}

// Close modal function
const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

// Handle escape key
const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  document.body.style.overflow = ''
  
  // Close Crexi window if component is destroyed
  if (creXiWindow.value && !creXiWindow.value.closed) {
    creXiWindow.value.close()
  }
})
</script>

<style scoped>
/* Custom yellow-gold color */
.bg-yellow-gold {
  background-color: #d4af37;
}

.hover\:bg-yellow-300:hover {
  background-color: #fde047;
}

.border-t-yellow-gold {
  border-top-color: #d4af37;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Ensure iframe takes full available space */
iframe {
  transition: opacity 0.3s ease;
}

/* Hide scrollbars when modal is open */
.modal-open {
  overflow: hidden;
}
</style>