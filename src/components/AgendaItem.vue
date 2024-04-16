<template>
  <div>
    <a v-if="agenda.isActive" name="active-agenda" ref="active-agenda" />
    <router-link :to="`/talk/${agenda.talk}/${agenda.id}`">
      <Card class="agenda-item m-1" :class="statusClass" :style="`min-height: ${agenda.duration/15}px`">
        <template #title>
          <div class="flex flex-col">
            <TalkItem :talkId="agenda.talk[0]" class="flex-1"></TalkItem>
            <font-awesome-icon
              v-if="agenda.isActive"
              :icon="['fas', 'bolt']"
              class="live-bolt flex-0"
            />
          </div>
        </template>
        <template #subtitle><SpeakerItem :talkId="agenda.talk[0]"></SpeakerItem></template>
        <template #content>
          <div class="flex flex-col">
            <div class="flex-1 flex flex-col xl:flex-row xl:items-start gap-4">
              <div class="flex-1">
                <RoomItem v-if="agenda.room" :roomId="agenda.room[0]"></RoomItem>
              </div>
              <div v-if="agenda.duration" class="p-text-secondary flex-0 mx-3">
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
  </div>
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
    statusClass() {
      if (this.agenda.isActive) {
        return 'live'
      } else if (this.agenda.isBeforeNow) {
        return 'before-now'
      } else {
        return ''
      }
    }
  }
})
</script>

<style lang="scss">
.agenda-item {
  text-shadow: 0 0 15px var(--primary-color); /* Glow-Effekt mit text-shadow */
  background-color: rgba($color: #27272c, $alpha: 0.8);
}
a {
  text-decoration: none;
}

.live-bolt {
  color: rgb(255, 204, 0);
  font-size: 1.5rem;
  margin-left: 0.5rem;
}

.agenda-item {
  transition: background-color 0.3s;
}
.live {
  background-color: rgba($color: #b51783, $alpha: 0.7);
}
.before-now {
  background-color: rgba($color: #191919, $alpha: 0.7);
  text-shadow: none;
  .p-card-body, .p-card {
    color: #666;
  }
}
</style>
