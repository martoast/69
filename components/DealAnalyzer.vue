<template>
    <div class="min-h-screen bg-black text-white p-6">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl md:text-4xl font-bold mb-4">
            Deal <span class="text-yellow-gold">Analyzer</span>
          </h1>
          <p class="text-gray-400">Analyze commercial real estate deals and generate Letters of Intent</p>
        </div>
  
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- INPUTS SECTION -->
          <div class="bg-gray-900/50 backdrop-blur-sm border border-yellow-gold/20 rounded-2xl p-6">
            <h2 class="text-2xl font-bold text-yellow-gold mb-6">INPUTS</h2>
            
            <!-- Property Information -->
            <div class="space-y-4 mb-8">
              <h3 class="text-lg font-semibold text-white border-b border-gray-700 pb-2">Property Information</h3>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Property Address</label>
                <input
                  v-model="inputs.propertyAddress"
                  type="text"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                  placeholder="Enter property address"
                />
              </div>
  
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Seller's Name</label>
                  <input
                    v-model="inputs.sellerName"
                    type="text"
                    class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                    placeholder="Seller name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">LLC Name</label>
                  <input
                    v-model="inputs.llcName"
                    type="text"
                    class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                    placeholder="LLC Name"
                  />
                </div>
              </div>
  
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Agent Email</label>
                  <input
                    v-model="inputs.agentEmail"
                    type="email"
                    class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                    placeholder="agent@email.com"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Agent Phone</label>
                  <input
                    v-model="inputs.agentPhone"
                    type="tel"
                    class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                    placeholder="(305) 338-5355"
                  />
                </div>
              </div>
            </div>
  
            <!-- Financial Inputs -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-white border-b border-gray-700 pb-2">Financial Details</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Purchase Price ($)</label>
                  <input
                    v-model.number="inputs.purchasePrice"
                    type="number"
                    class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                    placeholder="3600000"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Gross Monthly Rent ($)</label>
                  <input
                    v-model.number="inputs.grossMonthlyRent"
                    type="number"
                    class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                    placeholder="18339"
                  />
                </div>
              </div>
  
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Monthly Expenses ($)</label>
                <input
                  v-model.number="inputs.monthlyExpenses"
                  type="number"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                  placeholder="0"
                />
              </div>
  
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">DSCR Interest Rate (%)</label>
                  <input
                    v-model.number="inputs.dscrInterestRate"
                    type="number"
                    step="0.1"
                    class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                    placeholder="7.5"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">DSCR LTV (%)</label>
                  <input
                    v-model.number="inputs.dscrLTV"
                    type="number"
                    class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                    placeholder="75"
                  />
                </div>
              </div>
  
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Seller Finance Interest Rate (%)</label>
                  <input
                    v-model.number="inputs.sellerFinanceRate"
                    type="number"
                    step="0.01"
                    class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                    placeholder="5.0"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Amortization (Years)</label>
                  <input
                    v-model.number="inputs.amortizationYears"
                    type="number"
                    class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                    placeholder="30"
                  />
                </div>
              </div>
  
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Down Payment to Seller ($)</label>
                  <input
                    v-model.number="inputs.downPaymentToSeller"
                    type="number"
                    class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                    placeholder="2340000"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Balloon (Years)</label>
                  <input
                    v-model.number="inputs.balloonYears"
                    type="number"
                    class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                    placeholder="7"
                  />
                </div>
              </div>
  
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Payment Type</label>
                <select
                  v-model="inputs.paymentType"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                >
                  <option value="Interest Only">Interest Only</option>
                  <option value="Principal Only">Principal Only</option>
                  <option value="Principal and Interest">Principal and Interest</option>
                </select>
              </div>
            </div>
          </div>
  
          <!-- OUTPUTS SECTION -->
          <div class="bg-gray-900/50 backdrop-blur-sm border border-yellow-gold/20 rounded-2xl p-6">
            <h2 class="text-2xl font-bold text-yellow-gold mb-6">OUTPUTS</h2>
            
            <!-- Calculated Values -->
            <div class="space-y-6">
              <!-- Offer Summary -->
              <div class="bg-gray-800/30 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Offer Summary</h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-300">Purchase Price:</span>
                    <span class="font-mono text-green-400">${{ formatNumber(inputs.purchasePrice) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-300">Down Payment:</span>
                    <span class="font-mono text-green-400">${{ formatNumber(calculations.downPayment) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-300">Seller Financing Note:</span>
                    <span class="font-mono text-green-400">${{ formatNumber(calculations.sellerCarryAmount) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-300">Interest Rate:</span>
                    <span class="font-mono text-green-400">{{ inputs.sellerFinanceRate }}%</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-300">EMD:</span>
                    <span class="font-mono text-green-400">${{ formatNumber(calculations.emd) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-300">Monthly Payment:</span>
                    <span class="font-mono text-green-400">${{ formatNumber(calculations.sellerCarryPayment) }}</span>
                  </div>
                </div>
              </div>
  
              <!-- Cash Flow Analysis -->
              <div class="bg-gray-800/30 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Cash Flow Analysis</h3>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-300">Monthly NOI:</span>
                    <span class="font-mono text-blue-400">${{ formatNumber(calculations.monthlyNOI) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-300">DSCR Loan Amount:</span>
                    <span class="font-mono text-blue-400">${{ formatNumber(calculations.dscrLoanAmount) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-300">DSCR Monthly Payment:</span>
                    <span class="font-mono text-red-400">${{ formatNumber(calculations.dscrMonthlyPayment) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-300">Seller Carry Payment:</span>
                    <span class="font-mono text-red-400">${{ formatNumber(calculations.sellerCarryPayment) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-300">Total Monthly Outflow:</span>
                    <span class="font-mono text-red-400">${{ formatNumber(calculations.totalMonthlyOutflow) }}</span>
                  </div>
                  <div class="flex justify-between border-t border-gray-700 pt-3">
                    <span class="text-gray-300 font-semibold">Monthly Cash Flow:</span>
                    <span class="font-mono font-bold" :class="calculations.monthlyCashFlow >= 0 ? 'text-green-400' : 'text-red-400'">
                      ${{ formatNumber(calculations.monthlyCashFlow) }}
                    </span>
                  </div>
                </div>
              </div>
  
              <!-- Deal Summary -->
              <div class="bg-gray-800/30 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Deal Summary</h3>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-300">Closing Fees + Agent:</span>
                    <span class="font-mono text-yellow-400">${{ formatNumber(calculations.closingFees) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-300">Assignment Fee:</span>
                    <span class="font-mono text-yellow-400">${{ formatNumber(calculations.assignmentFee) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-300">Net to Buyer:</span>
                    <span class="font-mono text-green-400">${{ formatNumber(calculations.netToBuyer) }}</span>
                  </div>
                  <div class="flex justify-between border-t border-gray-700 pt-3">
                    <span class="text-gray-300 font-semibold">Net Cash to Seller:</span>
                    <span class="font-mono text-green-400 font-bold">${{ formatNumber(calculations.netCashToSeller) }}</span>
                  </div>
                </div>
              </div>
  
              <!-- Generate LOI Button -->
              <button
                @click="generateLOI"
                :disabled="!isFormValid"
                class="w-full px-6 py-4 bg-yellow-gold hover:bg-yellow-300 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold text-lg rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl disabled:hover:transform-none"
              >
                Generate Letter of Intent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Inputs reactive object
  const inputs = ref({
    propertyAddress: '',
    sellerName: '',
    llcName: '',
    agentEmail: '',
    agentPhone: '',
    purchasePrice: 0,
    grossMonthlyRent: 0,
    monthlyExpenses: 0,
    dscrInterestRate: 7.5,
    dscrLTV: 75,
    sellerFinanceRate: 5.0,
    amortizationYears: 30,
    downPaymentToSeller: 0,
    balloonYears: 7,
    paymentType: 'Interest Only'
  })
  
  // PMT function for loan calculations
  const PMT = (rate, nper, pv) => {
    if (rate === 0) return -pv / nper
    return -pv * (rate * Math.pow(1 + rate, nper)) / (Math.pow(1 + rate, nper) - 1)
  }
  
  // Calculated values
  const calculations = computed(() => {
    const purchasePrice = inputs.value.purchasePrice || 0
    const grossMonthlyRent = inputs.value.grossMonthlyRent || 0
    const monthlyExpenses = inputs.value.monthlyExpenses || 0
    const dscrInterestRate = (inputs.value.dscrInterestRate || 0) / 100
    const dscrLTV = inputs.value.dscrLTV || 0
    const sellerFinanceRate = (inputs.value.sellerFinanceRate || 0) / 100
    const amortizationYears = inputs.value.amortizationYears || 30
    const downPaymentToSeller = inputs.value.downPaymentToSeller || 0
    const balloonYears = inputs.value.balloonYears || 7
    const paymentType = inputs.value.paymentType || 'Interest Only'
  
    // Monthly NOI = Gross Monthly Rent - Monthly Expenses
    const monthlyNOI = grossMonthlyRent - monthlyExpenses
  
    // DSCR Loan Amount = Purchase Price * LTV / 100
    const dscrLoanAmount = purchasePrice * dscrLTV / 100
  
    // DSCR Monthly Payment = PMT(rate/12, 360, -loan_amount)
    const dscrMonthlyPayment = dscrLoanAmount > 0 ? PMT(dscrInterestRate / 12, 360, -dscrLoanAmount) : 0
  
    // Down Payment = DSCR Loan Amount (what goes to the bank)
    const downPayment = dscrLoanAmount
  
    // Seller Carry Amount = Purchase Price - Down Payment to Seller
    const sellerCarryAmount = purchasePrice - downPaymentToSeller
  
    // Seller Carry Monthly Payment calculation
    let sellerCarryPayment = 0
    if (sellerCarryAmount > 0) {
      if (paymentType === 'Interest Only') {
        sellerCarryPayment = sellerCarryAmount * sellerFinanceRate / 12
      } else if (paymentType === 'Principal Only') {
        sellerCarryPayment = sellerCarryAmount / (amortizationYears * 12)
      } else if (paymentType === 'Principal and Interest') {
        sellerCarryPayment = -PMT(sellerFinanceRate / 12, amortizationYears * 12, sellerCarryAmount)
      }
    }
  
    // Total Monthly Outflow = Monthly Expenses + DSCR Payment + Seller Carry Payment
    const totalMonthlyOutflow = monthlyExpenses + dscrMonthlyPayment + sellerCarryPayment
  
    // Monthly Cash Flow = Monthly NOI - Total Monthly Outflow
    const monthlyCashFlow = monthlyNOI - totalMonthlyOutflow
  
    // EMD = Purchase Price * 0.01 (1%)
    const emd = purchasePrice * 0.01
  
    // Closing Fees + Agent = Purchase Price * 0.04 (4%)
    const closingFees = purchasePrice * 0.04
  
    // Assignment Fee = Purchase Price * 0.03 (3%)
    const assignmentFee = purchasePrice * 0.03
  
    // Net to Buyer = DSCR Loan Amount - Down Payment to Seller - Closing Fees - Assignment Fee
    const netToBuyer = dscrLoanAmount - downPaymentToSeller - closingFees - assignmentFee
  
    // Net Cash to Seller = Down Payment to Seller + (Seller Carry Payment * Balloon Years * 12) + Seller Carry Amount  
    const totalInterestPayments = sellerCarryPayment * balloonYears * 12
    const netCashToSeller = downPaymentToSeller + totalInterestPayments + sellerCarryAmount
  
    return {
      monthlyNOI,
      dscrLoanAmount,
      dscrMonthlyPayment,
      downPayment,
      sellerCarryAmount,
      sellerCarryPayment,
      totalMonthlyOutflow,
      monthlyCashFlow,
      emd,
      closingFees,
      assignmentFee,
      netToBuyer,
      netCashToSeller
    }
  })
  
  // Form validation
  const isFormValid = computed(() => {
    return inputs.value.propertyAddress && 
           inputs.value.purchasePrice > 0 && 
           inputs.value.grossMonthlyRent > 0
  })
  
  // Format number for display
  const formatNumber = (num) => {
    if (num === undefined || num === null) return '0'
    return Math.round(num).toLocaleString()
  }
  
  // Generate LOI function
  const generateLOI = () => {
    // TODO: Implement LOI generation
    console.log('Generating LOI with data:', {
      inputs: inputs.value,
      calculations: calculations.value
    })
    alert('LOI generation functionality will be implemented next!')
  }
  </script>
  
  <style scoped>
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
  
  .focus\:ring-yellow-gold:focus {
    --tw-ring-color: #d4af37;
  }
  </style>