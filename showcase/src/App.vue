<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import SerialSelector from './components/SerialSelector.vue'
import ResultSummary from './components/ResultSummary.vue'
import ComparisonTable from './components/ComparisonTable.vue'
import GeneratorTab from './components/GeneratorTab.vue'
import { parseWithTs } from './services/tsParser'
import { parseWithCSharp } from './services/csharpApi'
import { diffRows } from './lib/diff'
import { sampleSerials } from './data/sampleSerials'
import type { ParseOutcome } from './types'

const activeTab = ref<'compare' | 'generate'>('compare')

const barcode = ref(sampleSerials[0]?.barcode ?? '')

function useGeneratedBarcode(generated: string) {
  barcode.value = generated
  activeTab.value = 'compare'
}

const tsOutcome = computed<ParseOutcome | null>(() => (barcode.value ? parseWithTs(barcode.value) : null))

const csharpOutcome = ref<ParseOutcome | null>(null)
const csharpLoading = ref(false)

// Guards against a slower earlier request resolving after a faster later one.
let requestSeq = 0
watch(
  barcode,
  async (value) => {
    const seq = ++requestSeq
    if (!value) {
      csharpOutcome.value = null
      csharpLoading.value = false
      return
    }
    csharpLoading.value = true
    try {
      const outcome = await parseWithCSharp(value)
      if (seq === requestSeq) csharpOutcome.value = outcome
    } catch (error) {
      if (seq === requestSeq) {
        csharpOutcome.value = {
          success: false,
          error: {
            message: error instanceof Error ? error.message : 'Request to the C# API failed',
            position: 0,
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

function outcomeData(outcome: ParseOutcome | null): unknown {
  if (!outcome) return {}
  return outcome.success ? outcome.result : outcome.error
}

const rows = computed(() => diffRows(outcomeData(tsOutcome.value), outcomeData(csharpOutcome.value)))
</script>

<template>
  <main class="app">
    <header>
      <h1>ISBT 128 Parser Showcase</h1>
      <p class="subtitle">Compare the TypeScript and C# parser implementations for the same barcode.</p>
    </header>

    <div class="tab-switcher" role="tablist">
      <button type="button" :class="{ active: activeTab === 'compare' }" @click="activeTab = 'compare'">
        Compare
      </button>
      <button type="button" :class="{ active: activeTab === 'generate' }" @click="activeTab = 'generate'">
        Generate
      </button>
    </div>

    <template v-if="activeTab === 'compare'">
      <SerialSelector v-model="barcode" />

      <div class="summaries">
        <ResultSummary label="TypeScript" :outcome="tsOutcome" />
        <ResultSummary label="C#" :outcome="csharpOutcome" :loading="csharpLoading" />
      </div>

      <ComparisonTable
        :rows="rows"
        left-label="TypeScript"
        right-label="C#"
        :left-raw="outcomeData(tsOutcome)"
        :right-raw="outcomeData(csharpOutcome)"
      />
    </template>

    <GeneratorTab v-else @use-in-compare="useGeneratedBarcode" />
  </main>
</template>
