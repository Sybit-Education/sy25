import { defineStore } from 'pinia'
import speakerService from '../services/speaker.service'
import { useLoadingStore } from './loading.store'
import type { Speaker } from '@/interfaces/speaker'

interface State {
  speakerList: Speaker[]
}

export const useSpeakerStore = defineStore('speaker', {
  state: (): State => {
    return {
      speakerList: []
    }
  },
  getters: {
    getAll: (state) => state.speakerList as Array<Speaker>,
    getById: (state) => (id: string) =>
      state.speakerList.find((item: Speaker) => item.id === id) as Speaker
  },
  actions: {
    async init(): Promise<void> {
      const loadingStore = useLoadingStore()
      loadingStore.updateLoading(true)
      speakerService.getAll().then((result) => {
        this.speakerList = result as Array<Speaker>
        loadingStore.updateLoading(false)
      })
    }
  }
})
