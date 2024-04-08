<template>
  <router-link :to="`/talk/${agenda.talk}`">
    <Card class="agenda-item m-1">
      <template #title>
        <TalkItem :talkId="agenda.talk[0]"></TalkItem>
      </template>
      <template #subtitle><SpeakerItem :talkId="agenda.talk[0]"></SpeakerItem></template>
      <template #content>
        <span v-if="agenda.duration" class="p-text-secondary">
          <font-awesome-icon :icon="['fas', 'clock']" />
          {{ agenda.duration / 60 }} min.
        </span>
        <RoomItem :roomId="agenda.room[0]"></RoomItem>
      </template>
    </Card>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RoomItem from './RoomItem.vue'
import TalkItem from './TalkItem.vue'
import SpeakerItem from './SpeakerItem.vue'

export default defineComponent({
  name: 'AgendaItem',
  components: { RoomItem, TalkItem, SpeakerItem },
  props: {
    agenda: {
      type: Object,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.agenda-item {
  background-color: rgba($color: #18181b, $alpha: 0.8);
}
a {
  text-decoration: none;
}
</style>
