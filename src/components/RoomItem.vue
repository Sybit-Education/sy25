<template>
  <div>
    {{ room.name }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useRoomStore } from '../stores/room.store'
import type { Room } from '../interfaces/room'

export default defineComponent({
  name: 'RoomItem',
  props: {
    roomId: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapState(useRoomStore, {
      room: (store) => store.getById
    }),
    label(): string {
      if (this.roomId && this.getById(this.roomId)) {
        return this.getById(this.roomId)?.name as string
      } else {
        return ''
      }
    }
  }
})
</script>
