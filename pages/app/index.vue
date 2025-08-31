<template>
    <div class="min-h-screen bg-black">
        <AppHeader 
        :username="username" 
        :login-time="loginTime" 
        @logout="logout" 
        />
  
      <!-- Main Content -->
      <DealAnalyzer @deal-data-updated="handleDealDataUpdate" />
  
      <!-- AI Chat Modal -->
      <AIChatModal :deal-data="currentDealData" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import DealAnalyzer from '~/components/DealAnalyzer.vue'
  import CrexiFrame from '~/components/CrexiFrame.vue'
  import AIChatModal from '~/components/AIChatModal.vue'
  
  // Use auth middleware
  definePageMeta({
    middleware: 'auth'
  })
  
  const router = useRouter()
  
  // User state
  const username = ref('')
  const loginTime = ref('')
  const currentDealData = ref({})
  
  // Handle deal data updates from DealAnalyzer
  const handleDealDataUpdate = (dealData) => {
    currentDealData.value = dealData
  }
  
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