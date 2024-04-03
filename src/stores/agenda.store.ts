import { defineStore } from 'pinia'
import agendaService from '../services/agenda.service'
import { useLoadingStore } from './loading.store'
import type { Agenda } from '@/interfaces/agenda'

interface State {
  agendaList: Agenda[]
  groupedList: [
    {
      date: Date | undefined
      agenda: Map<string, Agenda[]> | undefined
    }
  ]
}

export const useAgendaStore = defineStore('agenda', {
  state: (): State => {
    return {
      agendaList: [],
      groupedList: [{ date: undefined, agenda: undefined }]
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

        const groups = this.agendaList.reduce((groups, agenda: Agenda) => {
          const date = agenda.date.toISOString() as string
          if (!groups[date]) {
            groups[date] = []
          }
          groups[date].push(agenda)
          return groups
        }, {}) as Map<string, Agenda[]>

        // Edit: to add it in the array format instead
        const groupArrays = Object.keys(groups).map((date) => {
          return {
            date: Date.parse(date),
            agenda: groups[date]
          }
        })
        this.groupedList = groupArrays

        loadingStore.updateLoading(false)
      })
    }
  }
})
