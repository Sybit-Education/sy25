<template>
  <span v-if="talk">
    <span>{{ speaker?.name }}</span>  
    <span v-if="speaker?.title">, {{ speaker.title }}</span>
  </span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useTalkStore } from '../stores/talk.store'
import { useSpeakerStore } from '../stores/speaker.store'
import type { Talk } from '@/interfaces/talk'
import type { Speaker } from '@/interfaces/speaker'

export default defineComponent({
  name: 'SpeakerItem',
  props: {
    talkId: {
      type: String,
      required: false,
      default: undefined
    }
  },
  computed: {
    ...mapState(useTalkStore, {
      getTalkById: (store) => store.getById
    }),
    ...mapState(useSpeakerStore, {
      getSpeakerById: (store) => store.getById
    }),
    talk(): Talk | undefined {
      if (this.talkId && this.getTalkById(this.talkId)) {
        return this.getTalkById(this.talkId) as Talk
      } else {
        return undefined
      }
    },
    speaker(): Speaker | undefined {
      if (this.talk && this.talk.speaker) {
        return this.getSpeakerById(this.talk.speaker[0])
      } else {
        return undefined
      }
    }
  }
})
</script>
