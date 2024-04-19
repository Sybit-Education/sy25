<template>
  <span v-for="speaker in speakers" v-bind:key="speaker.id" class="text-sm mr-5 speaker">
    <Avatar v-if="showAvatar" :image="avatarSpeaker(speaker)" class="mr-2 speaker__avatar" shape="circle" size="xlarge"/>
    <span class="speaker__name"><font-awesome-icon v-if="!showAvatar" :icon="['far', 'user']" class="mr-1" /> {{ speaker?.name }}</span>
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
    showAvatar: {
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
  },
  methods: {
    avatarSpeaker(speaker: Speaker): string | undefined {
      if (speaker.image && this.showAvatar) {
        const url = speaker.image[0].thumbnails.large.url
        console.log(url)
        return url
      } else {
        return undefined
      }
      
    }
  }
})
</script>
<style lang="scss">
.speaker {

  &__avatar {
    flex-direction: row;
    align-self: center;
    display: block;

    animation: neonAnim 1s alternate-reverse infinite;
  }

  &__name {
    flex-direction: row;
    align-self: center;
    white-space: nowrap;
    line-height: 1.75rem;
  }
}
</style>
