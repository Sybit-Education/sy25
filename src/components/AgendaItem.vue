<template>
  <router-link :to="`/talk/${agenda.talk}`">
    <Card class="agenda-item m-1">
      <template #title>
        <TalkItem :talkId="agenda.talk[0]"></TalkItem>
      </template>
      <template #subtitle><SpeakerItem :talkId="agenda.talk[0]"></SpeakerItem></template>
      <template #content>
        <div class="flex flex-col xl:flex-row xl:items-start gap-4">
          <div class="flex-3">
            <RoomItem v-if="agenda.room" :roomId="agenda.room[0]"></RoomItem>
          </div>
          <div v-if="agenda.duration" class="p-text-secondary flex-1">
            <font-awesome-icon :icon="['fas', 'clock']" />
            {{ agenda.duration / 60 }} min.
          </div>
        </div>
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
  background-color: rgba($color: #27272c, $alpha: 0.8);
}
a {
  text-decoration: none;
}
</style>
