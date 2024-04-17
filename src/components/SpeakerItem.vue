<template>
  <span v-for="speaker in speakers" v-bind:key="speaker.id" class="mr-5 speaker">
    <span><font-awesome-icon :icon="['far', 'user']" /> {{ speaker?.name }}</span>
    <span v-if="showTitle && speaker?.title">, {{ speaker.title }}</span>
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
    },
    showTitle: {
      type: Boolean,
      default: false
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
    speakers(): Speaker[] | undefined {
      if (this.talk && this.talk.speaker) {
        const speakerList: Array<Speaker> = []
        for (let index = 0; index < this.talk.speaker.length; index++) {
          const speakerId = this.talk.speaker[index]
          speakerList.push(this.getSpeakerById(speakerId))
        }

        return speakerList
      } else {
        return undefined
      }
    }
  }
})
</script>
<style lang="scss">
.speaker {
  white-space: nowrap;
  line-height: 1.75rem;
}
</style>
