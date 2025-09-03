<template>
    <div class="bg-gray-900/50 backdrop-blur-sm border-b border-yellow-gold/20 sticky top-0 z-30">
      <div class="px-4 py-3">
        <!-- Mobile Layout (default) -->
        <div class="flex items-center justify-between lg:hidden">
          <!-- Logo -->
          <div class="flex items-center">
            <img src="/logo.jpeg" class="h-12 w-12"/>
          </div>
          
          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg v-if="!showMobileMenu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
  
        <!-- Mobile Menu Dropdown -->
        <div v-if="showMobileMenu" class="lg:hidden mt-4 pb-2 border-t border-gray-700">
          <div class="pt-4 space-y-3">
            <!-- User Info -->
            <div class="px-2">
              <p class="text-white text-sm font-medium">{{ username }}</p>
              <p class="text-gray-400 text-xs">{{ formatLoginTime(loginTime) }}</p>
            </div>
            
            <!-- Mobile Actions -->
            <div class="flex flex-col space-y-2">
              <CrexiFrame />
              <button
                @click="logout"
                class="flex items-center px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
  
        <!-- Desktop Layout (lg and up) -->
        <div class="hidden lg:flex items-center justify-between max-w-7xl mx-auto">
          <!-- Logo/Brand -->
          <div class="flex items-center space-x-4">
            <img src="/logo.jpeg" class="h-12 w-12"/>
          </div>
          
          <!-- Desktop User Info & Actions -->
          <div class="flex items-center space-x-4">
            <!-- User Welcome -->
            <div class="text-right">
              <p class="text-white text-sm">Welcome back, <span class="text-yellow-gold font-semibold">{{ username }}</span></p>
              <p class="text-gray-400 text-xs">{{ loginTime }}</p>
            </div>
            
            <!-- Crexi Button -->
            <CrexiFrame />
            
            <!-- Logout Button -->
            <button
              @click="logout"
              class="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import CrexiFrame from './CrexiFrame.vue'
  
  const props = defineProps({
    username: {
      type: String,
      default: 'User'
    },
    loginTime: {
      type: String,
      default: ''
    }
  })
  
  const emit = defineEmits(['logout'])
  
  // Mobile menu state
  const showMobileMenu = ref(false)
  
  const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value
  }
  
  const logout = () => {
    showMobileMenu.value = false
    emit('logout')
  }
  
  // Format login time for mobile (shorter)
  const formatLoginTime = (time) => {
    if (!time) return ''
    // Extract just the date part for mobile
    const match = time.match(/on (.+)$/)
    return match ? match[1] : time
  }
  
  // Close mobile menu when clicking outside (optional enhancement)
  const closeMenuOnOutsideClick = (event) => {
    if (!event.target.closest('.mobile-menu-container')) {
      showMobileMenu.value = false
    }
  }
  
  // You can add this listener if you want outside-click-to-close behavior
  // onMounted(() => {
  //   document.addEventListener('click', closeMenuOnOutsideClick)
  // })
  // 
  // onUnmounted(() => {
  //   document.removeEventListener('click', closeMenuOnOutsideClick)
  // })
  </script>
  
  <style scoped>
  /* Custom yellow-gold color */
  .text-yellow-gold {
    color: #d4af37;
  }
  
  .border-yellow-gold {
    border-color: #d4af37;
  }
  
  .hover\:bg-red-500\/10:hover {
    background-color: rgb(239 68 68 / 0.1);
  }
  
  /* Smooth transitions for mobile menu */
  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition: all 0.3s ease;
  }
  
  .mobile-menu-enter-from,
  .mobile-menu-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>