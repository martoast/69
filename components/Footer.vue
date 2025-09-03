<template>
    <footer class="bg-black text-white">
      <!-- CTA Section -->
      <div class="py-20 px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h3 class="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Close More Deals?
          </h3>
          <p class="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Join successful investors who are using our platform to analyze deals faster, generate professional documents, and make smarter investment decisions.
          </p>
          <NuxtLink
            to="/login"
            class="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black bg-yellow-gold hover:bg-yellow-300 transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Analyzing Deals
          </NuxtLink>
        </div>
      </div>
  
      <!-- Footer Section -->
      <div class="border-t border-gray-800 py-8 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            <!-- Logo and Company Info -->
            <div class="flex items-center space-x-4">
              <h2 class="text-xl font-bold text-white">
                6<span class="text-yellow-gold">9</span>
              </h2>
              <span class="text-gray-400 text-sm">
                © {{ currentYear }} HustleHouse. All rights reserved.
              </span>
            </div>
  
            <!-- Links -->
            <div class="flex items-center space-x-6 text-sm">
              <NuxtLink
                to="/terms"
                class="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </NuxtLink>
              <NuxtLink
                to="/privacy"
                class="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const currentYear = computed(() => new Date().getFullYear())
  </script>
  
  <style scoped>
  .text-yellow-gold {
    color: #d4af37;
  }
  
  .bg-yellow-gold {
    background-color: #d4af37;
  }
  
  .hover\:bg-yellow-300:hover {
    background-color: #fde047;
  }
  </style>