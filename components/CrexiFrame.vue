<template>
  <!-- Simple Link Button -->
  <a
    href="https://www.crexi.com/"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-yellow-gold hover:text-yellow-300 hover:bg-yellow-gold/10 rounded-lg transition-all duration-200 border border-yellow-gold/30 hover:border-yellow-gold/50"
  >
    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
    </svg>
    <span class="hidden sm:inline">Browse Crexi</span>
    <span class="sm:hidden">Crexi</span>
  </a>
</template>

<script setup>
// No JavaScript needed - just a simple link
</script>

<style scoped>
/* Custom yellow-gold color */
.text-yellow-gold {
  color: #d4af37;
}

.hover\:text-yellow-300:hover {
  color: #fde047;
}

.border-yellow-gold\/30 {
  border-color: rgb(212 175 55 / 0.3);
}

.border-yellow-gold\/50 {
  border-color: rgb(212 175 55 / 0.5);
}

.hover\:border-yellow-gold\/50:hover {
  border-color: rgb(212 175 55 / 0.5);
}

.hover\:bg-yellow-gold\/10:hover {
  background-color: rgb(212 175 55 / 0.1);
}
</style>

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