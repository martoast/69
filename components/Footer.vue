<!-- components/Footer.vue -->
<template>
  <footer class="bg-black text-white">
    <!-- CTA Section -->
    <div class="py-20 px-4 border-t border-gray-800">
      <div class="max-w-4xl mx-auto text-center">
        <h3 class="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Deal Flow?
        </h3>
        <p class="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Join commercial real estate professionals who are closing more deals with less effort. 
          Analyze properties in seconds, generate winning offers, and scale your business with AI-powered insights.
        </p>
        
        <!-- Feature List -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
          <div class="text-center">
            <div class="text-yellow-gold text-2xl font-bold mb-1">5 sec</div>
            <div class="text-gray-400 text-xs">Analysis Time</div>
          </div>
          <div class="text-center">
            <div class="text-yellow-gold text-2xl font-bold mb-1">100%</div>
            <div class="text-gray-400 text-xs">Accurate</div>
          </div>
          <div class="text-center">
            <div class="text-yellow-gold text-2xl font-bold mb-1">24/7</div>
            <div class="text-gray-400 text-xs">AI Support</div>
          </div>
          <div class="text-center">
            <div class="text-yellow-gold text-2xl font-bold mb-1">∞</div>
            <div class="text-gray-400 text-xs">Deal Volume</div>
          </div>
        </div>
        
        <NuxtLink
          to="/login"
          class="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black bg-yellow-gold hover:bg-yellow-300 transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Login
          <svg
            class="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </NuxtLink>
        
        <p class="text-gray-500 text-sm mt-4">
          No credit card required • Setup in 60 seconds
        </p>
      </div>
    </div>

    <!-- Footer Section -->
    <div class="border-t border-gray-800 py-8 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          
          <!-- Logo and Company Info -->
          <div class="flex items-center space-x-4">
            <h2 class="text-2xl font-bold text-white">
              6<span class="text-yellow-gold">9</span> Tool
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
            <a
              href="mailto:support@69tool.com"
              class="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Support
            </a>
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

.border-gray-800 {
  border-color: #1f2937;
}
</style>