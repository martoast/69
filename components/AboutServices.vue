<!-- components/AboutServices.vue -->
<template>
  <section id="features" class="min-h-screen w-full bg-black text-white relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="floating-element floating-element-1"></div>
      <div class="floating-element floating-element-2"></div>
      <div class="floating-element floating-element-3"></div>
    </div>

    <!-- Content Container -->
    <div class="relative z-10 py-20 px-4">
      <div class="max-w-7xl mx-auto">
        
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Everything You Need to 
            <span class="text-yellow-gold">Close Commercial Deals</span>
          </h2>
          <p class="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From instant property analysis to professional documents and AI-powered insights, 
            we've built the complete toolkit for commercial real estate success.
          </p>
        </div>

        <!-- Main Features Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          
          <!-- Feature 1: Instant Property Analysis -->
          <div class="feature-card group">
            <div class="feature-icon-container">
              <div class="feature-icon bg-gradient-to-br from-blue-500 to-blue-600">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
            </div>
            <div class="feature-content">
              <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
                Instant Property Analysis
              </h3>
              <p class="text-gray-300 mb-6 leading-relaxed">
                Upload any file or document and get full underwriting on income, expenses, and asset details within seconds. 
                Our AI-powered system processes PDFs, spreadsheets, images, and more to extract and analyze critical deal data instantly.
              </p>
              <div class="feature-highlights">
                <div class="highlight-item">
                  <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Process any document type in seconds</span>
                </div>
                <div class="highlight-item">
                  <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Full income & expense analysis</span>
                </div>
                <div class="highlight-item">
                  <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Automatic DSCR & NOI calculations</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Feature 2: Accurate Offers & Deal Structuring -->
          <div class="feature-card group">
            <div class="feature-icon-container">
              <div class="feature-icon bg-gradient-to-br from-green-500 to-green-600">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
            <div class="feature-content">
              <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
                Data-Driven Offer Generation
              </h3>
              <p class="text-gray-300 mb-6 leading-relaxed">
                Generate offers that maximize profits and make sense for both sides. Our system structures deals 
                so buyers can profit at closing while maintaining positive cash flow, creating win-win scenarios that get accepted.
              </p>
              <div class="feature-highlights">
                <div class="highlight-item">
                  <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Creative financing structures</span>
                </div>
                <div class="highlight-item">
                  <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Seller & buyer profit breakdowns</span>
                </div>
                <div class="highlight-item">
                  <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Win-win deal structuring</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Secondary Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <!-- Contracts & LOIs -->
          <div class="feature-card-small group">
            <div class="feature-icon-small bg-gradient-to-br from-purple-500 to-purple-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h4 class="text-xl font-bold text-white mb-3">Contracts & LOIs</h4>
            <p class="text-gray-400 text-sm leading-relaxed">
              Auto-generate professional contracts, letters of intent, and ready-to-send templates with all your deal terms pre-filled.
            </p>
          </div>
          
          <!-- Email & SMS Templates -->
          <div class="feature-card-small group">
            <div class="feature-icon-small bg-gradient-to-br from-yellow-500 to-yellow-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h4 class="text-xl font-bold text-white mb-3">Communication Templates</h4>
            <p class="text-gray-400 text-sm leading-relaxed">
              Pre-built email & SMS templates with easy editing to communicate fast and effectively with sellers, buyers, and agents.
            </p>
          </div>
          
          <!-- Clear Presentations -->
          <div class="feature-card-small group">
            <div class="feature-icon-small bg-gradient-to-br from-red-500 to-red-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <h4 class="text-xl font-bold text-white mb-3">Deal Presentations</h4>
            <p class="text-gray-400 text-sm leading-relaxed">
              Present clear financials and deal structures to close with confidence. Show sellers and buyers exactly how they profit.
            </p>
          </div>
        </div>

        <!-- AI Assistant Feature - Full Width -->
        <div class="feature-card-large group mb-20">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="feature-content">
              <div class="feature-icon-container mb-6">
                <div class="feature-icon bg-gradient-to-br from-indigo-500 to-indigo-600">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
              </div>
              <h3 class="text-3xl md:text-4xl font-bold text-white mb-6">
                AI-Powered Deal Assistant
              </h3>
              <p class="text-gray-300 mb-6 leading-relaxed text-lg">
                Your 24/7 commercial real estate expert. Get instant access to ready-made scripts, objection handlers, 
                and customized deal structures. Ask questions about market analysis, negotiation strategies, or deal optimization - 
                our AI understands your exact numbers and provides actionable insights.
              </p>
              <div class="space-y-3">
                <div class="highlight-item">
                  <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Ready-made scripts and objection handlers</span>
                </div>
                <div class="highlight-item">
                  <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Upload documents for instant analysis</span>
                </div>
                <div class="highlight-item">
                  <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Custom deal structuring recommendations</span>
                </div>
              </div>
            </div>

            <!-- AI Chat Demo Visual -->
            <div class="feature-visual">
              <div class="ai-chat-mockup">
                <div class="chat-header">
                  <div class="flex items-center space-x-3">
                    <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span class="text-white text-sm font-medium ml-4">69 AI Assistant</span>
                  </div>
                </div>
                <div class="chat-content">
                  <div class="chat-message user-message">
                    How can I structure this deal for profit at closing?
                  </div>
                  <div class="chat-message ai-message">
                    Based on your NOI of $45,000 and current cap rate of 7.5%, here's a winning structure: 
                    Use seller financing at 5% with 20% down. This creates $15,000 profit at closing while maintaining 
                    $2,500/month positive cash flow...
                  </div>
                  <div class="chat-message user-message">
                    📎 property_financials.csv uploaded
                  </div>
                  <div class="chat-message ai-message">
                    Perfect! I've analyzed your spreadsheet. The property shows strong fundamentals with 95% occupancy. 
                    I recommend offering $1.2M with these terms...
                  </div>
                  <div class="chat-input">
                    <span class="input-placeholder">Ask anything about your deal...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="text-center py-12 px-8 bg-gradient-to-r from-yellow-gold/10 to-yellow-500/10 rounded-3xl border border-yellow-gold/20">
          <h3 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Close Smarter, Faster, and at Scale
          </h3>
          <p class="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join successful commercial real estate professionals who are using the 69 Tool to transform their deal flow.
          </p>
          <NuxtLink
            to="/login"
            class="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black bg-yellow-gold hover:bg-yellow-300 transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started Now
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
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Background animations */
@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(20px, -20px) rotate(120deg); }
  66% { transform: translate(-15px, 15px) rotate(240deg); }
}

.floating-element {
  position: absolute;
  border-radius: 50%;
  opacity: 0.05;
  background: linear-gradient(135deg, #d4af3780, transparent);
  animation: float 25s ease-in-out infinite;
}

.floating-element-1 {
  width: 120px;
  height: 120px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.floating-element-2 {
  width: 80px;
  height: 80px;
  top: 60%;
  right: 15%;
  animation-delay: 8s;
}

.floating-element-3 {
  width: 60px;
  height: 60px;
  bottom: 30%;
  left: 20%;
  animation-delay: 16s;
}

/* Feature Cards */
.feature-card {
  @apply bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 transition-all duration-300 hover:border-yellow-gold/30 hover:shadow-2xl hover:-translate-y-2;
}

.feature-card-small {
  @apply bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:border-yellow-gold/30 hover:shadow-xl hover:-translate-y-1;
}

.feature-card-large {
  @apply bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 lg:p-12 transition-all duration-300 hover:border-yellow-gold/30 hover:shadow-2xl;
}

.feature-icon-container {
  @apply mb-6;
}

.feature-icon {
  @apply w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-lg;
}

.feature-icon-small {
  @apply w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg mb-4;
}

.feature-content h3 {
  @apply text-white font-bold;
}

.feature-highlights {
  @apply space-y-3;
}

.highlight-item {
  @apply flex items-center space-x-3 text-gray-300;
}

/* AI Chat Mockup */
.ai-chat-mockup {
  @apply bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden;
}

.chat-header {
  @apply bg-gray-900 p-4 border-b border-gray-700;
}

.chat-content {
  @apply p-6 space-y-4 max-h-96 overflow-y-auto;
}

.chat-message {
  @apply p-4 rounded-lg max-w-[85%] text-sm;
}

.user-message {
  @apply bg-yellow-gold text-black ml-auto font-medium;
}

.ai-message {
  @apply bg-gray-700 text-gray-100;
}

.chat-input {
  @apply bg-gray-900 border border-gray-600 rounded-lg p-3 mt-4;
}

.input-placeholder {
  @apply text-gray-400 text-sm;
}

/* Colors */
.text-yellow-gold {
  color: #d4af37;
}

.bg-yellow-gold {
  background-color: #d4af37;
}

.hover\:bg-yellow-300:hover {
  background-color: #fde047;
}

.border-yellow-gold\/30 {
  border-color: rgb(212 175 55 / 0.3);
}

.hover\:border-yellow-gold\/30:hover {
  border-color: rgb(212 175 55 / 0.3);
}

.from-yellow-gold\/10 {
  --tw-gradient-from: rgb(212 175 55 / 0.1);
}

.to-yellow-500\/10 {
  --tw-gradient-to: rgb(234 179 8 / 0.1);
}

.border-yellow-gold\/20 {
  border-color: rgb(212 175 55 / 0.2);
}

/* Scrollbar styling for chat mockup */
.chat-content::-webkit-scrollbar {
  width: 6px;
}

.chat-content::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 3px;
}

.chat-content::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 3px;
}

.chat-content::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .floating-element {
    opacity: 0.03;
  }
  
  .feature-card {
    @apply p-6;
  }
  
  .feature-card-small {
    @apply p-5;
  }
  
  .feature-card-large {
    @apply p-6;
  }
  
  .ai-chat-mockup {
    @apply text-sm;
  }
  
  .chat-content {
    @apply max-h-64;
  }
}
</style>