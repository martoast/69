<!-- components/Hero.vue -->
<template>
  <section
    class="min-h-screen w-full bg-black text-white relative overflow-hidden"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="floating-element floating-element-1"></div>
      <div class="floating-element floating-element-2"></div>
      <div class="floating-element floating-element-3"></div>
      <div class="floating-element floating-element-4"></div>
      <div class="floating-element floating-element-5"></div>
    </div>

    <!-- Gradient Background -->
    <div
      class="absolute inset-0 bg-gradient-radial from-yellow-gold/10 via-gray-900/50 to-black animate-gradient-slow"
    ></div>

    <!-- Main Content Container -->
    <div
      class="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <!-- Hero Title -->
      <div class="text-center mb-8 max-w-5xl mx-auto">
        <div class="inline-flex items-center justify-center mb-8">
          <span class="text-xs sm:text-sm md:text-base px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-gold/10 border border-yellow-gold/30 rounded-full text-yellow-gold font-medium">
            Your All-in-One Commercial Deal Platform
          </span>
        </div>
        <h1
          class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 px-2"
        >
         Close smarter, faster,
          <span class="text-yellow-gold block mt-2">and at scale</span>
        </h1>
        <p
          class="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto px-2"
        >
        Our AI system makes your offers attractive to sellers and buyers, letting buyers profit at closing while still cash-flowing.
        </p>
      </div>

      <!-- Value Props -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
        <div class="flex items-center justify-center space-x-2 text-gray-300">
          <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd"/>
          </svg>
          <span class="text-sm md:text-base">Instant Analysis</span>
        </div>
        <div class="flex items-center justify-center space-x-2 text-gray-300">
          <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span class="text-sm md:text-base">Data-Driven Offers</span>
        </div>
        <div class="flex items-center justify-center space-x-2 text-gray-300">
          <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
          </svg>
          <span class="text-sm md:text-base">Maximize Profits</span>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 mb-16">
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
        <NuxtLink
          to="#features"
          class="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-transparent border-2 border-white/30 hover:border-yellow-gold hover:text-yellow-gold transition-all duration-200 rounded-lg group"
        >
          See How It Works
          <svg
            class="ml-2 w-5 h-5 transition-transform duration-200 group-hover:translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </NuxtLink>
      </div>

      
    </div>
  </section>
</template>

<script setup>
// Component logic can be added here if needed
</script>

<style scoped>
/* Gradient animation */
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Float animation */
@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
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

.bg-yellow-gold\/10 {
  background-color: rgb(212 175 55 / 0.1);
}

.border-yellow-gold\/30 {
  border-color: rgb(212 175 55 / 0.3);
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