import { defineStore } from 'pinia'
import agendaService from '../services/agenda.service'
import { useLoadingStore } from './loading.store'
import type { Agenda } from '@/interfaces/agenda'

interface State {
  agendaList: Agenda[]
  hasActiveAgendaItem: boolean
  autoReloadInterval: number | undefined
  groupedList: Record<string, Record<string, Agenda[]>> | undefined
}

export const useAgendaStore = defineStore('agenda', {
  state: (): State => {
    return {
      agendaList: [],
      hasActiveAgendaItem: false,
      autoReloadInterval: undefined,
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
 
      this.loadItems()
      this.autoReloadInterval = setInterval(this.updateActiveAgendaItems, 1000) // Alle 10 sec aktualisieren
    },
    loadItems(): void {
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
          agenda.endTime = new Date(agenda.date.getTime() + agenda.duration * 1000)
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
    },
    updateActiveAgendaItems() {
      console.log('updateActiveAgendaItems');
      
      const currentDate = new Date()

      this.hasActiveAgendaItem = false
      this.agendaList.forEach((agenda: Agenda) => {
        const endTime = new Date(agenda.date.getTime() + agenda.duration * 1000)
        if (
          currentDate.getTime() > agenda.date.getTime() &&
          currentDate.getTime() < endTime.getTime()
        ) {
          agenda.isActive = true
          this.hasActiveAgendaItem = true
        } else {
          agenda.isActive = false
        }

        agenda.isBeforeNow = currentDate.getTime() > endTime.getTime()
      })
    },
  }
})
