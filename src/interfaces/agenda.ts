export interface Agenda {
  id: string
  date: Date
  endTime: Date | undefined
  duration: number
  room: string
  talk: string
  isActive: boolean
  isBeforeNow: boolean
}
