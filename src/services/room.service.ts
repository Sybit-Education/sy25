import type { Room } from '@/interfaces/room'
import base from './airtable.service'

const BASE_NAME = 'Raum'

const roomService = {
  getAll() {
    return new Promise((resolve, reject) => {
      const items: Array<Room> = []
      base(BASE_NAME)
        .select()
        .eachPage(
          function page(partialRecords, fetchNextPage) {
            partialRecords.forEach((partialRecords) => {
              items.push({
                id: partialRecords.id,
                name: partialRecords.fields.Name as string,
                image: partialRecords.fields.Bild as string,
                notes: partialRecords.fields.Notes as string,
                color: partialRecords.fields.Farbe as string
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

export default roomService
