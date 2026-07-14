<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { buildWithTs } from '../services/tsBuilder'
import { buildWithCSharp } from '../services/csharpApi'
import type { BuildUdiInput } from '@iccbba/isbt128-parser'
import type { BuildOutcome } from '../types'

const emit = defineEmits<{ 'use-in-compare': [barcode: string] }>()

// Prefilled with the ST-017 §4.3.1 worked example so the tab isn't empty on load.
const diFin = ref('A9997')
const diFpc = ref('XYZ100')
const diPdc = ref('T0479')
const dinFin = ref('A9999')
const dinYear = ref('17')
const dinSeq = ref('123456')
const dinFlagAuto = ref(true)
const dinFlag = ref('00')
const productDivisions = ref('000012')
const expirationDate = ref('2019-01-31')
const productionDate = ref('')
const lotNumber = ref('')

const buildInput = computed<BuildUdiInput>(() => ({
  DI: {
    facilityIdentificationNumberOfProcessor: diFin.value,
    facilityDefinedProductCode: diFpc.value,
    productDescriptionCode: diPdc.value,
  },
  PI: {
    donationIdentificationNumber: {
      facilityIdentificationNumber: dinFin.value,
      year: dinYear.value,
      sequenceNumber: dinSeq.value,
      flagCharacters: dinFlagAuto.value ? undefined : dinFlag.value,
    },
    productDivisions: productDivisions.value,
    expirationDate: expirationDate.value ? new Date(expirationDate.value) : undefined,
    productionDate: productionDate.value ? new Date(productionDate.value) : undefined,
    lotNumber: lotNumber.value || undefined,
  },
}))

const tsOutcome = computed<BuildOutcome>(() => buildWithTs(buildInput.value))

const csharpOutcome = ref<BuildOutcome | null>(null)
const csharpLoading = ref(false)

// Guards against a slower earlier request resolving after a faster later one.
let requestSeq = 0
watch(
  buildInput,
  async (input) => {
    const seq = ++requestSeq
    csharpLoading.value = true
    try {
      const outcome = await buildWithCSharp(input)
      if (seq === requestSeq) csharpOutcome.value = outcome
    } catch (error) {
      if (seq === requestSeq) {
        csharpOutcome.value = {
          success: false,
          error: {
            message: error instanceof Error ? error.message : 'Request to the C# API failed',
            field: '',
            reason: 'REQUEST_FAILED',
          },
        }
      }
    } finally {
      if (seq === requestSeq) csharpLoading.value = false
    }
  },
  { immediate: true },
)

function useInCompare() {
  if (tsOutcome.value.success) emit('use-in-compare', tsOutcome.value.barcode)
}
</script>

<template>
  <div class="generator">
    <div class="generator-form">
      <fieldset class="field-group">
        <legend>Device Identifier (DI — DS034)</legend>
        <label class="field">
          <span class="field-label">Facility ID Number of Processor (5)</span>
          <input v-model="diFin" maxlength="5" spellcheck="false" />
        </label>
        <label class="field">
          <span class="field-label">Facility Defined Product Code (6)</span>
          <input v-model="diFpc" maxlength="6" spellcheck="false" />
        </label>
        <label class="field">
          <span class="field-label">Product Description Code (5)</span>
          <input v-model="diPdc" maxlength="5" spellcheck="false" />
        </label>
      </fieldset>

      <fieldset class="field-group">
        <legend>Donation Identification Number (PI — DS001, required)</legend>
        <label class="field">
          <span class="field-label">Facility ID Number (5)</span>
          <input v-model="dinFin" maxlength="5" spellcheck="false" />
        </label>
        <label class="field">
          <span class="field-label">Year (2)</span>
          <input v-model="dinYear" maxlength="2" spellcheck="false" />
        </label>
        <label class="field">
          <span class="field-label">Sequence Number (6)</span>
          <input v-model="dinSeq" maxlength="6" spellcheck="false" />
        </label>
        <label class="field checkbox-field">
          <input v-model="dinFlagAuto" type="checkbox" />
          <span class="field-label">Auto-compute Type 3 checksum flag</span>
        </label>
        <label v-if="!dinFlagAuto" class="field">
          <span class="field-label">Flag Characters (2)</span>
          <input v-model="dinFlag" maxlength="2" spellcheck="false" />
        </label>
      </fieldset>

      <fieldset class="field-group">
        <legend>Other Production Identifiers (PI)</legend>
        <label class="field">
          <span class="field-label">Product Divisions (6, required)</span>
          <input v-model="productDivisions" maxlength="6" spellcheck="false" />
        </label>
        <label class="field">
          <span class="field-label">Expiration Date</span>
          <input v-model="expirationDate" type="date" />
        </label>
        <label class="field">
          <span class="field-label">Production Date</span>
          <input v-model="productionDate" type="date" />
        </label>
        <label class="field">
          <span class="field-label">Lot Number (18)</span>
          <input v-model="lotNumber" maxlength="18" spellcheck="false" />
        </label>
      </fieldset>
    </div>

    <div class="summaries">
      <div class="result-summary" :class="{ ok: tsOutcome.success, error: !tsOutcome.success }">
        <h3>TypeScript</h3>
        <template v-if="tsOutcome.success">
          <p class="status status-ok">Built</p>
          <code class="generated-barcode">{{ tsOutcome.barcode }}</code>
        </template>
        <template v-else>
          <p class="status status-error">Invalid</p>
          <p class="error-detail">
            {{ tsOutcome.error.message }} <span class="reason">[{{ tsOutcome.error.reason }}]</span>
          </p>
        </template>
      </div>

      <div
        class="result-summary"
        :class="{ ok: csharpOutcome?.success, error: csharpOutcome && !csharpOutcome.success }"
      >
        <h3>C#</h3>
        <p v-if="csharpLoading" class="status">Building…</p>
        <template v-else-if="csharpOutcome?.success">
          <p class="status status-ok">Built</p>
          <code class="generated-barcode">{{ csharpOutcome.barcode }}</code>
        </template>
        <template v-else-if="csharpOutcome">
          <p class="status status-error">Invalid</p>
          <p class="error-detail">
            {{ csharpOutcome.error.message }} <span class="reason">[{{ csharpOutcome.error.reason }}]</span>
          </p>
        </template>
      </div>
    </div>

    <button type="button" class="use-in-compare" :disabled="!tsOutcome.success" @click="useInCompare">
      Use this barcode in the Compare tab
    </button>
  </div>
</template>
