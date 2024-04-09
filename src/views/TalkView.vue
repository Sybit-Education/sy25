<template>
  <ProgressOverlay v-if="showLoadingSpinner" :enabled="showLoadingSpinner" />
  <div v-else>
    <div v-if="talk">
      <router-link :to="`/`">
        <Button class="mr-3" severity="secondary">
          <font-awesome-icon :icon="['fas', 'chevron-left']" class="mr-1" />
          Übersicht
        </Button>
      </router-link>
      <Card class="talk-item m-1">
        <template #title>
          <TalkItem :talkId="talkId"></TalkItem>
        </template>
        <template #subtitle><SpeakerItem :talkId="talkId"></SpeakerItem></template>
        <template #content> {{ talk.description }}</template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { useLoadingStore } from '../stores/loading.store'
import { useTalkStore } from '@/stores/talk.store'
import { defineComponent } from 'vue'
import SpeakerItem from '@/components/SpeakerItem.vue'

export default defineComponent({
  name: 'TalkView',
  components: { SpeakerItem },

  props: {
    talkId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(useTalkStore, {
      talkById: (state) => state.getById
    }),
    ...mapState(useLoadingStore, {
      showLoadingSpinner: (store) => store.showLoadingSpinner as boolean
    }),
    talk() {
      return this.talkById(this.talkId)
    }
  }
})
</script>
