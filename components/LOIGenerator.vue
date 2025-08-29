<template>
    <!-- Modal Overlay -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @keydown.esc="closeModal"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/90 backdrop-blur-sm"
          @click="closeModal"
        ></div>
  
        <!-- Modal Content -->
        <div class="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900">Letter of Intent</h2>
            <div class="flex items-center space-x-3">
              <!-- Edit Mode Toggle -->
              <button
                @click="toggleEditMode"
                class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                :class="isEditMode ? 'bg-yellow-500 text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
              >
                {{ isEditMode ? 'Preview Mode' : 'Edit Mode' }}
              </button>
              
              <!-- Print/Download Button -->
              <button
                @click="printLOI"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Print/Download PDF
              </button>
              
              <!-- Close Button -->
              <button
                @click="closeModal"
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
  
          <!-- Content Area -->
          <div class="flex-1 overflow-y-auto">
            <!-- Edit Mode -->
            <div v-if="isEditMode" class="p-6">
              <textarea
                v-model="editableContent"
                class="w-full h-full min-h-[600px] p-4 border border-gray-300 rounded-lg font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Edit your Letter of Intent here..."
              ></textarea>
            </div>
  
            <!-- Preview Mode -->
            <div v-else class="p-8">
              <div id="loi-content" class="max-w-4xl mx-auto bg-white" v-html="formattedContent"></div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  
  // Props
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    },
    dealData: {
      type: Object,
      required: true
    }
  })
  
  // Emits
  const emit = defineEmits(['close'])
  
  // Component state
  const isEditMode = ref(false)
  const editableContent = ref('')
  
  // Toggle edit mode
  const toggleEditMode = () => {
    if (!isEditMode.value) {
      // Switching to edit mode - convert HTML to plain text
      editableContent.value = generatePlainTextLOI()
    }
    isEditMode.value = !isEditMode.value
  }
  
  // Close modal
  const closeModal = () => {
    emit('close')
  }
  
  // Generate current date
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }
  
  // Format numbers
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }
  
  // Generate plain text LOI content
  const generatePlainTextLOI = () => {
    const { inputs, calculations } = props.dealData
    
    return `Letter of Intent to Purchase:
  
  Date: ${getCurrentDate()}
  To: ${inputs.sellerName || 'Seller'}
  From: ${inputs.llcName || 'UR Creative Services LLC'}
  Property Address: ${inputs.propertyAddress}
  
  This Letter of Intent summarizes the proposed terms by ${inputs.llcName || 'UR Creative Services LLC'} (hereby "the Buyer") purchasing the property located at ${inputs.propertyAddress} (hereby "the Property"). The transaction will utilize a creative financing approach designed to provide you, Seller, hereby the "Property Owner(s)", with a large immediate downpayment and long-term income on your equity, while allowing us, as the buyer, to structure the purchase in a financially efficient manner.
  
  The closing will be facilitated by a licensed title company, escrow agent, or closing attorney (hereby "the Closing Agent"), and all funds will be disbursed at the close of escrow in accordance with mutually agreed-upon instructions contained in a definitive state approved Purchase and Sale Agreement ("PSA"). The transaction will occur in two distinct stages:
  
  First Stage (All Cash Closing):
  At the initial all-cash closing, the Buyer will bring the full purchase price in cash. The Buyer intends to obtain a DSCR loan at ${inputs.dscrLTV}% loan-to-value (LTV) to reimburse a portion of the funds following this close. The Purchase and Sale Agreement and its incorporated escrow instructions shall direct the Closing Agent to hold funds in escrow until the second leg of the transaction is completed. The close will be contingent on the Property appraising at or above the agreed-upon purchase price. The Buyer will close escrow, and the title insurer will issue a title policy insuring the Buyer's interest in the Property after this first leg, with all associated title insurance premiums and related closing costs borne by the Buyer.
  
  Second Stage (Seller-Financing/Installment Sale):
  Following the close of escrow and completion of the first leg, the immediate second leg of the transaction is opened pursuant to detailed escrow instructions in the Purchase and Sale Agreement. The Closing Agent shall disburse the Seller's agreed-upon down payment, and instead of recording a Deed of Trust/Mortgage and Promissory Note, the Seller's remaining equity will be secured through the Buyer's LLC operating agreement, naming the Seller as a minority equity partner. In the event of a default, this structure entitles the Seller to obtain 100% ownership of the LLC, thereby regaining full control of the Property without the need for foreclosure. The Seller-financed portion shall still be structured as an installment sale, providing ongoing, tax-advantaged income while simultaneously reducing the Seller's immediate tax burden.
  
  Proposed Terms:
  
  1. Purchase Price:
  Total purchase price: ${formatCurrency(inputs.purchasePrice)}
  This is a true NET as the buyer pays all closing costs and listing agent commissions.
  
  2. Financing Structure:
  ${formatCurrency(calculations.downPayment)} to be paid at COE.
  ${formatCurrency(calculations.sellerCarryAmount)} carried by the seller as a minority equity partner.
  
  3. Transaction Mechanics:
  Earnest Money Deposit: ${formatCurrency(calculations.emd)} To be deposited to the Title/Escrow company within 3 days after PSA is executed.
  
  Initial Closing: At closing, the ${formatCurrency(inputs.downPaymentToSeller)} down payment is made to the Seller. This amount should also pay off the existing mortgage on the property. Additionally, Buyer will pay all reasonable closing costs associated with the sale along with the commission to the Sellers agent.
  
  Seller-Equity Agreement: Simultaneously, the Buyer's LLC operating agreement is executed to reflect the Seller's minority equity interest corresponding to the ${formatCurrency(calculations.sellerCarryAmount)}. Escrow returns this portion to the Buyer post-closing, while the Seller retains a secured interest in the LLC for that amount, with rights to assume full ownership of the LLC in the event of default.
  
  4. Seller-Equity Terms:
  Principal Balance: ${formatCurrency(calculations.sellerCarryAmount)}
  Terms: ${inputs.sellerFinanceRate}% ${inputs.paymentType} Payments
  Monthly Payments: ${formatCurrency(calculations.sellerCarryPayment)}
  Balloon Payment for Remaining Balance: Any remaining balance shall be due in full no later than ${inputs.balloonYears} years from the date of closing.
  
  The balloon payment shall be eligible for annual extensions, provided that the Buyer is unable, despite good faith efforts, to refinance the Property at or below a 75% loan-to-value (LTV) ratio. Each extension shall require written notice to the Seller no less than thirty (30) days prior to the maturity date, accompanied by documentation evidencing the Buyer's refinance efforts. Any extension shall be granted in one-year increments, subject to mutual agreement and continued compliance with the terms of the equity agreement.
  
  Prepayment Option: The buyer retains the right to prepay the note without penalty.
  
  5. Closing Costs:
  Closing costs, including title insurance, prorated taxes, HOA fees, and other customary expenses, will be allocated as follows: Buyer Covers All
  
  6. Due Diligence Period and Closing Timeline:
  Due Diligence Period: The Buyer shall have a fifteen (15) day period commencing on the Effective Date of the Purchase and Sale Agreement to conduct its due diligence investigations, inspections, and review of all property-related documentation.
  
  Close of Escrow: The Close of Escrow shall occur on a date mutually agreed upon by the Parties, but in no event later than thirty (30) days following the expiration of the DD Period, unless otherwise extended by mutual written agreement.
  
  Next Steps:
  If you find these terms acceptable, we will proceed with drafting a detailed Purchase and Sale Agreement (PSA).
  
  This LOI is non-binding, except for any confidentiality and exclusivity clauses detailed below.
  
  Confidentiality:
  The terms and details of this LOI are confidential and may not be shared with third parties without mutual written consent.
  
  Exclusivity:
  By signing this LOI, you agree to grant the buyer exclusivity for 5 days, refraining from soliciting or accepting other offers during this period to allow completion of due diligence and finalization of documents.
  
  Governing Law:
  This LOI and subsequent agreements will be governed by the laws of FL
  
  Acknowledgment and Agreement:
  
  Seller: ${inputs.sellerName || 'Seller'}
  Signature: ___________________________________
  Printed Name: __________________________________
  Title: __________________________________
  Date: ___________________________________
  
  Buyer: ${inputs.llcName || 'UR Creative Services LLC'}
  Signature: ___________________________________
  Printed Name: Mikhail Kravtsov
  Title: Member
  Date: ${getCurrentDate()}
  
  Agent Contact Information:
  Agent Email: ${inputs.agentEmail}
  Agent Phone: ${inputs.agentPhone}`
  }
  
  // Generate formatted HTML content
  const formattedContent = computed(() => {
    if (isEditMode.value) return ''
    
    const content = editableContent.value || generatePlainTextLOI()
    
    return `
      <style>
        @media print {
          body { margin: 0; }
          .no-print { display: none !important; }
          #loi-content { 
            font-size: 12pt; 
            line-height: 1.4; 
            max-width: none;
            padding: 0.5in;
          }
        }
        
        #loi-content {
          font-family: 'Times New Roman', Times, serif;
          line-height: 1.6;
          color: #000;
          background: white;
        }
        
        #loi-content h1, #loi-content h2, #loi-content h3 {
          color: #000;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        
        #loi-content h1 {
          font-size: 18pt;
          text-align: center;
          border-bottom: 2px solid #000;
          padding-bottom: 10px;
        }
        
        #loi-content p {
          margin-bottom: 12px;
          text-align: justify;
        }
        
        #loi-content .signature-section {
          margin-top: 40px;
          page-break-inside: avoid;
        }
      </style>
      
      <div style="white-space: pre-line; font-family: 'Times New Roman', Times, serif; line-height: 1.6; color: #000;">
        ${content.replace(/\n/g, '<br>')}
      </div>
    `
  })
  
  // Print function
  const printLOI = () => {
    const printWindow = window.open('', '_blank')
    const content = document.getElementById('loi-content').outerHTML
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Letter of Intent - ${props.dealData.inputs.propertyAddress}</title>
          <style>
            @page { 
              margin: 0.5in; 
              size: letter;
            }
            
            body { 
              margin: 0; 
              font-family: 'Times New Roman', Times, serif;
              font-size: 12pt;
              line-height: 1.4;
              color: #000;
            }
            
            h1 {
              font-size: 16pt;
              text-align: center;
              margin-bottom: 20px;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
            }
            
            p { 
              margin-bottom: 12px; 
              text-align: justify;
            }
            
            .signature-section {
              margin-top: 30px;
              page-break-inside: avoid;
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `)
    
    printWindow.document.close()
    printWindow.focus()
    
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
  }
  
  // Initialize content when modal opens
  watch(() => props.isOpen, (newValue) => {
    if (newValue) {
      editableContent.value = generatePlainTextLOI()
      isEditMode.value = false
    }
  })
  </script>