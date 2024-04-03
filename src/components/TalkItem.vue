<template>
  <h3 v-if="talk">
    <font-awesome-icon :icon="['fas', 'microphone']" />
    {{ talk.title }}
  </h3>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useTalkStore } from '../stores/talk.store'
import type { Talk } from '@/interfaces/talk'

export default defineComponent({
  name: 'RoomItem',
  props: {
    talkId: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapState(useTalkStore, {
      getById: (store) => store.getById
    }),
    talk(): Talk | undefined {
      if (this.talkId && this.getById(this.talkId)) {
        return this.getById(this.talkId) as Talk
      } else {
        return undefined
      }
    }
  }
})
</script>
