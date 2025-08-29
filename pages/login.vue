<template>
    <section class="min-h-screen w-full bg-black text-white relative overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="floating-element floating-element-1"></div>
        <div class="floating-element floating-element-2"></div>
        <div class="floating-element floating-element-3"></div>
        <div class="floating-element floating-element-4"></div>
        <div class="floating-element floating-element-5"></div>
      </div>
  
      <!-- Gradient Background -->
      <div class="absolute inset-0 bg-gradient-radial from-yellow-gold/10 via-gray-900/50 to-black animate-gradient-slow"></div>
      
      <!-- Main Content Container -->
      <div class="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        
        <!-- Login Form -->
        <div class="w-full max-w-md mx-auto">
          <div class="bg-gray-900/50 backdrop-blur-sm border border-yellow-gold/20 rounded-2xl p-8 shadow-2xl">
            <!-- Header -->
            <div class="text-center mb-8">
              <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p class="text-gray-400">
                Sign in to start analyzing deals
              </p>
            </div>
  
            <!-- Error Message -->
            <div v-if="errorMessage" class="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p class="text-red-400 text-sm">{{ errorMessage }}</p>
            </div>
  
            <!-- Login Form -->
            <form @submit.prevent="handleLogin" class="space-y-6">
              <!-- Username Field -->
              <div>
                <label for="username" class="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  v-model="username"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username"
                />
              </div>
  
              <!-- Password Field -->
              <div>
                <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    class="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-yellow-gold transition-colors duration-200"
                  >
                    <svg v-if="showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                    </svg>
                    <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                </div>
              </div>
  
              <!-- Login Button -->
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full px-6 py-3 bg-yellow-gold hover:bg-yellow-300 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl disabled:hover:transform-none disabled:hover:shadow-none"
              >
                <span v-if="isLoading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </span>
                <span v-else>Sign In</span>
              </button>
            </form>
  
            <!-- Back to Home Link -->
            <div class="text-center mt-6">
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-yellow-gold transition-colors duration-200 text-sm"
              >
                ← Back to Home
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  // Form state
  const username = ref('')
  const password = ref('')
  const showPassword = ref(false)
  const isLoading = ref(false)
  const errorMessage = ref('')
  
  // Hard-coded credentials
  const validUsers = {
    'Alex': 'Alexandroisking69'
  }
  
  const handleLogin = async () => {
    isLoading.value = true
    errorMessage.value = ''
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check credentials
    if (validUsers[username.value] && validUsers[username.value] === password.value) {
      // Successful login
      router.push('/app/')
    } else {
      // Failed login
      errorMessage.value = 'Invalid username or password'
    }
    
    isLoading.value = false
  }
  </script>
  
  <style scoped>
  /* Use the same animations from your existing homepage */
  
  /* Gradient animation */
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  /* Float animation */
  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(120deg); }
    66% { transform: translate(-20px, 20px) rotate(240deg); }
  }
  
  /* Floating elements with fixed positions */
  .floating-element {
    position: absolute;
    border-radius: 50%;
    opacity: 0.1;
    background: linear-gradient(135deg, #d4af3780, transparent);
    animation: float 20s ease-in-out infinite;
  }
  
  .floating-element-1 {
    width: 80px;
    height: 80px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }
  
  .floating-element-2 {
    width: 120px;
    height: 120px;
    top: 70%;
    right: 15%;
    animation-delay: 4s;
    background: linear-gradient(135deg, #f9d77680, transparent);
  }
  
  .floating-element-3 {
    width: 60px;
    height: 60px;
    top: 50%;
    left: 5%;
    animation-delay: 8s;
  }
  
  .floating-element-4 {
    width: 100px;
    height: 100px;
    bottom: 20%;
    left: 50%;
    animation-delay: 12s;
    background: linear-gradient(135deg, #f9d77680, transparent);
  }
  
  .floating-element-5 {
    width: 40px;
    height: 40px;
    top: 20%;
    right: 10%;
    animation-delay: 16s;
  }
  
  /* Gradient background */
  .animate-gradient-slow {
    background-size: 200% 200%;
    animation: gradient-shift 15s ease infinite;
  }
  
  .bg-gradient-radial {
    background-image: radial-gradient(var(--tw-gradient-stops));
  }
  
  /* Custom yellow-gold color */
  .text-yellow-gold {
    color: #d4af37;
  }
  
  .bg-yellow-gold {
    background-color: #d4af37;
  }
  
  .border-yellow-gold {
    border-color: #d4af37;
  }
  
  .hover\:bg-yellow-300:hover {
    background-color: #fde047;
  }
  
  .hover\:text-yellow-gold:hover {
    color: #d4af37;
  }
  
  .hover\:border-yellow-gold:hover {
    border-color: #d4af37;
  }
  
  .from-yellow-gold\/10 {
    --tw-gradient-from: rgb(212 175 55 / 0.1);
    --tw-gradient-to: rgb(212 175 55 / 0);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  }
  
  .focus\:ring-yellow-gold:focus {
    --tw-ring-color: #d4af37;
  }
  
  /* Mobile adjustments */
  @media (max-width: 768px) {
    .floating-element {
      opacity: 0.05;
    }
    
    .floating-element-2,
    .floating-element-4 {
      display: none;
    }
  }
  </style>