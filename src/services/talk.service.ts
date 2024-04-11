import type { Talk } from '@/interfaces/talk'
import base from './airtable.service'

const BASE_NAME = 'Vortrag'

const agendaService = {
  getAll() {
    return new Promise((resolve, reject) => {
      const items: Array<Talk> = []
      base(BASE_NAME)
        .select()
        .eachPage(
          function page(partialRecords, fetchNextPage) {
            partialRecords.forEach((partialRecords) => {
              items.push({
                id: partialRecords.id,
                title: partialRecords.fields.Titel as string,
                isPause: partialRecords.fields.Pause as boolean,
                speaker: partialRecords.fields.Referent as string[],
                description: partialRecords.fields.Beschreibung as string,
                tag: partialRecords.fields.Tag as string
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
