<template>
    <section class="min-h-screen w-full bg-black text-white relative overflow-hidden">
      <!-- Animated Background Elements (matching your existing style) -->
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
        
        <!-- Hero Title -->
        <div class="text-center mb-8 max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Generate Letters of Intent <span class="text-yellow-gold">With Ease</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            The tools you need to analyze properties and generate professional letters of intent. 
            Close more wholesale deals with data-driven offers that get accepted.
          </p>
        </div>
  
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 mb-16">
          <NuxtLink
            to="/login"
            class="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black bg-yellow-gold hover:bg-yellow-300 transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Login
          </NuxtLink>
          <button class="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-transparent border-2 border-white/30 hover:border-yellow-gold hover:text-yellow-gold transition-all duration-200 rounded-lg group">
            Learn More
            <svg class="ml-2 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </button>
        </div>
  
        <!-- Video Section -->
        <div class="w-full max-w-4xl mx-auto">
          <div class="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
            <!-- Video -->
            <video
              class="w-full h-full object-cover"
              autoplay
              muted
              loop
              playsinline
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
            </video>
            
            <!-- Video Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  // Component logic can be added here if needed
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