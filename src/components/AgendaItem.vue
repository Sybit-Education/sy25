<template>
  <router-link :to="`/talk/${agenda.talk}`">
    <Card class="agenda-item m-1" :class="statusClass">
      <template #title>
        <TalkItem :talkId="agenda.talk[0]"></TalkItem>

        <font-awesome-icon v-if="isActiveTalk" :icon="['fas', 'bolt']" class="live-bolt" />
      </template>
      <template #subtitle><SpeakerItem :talkId="agenda.talk[0]"></SpeakerItem></template>
      <template #content>
        <div class="flex flex-col">
          <div class="flex-1 flex flex-col xl:flex-row xl:items-start gap-4">
            <div class="flex-3">
              <RoomItem v-if="agenda.room" :roomId="agenda.room[0]"></RoomItem>
            </div>
            <div v-if="agenda.duration" class="p-text-secondary flex-1">
              <font-awesome-icon :icon="['fas', 'clock']" />
              {{ agenda.duration / 60 }} min.
            </div>
          </div>

          <div class="flex-0 p-text-secondary">
            <font-awesome-icon :icon="['fas', 'angle-right']" />
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
import type { Agenda } from '../interfaces/agenda'

export default defineComponent({
  name: 'AgendaItem',
  components: { RoomItem, TalkItem, SpeakerItem },
  props: {
    agenda: {
      type: Object as () => Agenda,
      required: true
    }
  },
  computed: {
    isActiveTalk() {
      const currentDate = new Date()
      if (
        currentDate.getTime() > this.agenda.date.getTime() &&
        currentDate.getTime() < this.agenda.date.getTime() + this.agenda.duration * 60 * 1000
      ) {
        console.log('isActiveTalk', this.agenda)
        return true
      } else {
        return false
      }
    },
    isBeforeNow() {
      const currentDate = new Date()
      if (currentDate.getTime() < this.agenda.date.getTime()) {
        return true
      } else {
        return false
      }
    },
    statusClass() {
      if (this.isActiveTalk) {
        return 'bg-primary'
      } else if (this.isBeforeNow) {
        return 'bg-secondary'
      } else {
        return ''
      }
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

.live-bolt {
  color: #ffcc00;
  font-size: 1.5rem;
  margin-left: 0.5rem;
}
</style>
