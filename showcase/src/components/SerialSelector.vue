<script setup lang="ts">
import { computed } from 'vue'
import { sampleSerials } from '../data/sampleSerials'

defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const categories = computed(() => [...new Set(sampleSerials.map((s) => s.category))])

function samplesInCategory(category: string) {
  return sampleSerials.filter((s) => s.category === category)
}

function onSelect(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  if (value) emit('update:modelValue', value)
}

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}
</script>

<template>
  <div class="serial-selector">
    <label class="field">
      <span class="field-label">Sample serial</span>
      <select @change="onSelect">
        <option value="">Choose a sample…</option>
        <optgroup v-for="category in categories" :key="category" :label="category">
          <option v-for="sample in samplesInCategory(category)" :key="sample.label" :value="sample.barcode">
            {{ sample.label }}
          </option>
        </optgroup>
      </select>
    </label>
    <label class="field">
      <span class="field-label">Barcode</span>
      <textarea
        :value="modelValue"
        rows="2"
        spellcheck="false"
        placeholder="Paste or type a barcode data string…"
        @input="onInput"
      ></textarea>
    </label>
  </div>
</template>
