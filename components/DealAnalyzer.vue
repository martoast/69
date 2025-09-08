<!-- components/DealAnalyzer.vue -->
<template>
  <div class="min-h-screen bg-black text-white p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold mb-4">
          Deal <span class="text-yellow-gold">Analyzer</span>
        </h1>
        <p class="text-gray-400">
          Analyze commercial real estate deals and generate Letters of Intent
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- INPUTS SECTION -->
        <div
          class="bg-gray-900/50 backdrop-blur-sm border border-yellow-gold/20 rounded-2xl p-6"
        >
          <h2 class="text-2xl font-bold text-yellow-gold mb-6">INPUTS</h2>

          <!-- Property Information -->
          <div class="space-y-4 mb-8">
            <h3
              class="text-lg font-semibold text-white border-b border-gray-700 pb-2"
            >
              Property Information
            </h3>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >Property Address</label
              >
              <input
                v-model="inputs.propertyAddress"
                type="text"
                class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                placeholder="Enter property address"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Agent Name</label
                >
                <input
                  v-model="inputs.agentName"
                  type="text"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                  placeholder="Agent's full name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Seller's Name</label
                >
                <input
                  v-model="inputs.sellerName"
                  type="text"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                  placeholder="Property seller name"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Agent Email</label
                >
                <input
                  v-model="inputs.agentEmail"
                  type="email"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                  placeholder="agent@email.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Agent Phone</label
                >
                <input
                  v-model="inputs.agentPhone"
                  type="tel"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                  placeholder="(305) 338-5355"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Buyer Name</label
                >
                <input
                  v-model="inputs.buyerName"
                  type="text"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                  placeholder="Enter buyer name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Buyer Email</label
                >
                <input
                  v-model="inputs.buyerEmail"
                  type="email"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                  placeholder="buyer@email.com"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >Buyer Phone</label
              >
              <input
                v-model="inputs.buyerPhone"
                type="tel"
                class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >LLC Name</label
              >
              <input
                v-model="inputs.llcName"
                type="text"
                class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                readonly
                disabled
              />
            </div>
          </div>

          <!-- Financial Inputs -->
          <div class="space-y-4">
            <h3
              class="text-lg font-semibold text-white border-b border-gray-700 pb-2"
            >
              Financial Details
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Purchase Price ($)</label
                >
                <input
                  v-model.number="inputs.purchasePrice"
                  type="number"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                  placeholder="3600000"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Gross Monthly Rent ($)</label
                >
                <input
                  v-model.number="inputs.grossMonthlyRent"
                  type="number"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                  placeholder="18339"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >Monthly Expenses ($)</label
              >
              <input
                v-model.number="inputs.monthlyExpenses"
                type="number"
                class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >DSCR Interest Rate (%)</label
                >
                <input
                  v-model.number="inputs.dscrInterestRate"
                  type="number"
                  step="0.1"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                  placeholder="7.5"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >DSCR LTV (%)</label
                >
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
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Seller Finance Interest Rate (%)</label
                >
                <input
                  v-model.number="inputs.sellerFinanceRate"
                  type="number"
                  step="0.01"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                  placeholder="5.0"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Amortization (Years)</label
                >
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
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Down Payment to Seller ($)</label
                >
                <input
                  v-model.number="inputs.downPaymentToSeller"
                  type="number"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                  placeholder="2340000"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Balloon (Years)</label
                >
                <input
                  v-model.number="inputs.balloonYears"
                  type="number"
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                  placeholder="7"
                />
              </div>
            </div>

            <!-- Editable Closing Fee -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Closing Fees + Agent (%)
                <span class="text-xs text-gray-400">- Default is 4%</span>
              </label>
              <input
                v-model.number="inputs.closingFeePercent"
                type="number"
                step="0.1"
                class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                placeholder="4.0"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >Payment Type</label
              >
              <select
                v-model="inputs.paymentType"
                class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
              >
                <option value="Interest Only">Interest Only</option>
                <option value="Principal Only">Principal Only</option>
                <option value="Principal and Interest">
                  Principal and Interest
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- OUTPUTS SECTION -->
        <div
          class="bg-gray-900/50 backdrop-blur-sm border border-yellow-gold/20 rounded-2xl p-6"
        >
          <h2 class="text-2xl font-bold text-yellow-gold mb-6">OUTPUTS</h2>

          <!-- Calculated Values -->
          <div class="space-y-6">
            <!-- DSCR Ratio Alert -->
            <div
              class="bg-gray-800/30 rounded-lg p-4 border-l-4"
              :class="
                calculations.dscrRatio >= 1.25
                  ? 'border-green-400'
                  : 'border-red-400'
              "
            >
              <div class="flex justify-between items-center">
                <span class="text-lg font-semibold text-white">DSCR Ratio</span>
                <span
                  class="text-2xl font-bold font-mono"
                  :class="
                    calculations.dscrRatio >= 1.25
                      ? 'text-green-400'
                      : 'text-red-400'
                  "
                >
                  {{ calculations.dscrRatio.toFixed(2) }}
                </span>
              </div>
              <p class="text-xs text-gray-400 mt-2">
                {{
                  calculations.dscrRatio >= 1.25
                    ? "Good Deal - Ratio above 1.25"
                    : "Caution - Ratio below 1.25"
                }}
              </p>
            </div>

            <!-- Offer Summary -->
            <div class="bg-gray-800/30 rounded-lg p-4">
              <h3
                class="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2"
              >
                Offer Summary
              </h3>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-300">Purchase Price:</span>
                  <span class="font-mono text-green-400"
                    >${{ formatNumber(inputs.purchasePrice) }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-300">Down Payment:</span>
                  <span class="font-mono text-green-400"
                    >${{ formatNumber(calculations.downPayment) }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-300">Seller Financing Note:</span>
                  <span class="font-mono text-green-400"
                    >${{ formatNumber(calculations.sellerCarryAmount) }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-300">Interest Rate:</span>
                  <span class="font-mono text-green-400"
                    >{{ inputs.sellerFinanceRate || 0 }}%</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-300">EMD:</span>
                  <span class="font-mono text-green-400"
                    >${{ formatNumber(calculations.emd) }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-300">Monthly Payment:</span>
                  <span class="font-mono text-green-400"
                    >${{ formatNumber(calculations.sellerCarryPayment) }}</span
                  >
                </div>
              </div>
            </div>

            <!-- Cash Flow Analysis -->
            <div class="bg-gray-800/30 rounded-lg p-4">
              <h3
                class="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2"
              >
                Cash Flow Analysis
              </h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-300">Monthly NOI:</span>
                  <span class="font-mono text-blue-400"
                    >${{ formatNumber(calculations.monthlyNOI) }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-300">DSCR Loan Amount:</span>
                  <span class="font-mono text-blue-400"
                    >${{ formatNumber(calculations.dscrLoanAmount) }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-300">DSCR Monthly Payment:</span>
                  <span class="font-mono text-red-400"
                    >${{ formatNumber(calculations.dscrMonthlyPayment) }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-300">Seller Carry Payment:</span>
                  <span class="font-mono text-red-400"
                    >${{ formatNumber(calculations.sellerCarryPayment) }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-300">Total Monthly Outflow:</span>
                  <span class="font-mono text-red-400"
                    >${{ formatNumber(calculations.totalMonthlyOutflow) }}</span
                  >
                </div>
                <div class="flex justify-between border-t border-gray-700 pt-3">
                  <span class="text-gray-300 font-semibold"
                    >Monthly Cash Flow:</span
                  >
                  <span
                    class="font-mono font-bold"
                    :class="
                      calculations.monthlyCashFlow >= 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    "
                  >
                    ${{ formatNumber(calculations.monthlyCashFlow) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Deal Summary -->
            <div class="bg-gray-800/30 rounded-lg p-4">
              <h3
                class="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2"
              >
                Deal Summary
              </h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-300">Closing Fees + Agent:</span>
                  <span class="font-mono text-yellow-400"
                    >${{ formatNumber(calculations.closingFees) }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-300">Assignment Fee:</span>
                  <span class="font-mono text-yellow-400"
                    >${{ formatNumber(calculations.assignmentFee) }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-300">Net to Buyer:</span>
                  <span class="font-mono text-green-400"
                    >${{ formatNumber(calculations.netToBuyer) }}</span
                  >
                </div>
                <div class="flex justify-between border-t border-gray-700 pt-3">
                  <span class="text-gray-300 font-semibold"
                    >Net Cash to Seller:</span
                  >
                  <span class="font-mono text-green-400 font-bold"
                    >${{ formatNumber(calculations.netCashToSeller) }}</span
                  >
                </div>
              </div>
            </div>

            <!-- Action Buttons Section -->
            <div class="space-y-4">
              <h4
                class="text-sm font-medium text-gray-300 uppercase tracking-wide"
              >
                Create Documents
              </h4>

              <div class="grid grid-cols-1 gap-3">
                <!-- Letter of Intent Button -->
                <button
                  @click="generateLOI"
                  :disabled="!isFormValid"
                  class="group relative w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:hover:transform-none overflow-hidden"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  ></div>
                  <div
                    class="relative flex items-center justify-center space-x-2"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>Letter of Intent</span>
                  </div>
                </button>

                <!-- SMS Template Button -->
                <button
                  @click="generateSMSTemplate"
                  :disabled="!isFormValid"
                  class="group relative w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-600 hover:to-green-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:hover:transform-none overflow-hidden"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-green-400 to-green-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  ></div>
                  <div
                    class="relative flex items-center justify-center space-x-2"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>SMS Template</span>
                  </div>
                </button>

                <!-- Email Template Button -->
                <button
                  @click="generateEmailTemplate"
                  :disabled="!isFormValid"
                  class="group relative w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:hover:transform-none overflow-hidden"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  ></div>
                  <div
                    class="relative flex items-center justify-center space-x-2"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Email Template</span>
                  </div>
                </button>
              </div>

              <!-- Helper Text -->
              <p class="text-xs text-gray-400 text-center mt-4">
                Complete property address and financial details to enable
                document creation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Components -->
    <LOIGenerator
      :is-open="showLOIModal"
      :deal-data="{ inputs, calculations: calculations }"
      @close="showLOIModal = false"
    />

    <SMSTemplateGenerator
      :is-open="showSMSModal"
      :deal-data="{ inputs, calculations: calculations }"
      @close="showSMSModal = false"
    />

    <EmailTemplateGenerator
      :is-open="showEmailModal"
      :deal-data="{ inputs, calculations: calculations }"
      @close="showEmailModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import LOIGenerator from './LOIGenerator.vue';
import SMSTemplateGenerator from './SMSTemplateGenerator.vue';
import EmailTemplateGenerator from './EmailTemplateGenerator.vue';

// Modal states
const showLOIModal = ref(false)
const showSMSModal = ref(false)
const showEmailModal = ref(false)

// Payment calculation helper - MATCHES EXCEL PMT FUNCTION
function PMT(rate, nper, pv) {
  if (rate === 0) return pv / nper;
  return (rate * pv) / (1 - Math.pow(1 + rate, -nper));
}

// Format number helper function with error handling
const formatNumber = (value) => {
  // Handle null, undefined, or non-numeric values
  if (value === null || value === undefined || isNaN(value)) {
    return '0';
  }
  
  // Convert to number if it's not already
  const numValue = Number(value);
  
  // Format with commas for thousands
  return numValue.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

// Form inputs
const inputs = ref({
  propertyAddress: null,
  agentName: null,
  sellerName: null,
  agentEmail: null,
  agentPhone: null,
  buyerName: null,
  buyerEmail: null,
  buyerPhone: null,
  purchasePrice: null,
  grossMonthlyRent: null,
  monthlyExpenses: 0,
  dscrInterestRate: null,
  dscrLTV: null,
  sellerFinanceRate: null,
  amortizationYears: 30,
  downPaymentToSeller: null,
  balloonYears: null,
  paymentType: "Interest Only",
  closingFeePercent: 4,
  llcName: "Orbius Capital Group LLC"
})

// Calculations - PROPERLY FIXED
const calculations = computed(() => {
  const purchasePrice = inputs.value.purchasePrice || 0;
  const grossMonthlyRent = inputs.value.grossMonthlyRent || 0;
  const monthlyExpenses = inputs.value.monthlyExpenses || 0;
  const dscrInterestRate = (inputs.value.dscrInterestRate || 0) / 100;
  const dscrLTV = (inputs.value.dscrLTV || 0) / 100;
  const sellerFinanceRate = (inputs.value.sellerFinanceRate || 0) / 100;
  const amortizationYears = inputs.value.amortizationYears || 30;
  const downPaymentToSeller = inputs.value.downPaymentToSeller || 0;
  const paymentType = inputs.value.paymentType || "Interest Only";
  const closingFeePercent = (inputs.value.closingFeePercent || 4) / 100;

  // Monthly NOI
  const monthlyNOI = grossMonthlyRent - monthlyExpenses;

  // DSCR loan amount
  const dscrLoanAmount = purchasePrice * dscrLTV;

  // DSCR monthly payment
  const dscrMonthlyPayment = dscrLoanAmount > 0
    ? PMT(dscrInterestRate / 12, amortizationYears * 12, dscrLoanAmount)
    : 0;

  // CRITICAL: Calculate what's left after DSCR loan
  const remainingAfterDSCR = purchasePrice - dscrLoanAmount;
  
  // The seller carry is what's left after the down payment
  // But it can't be negative!
  const sellerCarryAmount = Math.max(0, remainingAfterDSCR - downPaymentToSeller);

  // Seller carry monthly payment
  let sellerCarryPayment = 0;
  if (sellerCarryAmount > 0) {
    if (paymentType === "Interest Only") {
      sellerCarryPayment = (sellerCarryAmount * sellerFinanceRate) / 12;
    } else if (paymentType === "Principal Only") {
      sellerCarryPayment = sellerCarryAmount / (amortizationYears * 12);
    } else {
      sellerCarryPayment = PMT(
        sellerFinanceRate / 12,
        amortizationYears * 12,
        sellerCarryAmount
      );
    }
  }

  // Total monthly outflow
  const totalMonthlyOutflow = dscrMonthlyPayment + sellerCarryPayment;

  // Monthly cash flow
  const monthlyCashFlow = monthlyNOI - totalMonthlyOutflow;

  // DSCR ratio
  const dscrRatio = dscrMonthlyPayment > 0 ? monthlyNOI / dscrMonthlyPayment : 0;

  // Other calculations
  const emd = purchasePrice * 0.01;
  const closingFees = purchasePrice * closingFeePercent;
  const assignmentFee = purchasePrice * 0.03;
  const netToBuyer = dscrLoanAmount - downPaymentToSeller - closingFees - assignmentFee;
  const netCashToSeller = downPaymentToSeller;

  return {
    monthlyNOI,
    dscrLoanAmount,
    dscrMonthlyPayment,
    downPayment: downPaymentToSeller,
    sellerCarryAmount,
    sellerCarryPayment,
    totalMonthlyOutflow,
    monthlyCashFlow,
    emd,
    closingFees,
    assignmentFee,
    netToBuyer,
    netCashToSeller,
    dscrRatio,
  };
});

// Form validation
const isFormValid = computed(() => {
  return (
    inputs.value.propertyAddress &&
    inputs.value.purchasePrice > 0 &&
    inputs.value.grossMonthlyRent > 0 &&
    inputs.value.dscrInterestRate > 0 &&
    inputs.value.dscrLTV > 0 &&
    inputs.value.sellerFinanceRate > 0 &&
    inputs.value.downPaymentToSeller >= 0
  );
});

// Action functions
const generateLOI = () => {
  if (isFormValid.value) {
    showLOIModal.value = true;
  }
};

const generateSMSTemplate = () => {
  if (isFormValid.value) {
    showSMSModal.value = true;
  }
};

const generateEmailTemplate = () => {
  if (isFormValid.value) {
    showEmailModal.value = true;
  }
};
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