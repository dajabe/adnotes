// import PocketBase from 'pocketbase'
const PocketBase = require('pocketbase/cjs')
require('cross-fetch/polyfill')

const client = new PocketBase('http://whau.haume.nz:8090')

// fetch a paginated records list

const resultList = async () => {
  return await client.records.getList('notes', 1, 50, {
    filter: 'created >= "2022-01-01 00:00:00"',
  })
}

// alternatively you can also fetch all records at once via getFullList:
// const records = await client.records.getFullList(
//   'notes',
//   200 /* batch size */,
//   {
//     sort: '-created',
//   }
// )

resultList().then((res) => console.log(res))
