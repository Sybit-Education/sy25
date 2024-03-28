import { defineStore } from 'pinia'
import agendaService from '../services/agenda.service'
import { useLoadingStore } from './loading.store'
import type { Agenda } from '@/interfaces/agenda'

interface State {
  agendaList: Agenda[]
}

export const useAgendaStore = defineStore('agenda', {
  state: (): State => {
    return {
      agendaList: []
    }
  },
  getters: {
    getAll: (state) => state.agendaList as Array<Agenda>,
    getById: (state) => (id: string) =>
      state.agendaList.find((agenda: Agenda) => agenda.id === id) as Agenda
  },
  actions: {
    async init(): Promise<void> {
      const loadingStore = useLoadingStore()
      loadingStore.updateLoading(true)
      agendaService.getAll().then((result) => {
        this.agendaList = result as Array<Agenda>
        loadingStore.updateLoading(false)
      })
    }
  }
})
