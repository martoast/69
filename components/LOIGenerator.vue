<!-- components/LOIGenerator.vue -->
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
      <div class="relative w-full max-w-6xl h-[95vh] bg-white rounded-2xl shadow-2xl flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-900">Letter of Intent Generator</h2>
          <div class="flex items-center space-x-3">
            <!-- Template Selection -->
            <div class="flex bg-gray-100 rounded-lg p-1">
              <button
                @click="selectedTemplate = 'promissory-note'"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  selectedTemplate === 'promissory-note' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                ]"
              >
                Promissory Note
              </button>
              <button
                @click="selectedTemplate = 'preferred-equity'"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  selectedTemplate === 'preferred-equity' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                ]"
              >
                Preferred Equity
              </button>
            </div>

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
const selectedTemplate = ref('promissory-note')
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

// Generate Promissory Note LOI (second-position lien structure)
const generatePromissoryNoteLOI = () => {
  const { inputs, calculations } = props.dealData
  
  return `Letter of Intent to Purchase:

Date: ${getCurrentDate()}
To: ${inputs.sellerName || 'Seller'}
From: ${inputs.llcName || 'Orbius Capital Group LLC'}
Property Address: ${inputs.propertyAddress}

This Letter of Intent summarizes the proposed terms by ${inputs.buyerName || 'Buyer'} (hereby "the Buyer") purchasing the property located at ${inputs.propertyAddress} (hereby "the Property"). The transaction will utilize a creative financing approach designed to provide you, ${inputs.sellerName || 'Seller'}, hereby the "Property Owner(s)", with a large immediate downpayment and long-term income on your equity, while allowing us, as the buyer, to structure the purchase in a financially efficient manner.

The closing will be facilitated by a licensed title company, escrow agent, or closing attorney (hereby "the Closing Agent"), and all funds will be disbursed at the close of escrow in accordance with mutually agreed-upon instructions contained in a definitive state approved Purchase and Sale Agreement ("PSA"). The transaction will occur in two distinct stages:

First Stage (All Cash Closing):
At the initial all-cash closing, the Buyer will bring the full purchase price in cash. The Buyer intends to obtain a DSCR loan at ${inputs.dscrLTV}% loan-to-value (LTV) to reimburse a portion of the funds following this close. The Purchase and Sale Agreement and its incorporated escrow instructions shall direct the Closing Agent to hold funds in escrow until the second leg of the transaction is completed. The close will be contingent on the Property appraising at or above the agreed-upon purchase price. The Buyer will close escrow, and the title insurer will issue a title policy insuring the Buyer's interest in the Property after this first leg, with all associated title insurance premiums and related closing costs borne by the Buyer.

Second Stage (Seller-Financing/Installment Sale):
Following the close of escrow and completion of the first leg, the immediate second leg of the transaction is opened pursuant to detailed escrow instructions in the Purchase and Sale Agreement. The Closing Agent shall disburse the Seller's agreed-upon down payment, and the balance of the Purchase Price due to the Seller will be documented by a duly executed Promissory Note secured by a Second Deed of Trust/Mortgage against the Property. The Seller will thereby hold a second-position lien immediately junior to the Buyer's primary lender.

In the event of a default, the Seller's security interest provides the legal right to foreclose and recover proceeds in accordance with their lien priority, thereby ensuring direct recourse against the Property itself. The Seller-financed portion shall still be structured as an installment sale, providing ongoing, tax-advantaged income while simultaneously reducing the Seller's immediate tax burden. The title insurer will issue a title policy insuring the Buyer's interest in the Property, subject to the Seller's recorded second lien, with all associated title insurance premiums and related closing costs borne by the Buyer.

This secured financing structure enables the Buyer to acquire the Property at retail pricing with a comparatively low capitalization rate, while remitting a substantial portion of the Purchase Price to the Seller as an immediate down payment. Concurrently, by structuring the balance as an installment sale secured by a second lien, the Seller is able to defer and potentially minimize immediate tax liabilities while maintaining the protection of a recorded security interest.

In accordance with IRS guidance for installment sales (IRS Publication 537), "income received over time through an installment sale may, under certain circumstances, be treated as ordinary income." This approach allows for recognition of gains and associated tax obligations to be spread over multiple tax years, rather than realized in a single lump sum, potentially resulting in a more favorable tax outcome.

Additionally, the Buyer will cover the full listing agent's commission, all title insurance premiums, and all customary closing costs, fees, and related expenses. This allocation ensures the Seller realizes the full benefit of the agreed-upon financial terms without incurring out-of-pocket transactional costs.

This LOI is provided solely as an outline and for the purpose of facilitating further discussion. Except as may be otherwise agreed in writing (such as confidentiality or exclusivity provisions), this LOI is non-binding. Neither Party shall be legally obligated to proceed unless and until both Parties execute a definitive State-approved PSA and related ancillary documents that fully memorialize the terms and conditions of the transaction.

Proposed Terms

1. Purchase Price:
Total purchase price: ${formatCurrency(inputs.purchasePrice)}
This is a true NET as the buyer pays all closing costs and listing agent commissions.

2. Financing Structure:
${formatCurrency(calculations.downPayment)} to be paid at COE.
${formatCurrency(calculations.sellerCarryAmount)} carried by the seller as a second position lien holder.

3. Transaction Mechanics:
Earnest Money Deposit: ${formatCurrency(calculations.emd)} To be deposited to the Title/Escrow company within 3 days after PSA is executed.

Initial Closing: At closing, the ${formatCurrency(inputs.downPaymentToSeller)} down payment is made to the Seller. This amount should also pay off the existing mortgage on the property. Additionally, Buyer will pay all reasonable closing costs associated with the sale along with the commission to the Sellers agent.

Seller Financing Agreement: Simultaneously, the Buyer executes a Promissory Note in favor of the Seller for ${formatCurrency(calculations.sellerCarryAmount)}, which is secured by a duly recorded Second Deed of Trust/Mortgage against the Property. Escrow disburses the down payment funds to the Seller at closing, and the Seller retains a secured lien interest in the Property for the financed amount. In the event of default, the Seller, as second-position lien holder, has the legal right to initiate foreclosure proceedings or otherwise enforce remedies consistent with their lien priority.

4. Seller Financing Terms:
Principal Balance: ${formatCurrency(calculations.sellerCarryAmount)}
Terms: ${inputs.sellerFinanceRate}% ${inputs.paymentType} Payments
Monthly Payments: ${formatCurrency(calculations.sellerCarryPayment)}
Balloon Payment for Remaining Balance: Any remaining balance shall be due in full no later than ${inputs.balloonYears} years from the date of closing.

The balloon payment shall be eligible for annual extensions, provided that the Buyer is unable, despite good faith efforts, to refinance the Property at or below a ${inputs.dscrLTV}% loan-to-value (LTV) ratio. Each extension shall require written notice to the Seller no less than thirty (30) days prior to the maturity date, accompanied by documentation evidencing the Buyer's refinance efforts. Any extension shall be granted in one-year increments, subject to mutual agreement and continued compliance with the terms of the equity agreement.

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

Buyer: ${inputs.llcName || 'Orbius Capital Group LLC'}
Signature: <img src="/signature.jpg" style="height: 40px; width: auto; vertical-align: middle;" alt="Signature">
Printed Name: ${inputs.buyerName || 'Mikhail Kravtsov'}
Title: Member
Date: ${getCurrentDate()}

Agent Contact Information:
Agent Email: ${inputs.agentEmail}
Agent Phone: ${inputs.agentPhone}`
}

// Generate Preferred Equity LOI
const generatePreferredEquityLOI = () => {
  const { inputs, calculations } = props.dealData
  
  return `Letter of Intent to Purchase:

Date: ${getCurrentDate()}
To: ${inputs.sellerName || 'Property Owner'}
From: ${inputs.llcName || 'Orbius Capital Group LLC'}
Property Address: ${inputs.propertyAddress}

This Letter of Intent summarizes the proposed terms by ${inputs.buyerName || 'Buyer'} (hereby "the Buyer") purchasing the property located at ${inputs.propertyAddress} (hereby "the Property"). The transaction will utilize a creative financing approach designed to provide you, ${inputs.sellerName || 'Property Owner'}, hereby the "Property Owner(s)", with a large immediate downpayment and long-term income on your equity, while allowing us, as the buyer, to structure the purchase in a financially efficient manner.

The closing will be facilitated by a licensed title company, escrow agent, or closing attorney (hereby "the Closing Agent"), and all funds will be disbursed at the close of escrow in accordance with mutually agreed-upon instructions contained in a definitive state approved Purchase and Sale Agreement ("PSA"). The transaction will occur in two distinct stages:

First Stage (All Cash Closing):
At the initial all-cash closing, the Buyer will bring the full purchase price in cash. The Buyer intends to obtain a DSCR loan at ${inputs.dscrLTV}% loan-to-value (LTV) to reimburse a portion of the funds following this close. The Purchase and Sale Agreement and its incorporated escrow instructions shall direct the Closing Agent to hold funds in escrow until the second leg of the transaction is completed. The close will be contingent on the Property appraising at or above the agreed-upon purchase price. The Buyer will close escrow, and the title insurer will issue a title policy insuring the Buyer's interest in the Property after this first leg, with all associated title insurance premiums and related closing costs borne by the Buyer.

Second Stage (Seller-Financing/Installment Sale):
Following the close of escrow and completion of the first leg, the immediate second leg of the transaction is opened pursuant to detailed escrow instructions in the Purchase and Sale Agreement. The Closing Agent shall disburse the Seller's agreed-upon down payment, and instead of recording a Deed of Trust/Mortgage and Promissory Note, the Seller's remaining equity will be secured through the Buyer's LLC operating agreement, naming the Seller as a minority equity partner. In the event of a default, this structure entitles the Seller to obtain 100% ownership of the LLC, thereby regaining full control of the Property without the need for foreclosure. The Seller-financed portion shall still be structured as an installment sale, providing ongoing, tax-advantaged income while simultaneously reducing the Seller's immediate tax burden. To further protect the Seller's financial interest in the Property, we offer a Seller Protection Clause (please see the bottom of this Section for more details). The title insurer will issue a title policy insuring the Buyer's interest in the Property after this second leg, with all associated title insurance premiums and related closing costs borne by the Buyer.

This creative structure enables the Buyer to acquire the Property at a comparatively low capitalization rate at retail pricing, while remitting a substantial portion of the Purchase Price to the Seller as an immediate down payment. Concurrently, by structuring the balance as an installment sale with seller financing, the Seller is able to defer and potentially minimize immediate tax liabilities. The Seller, thus, secures an aggressive purchase price, a significant down payment, and the potential for a reduced overall tax burden.

In accordance with guidance set forth by the Internal Revenue Service (IRS) for installment sales (see, e.g., IRS Publication 537), "income received over time through an installment sale may, under certain circumstances, be treated as ordinary income." This approach allows for the recognition of gains and the associated tax obligations to be spread over multiple tax years, rather than realized in a single lump sum, potentially resulting in a more favorable tax outcome.

Additionally, the Buyer will cover the full listing agent's commission, all title insurance premiums, all customary closing costs, fees, and related expenses. This allocation ensures the Seller realizes the full benefit of the agreed-upon financial terms without incurring out-of-pocket transactional costs.

This LOI is provided solely as an outline and for the purpose of facilitating further discussion. Except as may be otherwise agreed in writing (such as confidentiality or exclusivity provisions), this LOI is non-binding. Neither Party shall be legally obligated to proceed unless and until both Parties execute a definitive State-approved PSA and related ancillary documents that fully memorialize the terms and conditions of the transaction.

Seller Protection Clause - Operating Agreement with Default Control Provisions:
Instead of holding a second-position lien, the Seller and Buyer will enter into an LLC operating agreement (or land trust with an assignment of beneficial interest) where the Seller maintains certain minority equity interest.

The LLC or trust holds title to the property, and the Buyer operates as the primary manager/member.

The agreement includes a clause that allows the Seller to regain full control of the LLC or trust (and thus the property) if the Buyer defaults on their financial obligations (missed payments, failure to insure, etc.).

Proposed Terms

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

The balloon payment shall be eligible for annual extensions, provided that the Buyer is unable, despite good faith efforts, to refinance the Property at or below a ${inputs.dscrLTV}% loan-to-value (LTV) ratio. Each extension shall require written notice to the Seller no less than thirty (30) days prior to the maturity date, accompanied by documentation evidencing the Buyer's refinance efforts. Any extension shall be granted in one-year increments, subject to mutual agreement and continued compliance with the terms of the equity agreement.

Prepayment Option: The buyer retains the right to prepay the note without penalty.

5. Buyer Responsibilities:
• As-Is Purchase: The Property shall be conveyed in its current condition, "AS IS, WHERE IS," with all faults, and without any obligation on the Seller to perform repairs, provide credits, or make concessions.
• Due Diligence Period: The Buyer shall have a specified due diligence period to conduct inspections, review title, confirm zoning and permitting status, investigate the condition of the Property.
• Occupancy and Tenancies: If the Property is occupied by tenants, the Buyer will assume responsibility for all existing leases, rental agreements, security deposits, and landlord obligations following closing.
• Ongoing Costs: Upon closing, the Buyer shall bear sole responsibility for all ongoing carrying costs related to the Property.
• Agent Commissions: The Buyer agrees to pay any and all real estate brokerage commissions.

6. Seller Responsibilities & Disclosures:
• Full Disclosure of Material Facts
• Provision of Financial and Operational Documentation
• Accuracy and Completeness of Information
• Cooperation with Due Diligence

7. Title, Escrow, and Documentation:
All title and escrow services shall be conducted through mutually acceptable and reputable title/escrow company.

8. Closing Costs:
Closing costs, including title insurance, prorated taxes, HOA fees, and other customary expenses, will be allocated as follows: Buyer Covers All

9. Due Diligence Period and Closing Timeline:
Due Diligence Period ("DD Period"): The Buyer shall have a fifteen (15) day period commencing on the Effective Date of the Purchase and Sale Agreement.
Close of Escrow ("COE"): The Close of Escrow shall occur no later than thirty (30) days following the expiration of the DD Period.

Additional Considerations:
• Force Majeure: In the event of unforeseen circumstances (force majeure), both parties agree to consider reasonable extensions to deadlines.

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

Seller: ${inputs.sellerName || 'Property Owner'}
Signature: ___________________________________
Printed Name: __________________________________
Title: __________________________________
Date: ___________________________________

Buyer: ${inputs.llcName || 'Orbius Capital Group LLC'}
Signature: <img src="/signature.jpg" style="height: 40px; width: auto; vertical-align: middle;" alt="Signature">
Printed Name: ${inputs.buyerName || 'Mikhail Kravtsov'}
Title: Member
Date: ${getCurrentDate()}`
}

// Generate plain text LOI based on selected template
const generatePlainTextLOI = () => {
  if (selectedTemplate.value === 'preferred-equity') {
    return generatePreferredEquityLOI()
  } else {
    return generatePromissoryNoteLOI()
  }
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
  const templateType = selectedTemplate.value === 'preferred-equity' ? 'Preferred Equity Agreement' : 'Promissory Note Agreement'
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${templateType} - ${props.dealData.inputs.propertyAddress}</title>
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

// Watch for template changes to update content
watch(selectedTemplate, () => {
  if (!isEditMode.value) {
    editableContent.value = generatePlainTextLOI()
  }
})

// Initialize content when modal opens
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    editableContent.value = generatePlainTextLOI()
    isEditMode.value = false
    selectedTemplate.value = 'promissory-note' // Default to promissory note
  }
})
</script>