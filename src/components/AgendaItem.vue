<template>
  <router-link :to="`/talk/${agenda.talk}`">
    <div>
      <p>{{ agenda.date }}, {{ agenda.duration }}</p>
      <p>{{ agenda.talk[0] }}</p>
      <p><RoomItem :roomId="agenda.room[0]"></RoomItem></p>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RoomItem from './RoomItem.vue'

export default defineComponent({
  name: 'AgendaItem',
  components: { RoomItem },
  props: {
    agenda: {
      type: Object,
      required: true
    }
  }
})
</script>
