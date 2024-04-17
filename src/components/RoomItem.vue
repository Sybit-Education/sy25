<template>
  <Card v-if="room">
    <template #title>
      <font-awesome-icon :icon="['fas', 'map-location-dot']" />
      {{ room.name }}
    </template>
    <template #subtitle></template>
    <template #content>
      <markdown-text class="room__notes" :text="room.notes" />
    </template>
  </Card>
  <img v-if="room.image" :src="room.image" alt="Raum" class="room__map" />
      <img src="/img/stadthalle-header.png" alt="Raum" class="room__image" />  
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useRoomStore } from '../stores/room.store'
import type { Room } from '@/interfaces/room'

export default defineComponent({
  name: 'RoomItem',
  props: {
    roomId: {
      type: String,
      required: false,
      default: undefined
    }
  },
  computed: {
    ...mapState(useRoomStore, {
      getById: (store) => store.getById
    }),
    room(): Room | undefined {
      if (this.roomId && this.getById(this.roomId)) {
        return this.getById(this.roomId) as Room
      } else {
        return undefined
      }
    },
  }
})
</script>
<style lang="scss">

.room__notes {
  margin-bottom: 1rem;
}
.room__map {
  width: 100%;
  margin-top: 0.5rem;
}
.room__image {
  width: 100%;
  margin-top: 1rem;
  border-radius: 0.5rem;
  filter: brightness(0.5);
}
</style>