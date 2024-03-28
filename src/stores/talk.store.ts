import { defineStore } from 'pinia'
import talkService from '../services/talk.service'
import { useLoadingStore } from './loading.store'
import type { Talk } from '@/interfaces/talk'

interface State {
  talkList: Talk[]
}

export const useTalkStore = defineStore('talk', {
  state: (): State => {
    return {
      talkList: []
    }
  },
  getters: {
    getAll: (state) => state.talkList as Array<Talk>,
    getById: (state) => (id: string) => state.talkList.find((talk: Talk) => talk.id === id) as Talk
  },
  actions: {
    async init(): Promise<void> {
      const loadingStore = useLoadingStore()
      loadingStore.updateLoading(true)
      talkService.getAll().then((result) => {
        this.talkList = result as Array<Talk>
        loadingStore.updateLoading(false)
      })
    }
  }
})
