import { defineStore } from 'pinia'
import roomService from '../services/room.service'
import { useLoadingStore } from './loading.store'
import type { Room } from '@/interfaces/room'

interface State {
  roomList: Room[]
}

export const useRoomStore = defineStore('room', {
  state: (): State => {
    return {
      roomList: []
    }
  },
  getters: {
    getAll: (state) => state.roomList as Array<Room>,
    getById: (state) => (id: string) => state.roomList.find((room: Room) => room.id === id) as Room
  },
  actions: {
    async init(): Promise<void> {
      const loadingStore = useLoadingStore()
      loadingStore.updateLoading(true)
      roomService.getAll().then((result) => {
        this.roomList = result as Array<Room>
        loadingStore.updateLoading(false)
      })
    }
  }
})
