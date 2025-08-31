<template>
    <div class="min-h-screen bg-black text-white">
      <!-- Header -->
      <div class="bg-gray-900/50 border-b border-gray-700">
        <div class="max-w-4xl mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-yellow-gold">Privacy Policy</h1>
            <NuxtLink
              to="/"
              class="inline-flex items-center px-4 py-2 bg-black border border-gray-600 hover:border-yellow-gold text-white hover:text-yellow-gold transition-all duration-200 rounded-lg"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Back to Home
            </NuxtLink>
          </div>
        </div>
      </div>
  
      <!-- Content -->
      <div class="max-w-4xl mx-auto px-6 py-12">
        <div class="prose prose-invert max-w-none">
          
          <div class="mb-8">
            <p class="text-gray-300 text-lg">Last updated: {{ currentDate }}</p>
          </div>
  
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">Information We Collect</h2>
            <p class="text-gray-300 mb-4">
              We collect information you provide directly to us when using our real estate deal analysis platform:
            </p>
            <ul class="text-gray-300 space-y-2 ml-6">
              <li>• Account information (email, name, company details)</li>
              <li>• Property and deal information you input into our analyzer</li>
              <li>• Communication preferences and settings</li>
              <li>• Usage data and analytics to improve our service</li>
            </ul>
          </section>
  
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
            <p class="text-gray-300 mb-4">
              We use the information we collect to:
            </p>
            <ul class="text-gray-300 space-y-2 ml-6">
              <li>• Provide and improve our deal analysis services</li>
              <li>• Generate professional documents like Letters of Intent</li>
              <li>• Provide AI-powered insights and recommendations</li>
              <li>• Communicate with you about your account and our services</li>
              <li>• Ensure the security and integrity of our platform</li>
            </ul>
          </section>
  
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">Information Sharing</h2>
            <p class="text-gray-300 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except:
            </p>
            <ul class="text-gray-300 space-y-2 ml-6">
              <li>• With your explicit consent</li>
              <li>• To comply with legal obligations</li>
              <li>• To protect our rights and the safety of our users</li>
              <li>• With trusted service providers who assist in operating our platform</li>
            </ul>
          </section>
  
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">Data Security</h2>
            <p class="text-gray-300 mb-4">
              We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>
  
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">Your Rights</h2>
            <p class="text-gray-300 mb-4">
              You have the right to:
            </p>
            <ul class="text-gray-300 space-y-2 ml-6">
              <li>• Access and update your personal information</li>
              <li>• Delete your account and associated data</li>
              <li>• Opt out of marketing communications</li>
              <li>• Request a copy of your data</li>
            </ul>
          </section>
  
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
            <p class="text-gray-300 mb-4">
              We use cookies and similar technologies to enhance your experience, analyze usage patterns, and improve our services. You can control cookie settings through your browser preferences.
            </p>
          </section>
  
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
            <p class="text-gray-300 mb-4">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "last updated" date.
            </p>
          </section>
  
          <section>
            <h2 class="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p class="text-gray-300">
              If you have any questions about this privacy policy, please contact us at privacy@dealanalyzer.com
            </p>
          </section>
  
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Set page title
  useHead({
    title: 'Privacy Policy - Deal Analyzer'
  })
  
  // Get current date for "last updated"
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  </script>
  
  <style scoped>
  .text-yellow-gold {
    color: #d4af37;
  }
  
  .hover\:text-yellow-gold:hover {
    color: #d4af37;
  }
  
  .hover\:border-yellow-gold:hover {
    border-color: #d4af37;
  }
  </style>