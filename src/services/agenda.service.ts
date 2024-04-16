import type { Agenda } from '@/interfaces/agenda'
import base from './airtable.service'

const BASE_NAME = 'Agenda'

const agendaService = {
  getAll() {
    return new Promise((resolve, reject) => {
      const items: Array<Agenda> = []
      base(BASE_NAME)
        .select({
          sort: [{ field: 'Datum', direction: 'asc' }]
        })
        .eachPage(
          function page(partialRecords, fetchNextPage) {
            partialRecords.forEach((partialRecords) => {
              items.push({
                id: partialRecords.id,
                date: new Date(partialRecords.fields.Datum as string),
                endTime: undefined,
                isActive: false,
                isBeforeNow: false,
                duration: partialRecords.fields.Dauer as number,
                room: partialRecords.fields.Raum as string,
                talk: partialRecords.fields.Vortrag as string
              })
            })
            fetchNextPage()
          },
          function done(err) {
            if (err) {
              console.log(err)
              reject(err)
            }
            resolve(items)
          }
        )
    })
  }
}

export default agendaService
