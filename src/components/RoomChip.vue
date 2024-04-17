<template>
  <Chip v-if="room" class="pl-0 pr-3" :style="{ backgroundColor: room.color }">
    <span class="ml-2 font-medium" :style="{ color: textColor }"> {{ room.name }}</span>
  </Chip>
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
    textColor(): string | undefined {
      if (this.room && this.room.color) {
        let hex = this.room.color.substring(1, 7)

        // Convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
        }
        // By this point, it should be 6 characters
        if (hex.length !== 6) {
          throw new Error('Invalid HEX color.')
        }

        let r = parseInt(hex.slice(0, 2), 16),
          g = parseInt(hex.slice(2, 4), 16),
          b = parseInt(hex.slice(4, 6), 16)

        // Return light or dark class based on contrast calculation
        return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'var(--gray-900)' : 'var(--text-color)'
      } else {
        return undefined
      }
    }
  }
})
</script>
