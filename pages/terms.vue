<template>
    <div class="min-h-screen bg-black text-white">
      <!-- Header -->
      <div class="bg-gray-900/50 border-b border-gray-700">
        <div class="max-w-4xl mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-yellow-gold">Terms of Service</h1>
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
            <h2 class="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
            <p class="text-gray-300 mb-4">
              By accessing and using our real estate deal analysis platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our service.
            </p>
          </section>
  
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">Description of Service</h2>
            <p class="text-gray-300 mb-4">
              Our platform provides tools for real estate investment analysis, including:
            </p>
            <ul class="text-gray-300 space-y-2 ml-6">
              <li>• Property deal calculation and analysis tools</li>
              <li>• Letter of Intent (LOI) generation services</li>
              <li>• AI-powered investment insights and recommendations</li>
              <li>• Document creation and management features</li>
            </ul>
          </section>
  
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">User Responsibilities</h2>
            <p class="text-gray-300 mb-4">
              As a user of our service, you agree to:
            </p>
            <ul class="text-gray-300 space-y-2 ml-6">
              <li>• Provide accurate and complete information</li>
              <li>• Use the service only for lawful purposes</li>
              <li>• Not share your account credentials with others</li>
              <li>• Respect intellectual property rights</li>
              <li>• Not attempt to breach security or disrupt the service</li>
            </ul>
          </section>
  
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">Disclaimer of Investment Advice</h2>
            <div class="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-4">
              <p class="text-yellow-200 font-medium">
                IMPORTANT: Our platform provides analysis tools and information for educational purposes only. We do not provide investment advice, legal advice, or financial planning services.
              </p>
            </div>
            <ul class="text-gray-300 space-y-2 ml-6">
              <li>• All calculations and analyses are estimates based on user input</li>
              <li>• You should consult with qualified professionals before making investment decisions</li>
              <li>• Real estate investments carry inherent risks</li>
              <li>• Past performance does not guarantee future results</li>
            </ul>
          </section>
  
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
            <p class="text-gray-300 mb-4">
              The platform, including all content, features, and functionality, is owned by us and is protected by copyright, trademark, and other intellectual property laws. You may not:
            </p>
            <ul class="text-gray-300 space-y-2 ml-6">
              <li>• Copy, modify, or distribute our proprietary content</li>
              <li>• Reverse engineer or attempt to extract source code</li>
              <li>• Use our trademarks without permission</li>
              <li>• Create derivative works based on our platform</li>
            </ul>
          </section>
  
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
            <p class="text-gray-300 mb-4">
              To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of our service. This includes but is not limited to:
            </p>
            <ul class="text-gray-300 space-y-2 ml-6">
              <li>• Investment losses based on platform calculations</li>
              <li>• Errors in generated documents or analyses</li>
              <li>• Service interruptions or technical issues</li>
              <li>• Loss of data or business opportunities</li>
            </ul>
          </section>
  
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">Account Termination</h2>
            <p class="text-gray-300 mb-4">
              We reserve the right to terminate or suspend your account at any time for violations of these terms. You may also terminate your account at any time by contacting us.
            </p>
          </section>
  
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">Payment and Subscriptions</h2>
            <p class="text-gray-300 mb-4">
              If applicable to your account:
            </p>
            <ul class="text-gray-300 space-y-2 ml-6">
              <li>• Subscription fees are billed in advance</li>
              <li>• Refunds are provided according to our refund policy</li>
              <li>• You are responsible for keeping payment information current</li>
              <li>• Service may be suspended for non-payment</li>
            </ul>
          </section>
  
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">Modifications to Terms</h2>
            <p class="text-gray-300 mb-4">
              We reserve the right to modify these terms at any time. We will notify users of significant changes via email or platform notifications. Continued use of the service after changes constitutes acceptance of new terms.
            </p>
          </section>
  
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">Governing Law</h2>
            <p class="text-gray-300 mb-4">
              These terms are governed by the laws of [Your State/Country]. Any disputes will be resolved through binding arbitration in [Your Jurisdiction].
            </p>
          </section>
  
          <section>
            <h2 class="text-2xl font-bold text-white mb-4">Contact Information</h2>
            <p class="text-gray-300">
              If you have questions about these Terms of Service, please contact us at support@dealanalyzer.com
            </p>
          </section>
  
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Set page title
  useHead({
    title: 'Terms of Service - Deal Analyzer'
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