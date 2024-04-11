import { defineStore } from 'pinia'
import agendaService from '../services/agenda.service'
import { useLoadingStore } from './loading.store'
import type { Agenda } from '@/interfaces/agenda'

interface State {
  agendaList: Agenda[]
  groupedList: Record<string, Record<string, Agenda[]>> | undefined
}

export const useAgendaStore = defineStore('agenda', {
  state: (): State => {
    return {
      agendaList: [],
      groupedList: undefined
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

        this.agendaList.sort((a, b) => {
          return a.date.getTime() - b.date.getTime()
        })

        // Zweistufiges Gruppieren nach Datum und dann nach Uhrzeit
        type GroupedAgenda = Record<string, Record<string, Agenda[]>>
        const groupedAgenda: GroupedAgenda = {}
        this.agendaList.forEach((agenda) => {
          const dateKey = agenda.date.toDateString()
          const timeKey = agenda.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          if (!groupedAgenda[dateKey]) {
            groupedAgenda[dateKey] = {}
          }
          if (!groupedAgenda[dateKey][timeKey]) {
            groupedAgenda[dateKey][timeKey] = []
          }
          groupedAgenda[dateKey][timeKey].push(agenda)
        })

        this.groupedList = groupedAgenda

        loadingStore.updateLoading(false)
      })
    }
  }
})
