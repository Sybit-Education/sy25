<template>
  <span v-if="talk">
    <div class="flex flex-col">
      <font-awesome-icon v-if="!talk.isPause" :icon="['fas', 'microphone-lines']" class="flex-0 p-text-secondary text-2xl pt-1" />
      <font-awesome-icon v-else :icon="['fas', 'mug-saucer']" class="flex-0 p-text-secondary text-2xl pt-1" />
      <span class="mx-2 flex-1">
        {{ talk.title }}
      </span>
    </div>
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
