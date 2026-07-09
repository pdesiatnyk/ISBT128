<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DiffRow, FlatValue } from '../lib/diff'

const props = defineProps<{
  rows: DiffRow[]
  leftLabel: string
  rightLabel: string
  leftRaw: unknown
  rightRaw: unknown
}>()

const showOnlyMismatches = ref(false)
const showRawJson = ref(false)

const visibleRows = computed(() => (showOnlyMismatches.value ? props.rows.filter((r) => !r.match) : props.rows))
const mismatchCount = computed(() => props.rows.filter((r) => !r.match).length)

function formatValue(value: FlatValue): string {
  return value === null ? '—' : String(value)
}
</script>

<template>
  <div class="comparison">
    <div class="comparison-toolbar">
      <span class="mismatch-count" :class="{ 'has-mismatches': mismatchCount > 0 }">
        {{ mismatchCount === 0 ? 'All fields match' : `${mismatchCount} field${mismatchCount === 1 ? '' : 's'} differ` }}
      </span>
      <label><input v-model="showOnlyMismatches" type="checkbox" /> Show only mismatches</label>
      <label><input v-model="showRawJson" type="checkbox" /> Show raw JSON</label>
    </div>

    <table class="diff-table">
      <thead>
        <tr>
          <th>Field</th>
          <th>Section</th>
          <th>Explanation</th>
          <th>{{ leftLabel }}</th>
          <th>{{ rightLabel }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in visibleRows" :key="row.path" :class="{ mismatch: !row.match }">
          <td class="path">{{ row.path }}</td>
          <td class="section">{{ row.section }}</td>
          <td class="explanation">{{ row.explanation }}</td>
          <td>{{ formatValue(row.left) }}</td>
          <td>{{ formatValue(row.right) }}</td>
        </tr>
        <tr v-if="visibleRows.length === 0">
          <td colspan="5" class="empty">No fields to compare yet.</td>
        </tr>
      </tbody>
    </table>

    <div v-if="showRawJson" class="raw-json-panels">
      <pre class="raw-json"><code>{{ JSON.stringify(leftRaw, null, 2) }}</code></pre>
      <pre class="raw-json"><code>{{ JSON.stringify(rightRaw, null, 2) }}</code></pre>
    </div>
  </div>
</template>
