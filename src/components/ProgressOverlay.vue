<template>
  <div v-if="enabled" class="card flex justify-center justify-middle" style="height: 1000vh">
    <ProgressSpinner
      style="width: 50px; height: 50px; color: var(--primary-color)"
      strokeWidth="8"
      class="fill-surface-0 dark:fill-surface-800"
      aria-label="Loading ..."
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProgressOverlay',
  props: {
    enabled: {
      type: Boolean,
      required: true
    }
  }
})
</script>
