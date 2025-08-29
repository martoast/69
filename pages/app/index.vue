<template>
    <div class="min-h-screen bg-black">
      <!-- App Header -->
      <div class="bg-gray-900/50 backdrop-blur-sm border-b border-yellow-gold/20 p-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <!-- Logo/Brand -->
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-white">
              6<span class="text-yellow-gold">9</span>
            </h1>
            <span class="text-gray-400 text-sm">Deal Analyzer & LOI Generator</span>
          </div>
          
          <!-- User Info & Actions -->
          <div class="flex items-center space-x-4">
            <!-- User Welcome -->
            <div class="text-right">
              <p class="text-white text-sm">Welcome back, <span class="text-yellow-gold font-semibold">{{ username }}</span></p>
              <p class="text-gray-400 text-xs">{{ loginTime }}</p>
            </div>
            
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
  
      <!-- Main Content -->
      <DealAnalyzer />
    </div>
  </template>
  
  <script setup>
  
  // Use auth middleware
  definePageMeta({
    middleware: 'auth'
  })
  
  const router = useRouter()
  
  // User state
  const username = ref('')
  const loginTime = ref('')
  
  // Get user info from localStorage
  onMounted(() => {
    if (process.client) {
      const authData = localStorage.getItem('userAuth')
      if (authData) {
        try {
          const parsedAuth = JSON.parse(authData)
          username.value = parsedAuth.username || 'User'
          
          // Format login time
          const loginDate = new Date(parsedAuth.loginTime)
          loginTime.value = `Logged in at ${loginDate.toLocaleTimeString()} on ${loginDate.toLocaleDateString()}`
        } catch (error) {
          console.error('Error parsing auth data:', error)
        }
      }
    }
  })
  
  // Logout function
  const logout = () => {
    if (process.client) {
      // Clear localStorage
      localStorage.removeItem('userAuth')
      
      // Redirect to home page
      router.push('/')
    }
  }
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
  </style>