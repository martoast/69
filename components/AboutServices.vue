<template>
    <section id="services" class="min-h-screen w-full bg-black text-white relative overflow-hidden">
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
              <span class="text-yellow-gold">Close Deals</span>
            </h2>
            <p class="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our platform combines powerful deal analysis, professional document generation, and AI-powered insights to help wholesale real estate investors succeed.
            </p>
          </div>
  
          <!-- Main Features Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            
            <!-- Feature 1: Deal Analyzer -->
            <div class="feature-card group">
              <div class="feature-icon-container">
                <div class="feature-icon bg-gradient-to-br from-blue-500 to-blue-600">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
              </div>
              <div class="feature-content">
                <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
                  Advanced Deal Analyzer
                </h3>
                <p class="text-gray-300 mb-6 leading-relaxed">
                  Input property details and financing terms to instantly calculate cash flow, NOI, DSCR payments, and seller carry amounts. Our sophisticated calculator handles complex creative financing scenarios including seller financing, balloon payments, and multiple payment structures.
                </p>
                <div class="feature-highlights">
                  <div class="highlight-item">
                    <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>Real-time financial calculations</span>
                  </div>
                  <div class="highlight-item">
                    <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>DSCR loan analysis</span>
                  </div>
                  <div class="highlight-item">
                    <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>Creative financing scenarios</span>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Feature 2: LOI Generator -->
            <div class="feature-card group">
              <div class="feature-icon-container">
                <div class="feature-icon bg-gradient-to-br from-yellow-gold to-yellow-500">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
              </div>
              <div class="feature-content">
                <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
                  Professional LOI Generation
                </h3>
                <p class="text-gray-300 mb-6 leading-relaxed">
                  Automatically generate professional Letters of Intent using your deal analysis data. Our system creates legally sound, comprehensive documents that include all financial terms, seller protection clauses, and industry-standard language that gets deals accepted.
                </p>
                <div class="feature-highlights">
                  <div class="highlight-item">
                    <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>Auto-populated with your deal data</span>
                  </div>
                  <div class="highlight-item">
                    <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>Editable before printing</span>
                  </div>
                  <div class="highlight-item">
                    <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>Print-ready PDF output</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- AI Chat Feature - Full Width -->
          <div class="feature-card-large group mb-20">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="feature-content">
                <div class="feature-icon-container mb-6">
                  <div class="feature-icon bg-gradient-to-br from-purple-500 to-purple-600">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                    </svg>
                  </div>
                </div>
                <h3 class="text-3xl md:text-4xl font-bold text-white mb-6">
                  AI Deal Advisor
                </h3>
                <p class="text-gray-300 mb-6 leading-relaxed text-lg">
                  Get instant professional insights about your deals from our AI advisor. Ask questions about profitability, risks, market conditions, or negotiation strategies. The AI has full context of your deal numbers and provides personalized investment advice.
                </p>
                <div class="space-y-3">
                  <div class="highlight-item">
                    <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>Real estate investment expertise built-in</span>
                  </div>
                  <div class="highlight-item">
                    <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>Knows your exact deal numbers and calculations</span>
                  </div>
                  <div class="highlight-item">
                    <svg class="w-5 h-5 text-yellow-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>Available 24/7 for deal analysis and advice</span>
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
                      <span class="text-white text-sm font-medium ml-4">Deal AI Assistant</span>
                    </div>
                  </div>
                  <div class="chat-content">
                    <div class="chat-message user-message">
                      Is this deal profitable with -$5,790 monthly cash flow?
                    </div>
                    <div class="chat-message ai-message">
                      Based on your analysis, this deal shows negative cash flow of -$5,790/month. However, let me break down the key factors: Your NOI is strong at $18,339, but the high DSCR payment of $18,879 is creating the negative flow. Consider...
                    </div>
                    <div class="chat-input">
                      <span class="input-placeholder">Ask about this deal...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
  
  .feature-card-large {
    @apply bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 lg:p-12 transition-all duration-300 hover:border-yellow-gold/30 hover:shadow-2xl;
  }
  
  .feature-icon-container {
    @apply mb-6;
  }
  
  .feature-icon {
    @apply w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-lg;
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
    @apply p-6 space-y-4;
  }
  
  .chat-message {
    @apply p-4 rounded-lg max-w-[80%];
  }
  
  .user-message {
    @apply bg-yellow-gold text-black ml-auto;
  }
  
  .ai-message {
    @apply bg-gray-700 text-white;
  }
  
  .chat-input {
    @apply bg-gray-900 border border-gray-600 rounded-lg p-3;
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
  
  /* Mobile adjustments */
  @media (max-width: 768px) {
    .floating-element {
      opacity: 0.03;
    }
    
    .feature-card {
      @apply p-6;
    }
    
    .feature-card-large {
      @apply p-6;
    }
    
    .ai-chat-mockup {
      @apply text-sm;
    }
  }
  </style>