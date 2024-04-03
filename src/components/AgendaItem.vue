<template>
  <router-link :to="`/talk/${agenda.talk}`">
    <div>
      <TalkItem :talkId="agenda.talk[0]"></TalkItem>
      <p v-if="agenda.duration" class="p-text-secondary">
        Dauer:
        {{ agenda.duration / 60 }} min.
      </p>
      <RoomItem :roomId="agenda.room[0]"></RoomItem>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RoomItem from './RoomItem.vue'
import TalkItem from './TalkItem.vue'

export default defineComponent({
  name: 'AgendaItem',
  components: { RoomItem, TalkItem },
  props: {
    agenda: {
      type: Object,
      required: true
    }
  }
})
</script>
