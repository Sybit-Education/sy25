import type { Speaker } from '@/interfaces/speaker'
import base from './airtable.service'

const BASE_NAME = 'Referent'

const speakerService = {
  getAll() {
    return new Promise((resolve, reject) => {
      const items: Array<Speaker> = []
      base(BASE_NAME)
        .select()
        .eachPage(
          function page(partialRecords, fetchNextPage) {
            partialRecords.forEach((partialRecords) => {
              items.push({
                id: partialRecords.id,
                name: partialRecords.fields.Name as string,
                title: partialRecords.fields.Titel as string,
                image: partialRecords.fields.Photo as object
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

export default speakerService
