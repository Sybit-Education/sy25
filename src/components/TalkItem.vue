<template>
  <span v-if="talk">
    <font-awesome-icon v-if="!talk.isPause" :icon="['fas', 'microphone-lines']" />
    <font-awesome-icon v-else :icon="['fas', 'mug-saucer']" />
    <span class="mx-2">{{ talk.title }}</span>
  </span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useTalkStore } from '../stores/talk.store'
import type { Talk } from '@/interfaces/talk'

export default defineComponent({
  name: 'TalkItem',
  props: {
    talkId: {
      type: String,
      required: false,
      default: undefined
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
