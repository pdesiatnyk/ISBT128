<script setup lang="ts">
import type { ParseOutcome } from '../types'

defineProps<{
  label: string
  outcome: ParseOutcome | null
  loading?: boolean
}>()
</script>

<template>
  <div class="result-summary" :class="{ ok: outcome?.success, error: outcome && !outcome.success }">
    <h3>{{ label }}</h3>
    <p v-if="loading" class="status">Parsing…</p>
    <p v-else-if="!outcome" class="status">—</p>
    <p v-else-if="outcome.success" class="status status-ok">Valid</p>
    <template v-else>
      <p class="status status-error">Invalid</p>
      <p class="error-detail">
        {{ outcome.error.message }} <span class="reason">[{{ outcome.error.reason }}]</span>
      </p>
    </template>
  </div>
</template>
