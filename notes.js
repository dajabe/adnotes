// import PocketBase from 'pocketbase'
const PocketBase = require('pocketbase/cjs')
require('cross-fetch/polyfill')

const client = new PocketBase('http://whau.haume.nz:8090')

// fetch a paginated records list

// # node notes.js one two three four five
// will result in
// args:  [ 'one', 'two', 'three', 'four', 'five' ]
const action = process.argv[2]
const category = process.argv[3]
const note = process.argv.slice(4).join(' ')

const getNotes = async () => {
  return await client.records.getList('notes', 1, 50, {
    filter: 'created >= "2022-01-01 00:00:00"',
  })
}

const sendData = {
  user: 'dr0bnbro24kif74',
  category,
  note,
}

const addNote = async (data) => {
  return await client.records.create('notes', data)
}

// alternatively you can also fetch all records at once via getFullList:
// const records = await client.records.getFullList(
//   'notes',
//   200 /* batch size */,
//   {
//     sort: '-created',
//   }
// )

// getNotes().then((res) => console.log(res))

switch (action) {
  case 'add':
    addNote(sendData)
    break
  default:
    getNotes().then((noteList) => {
      console.log('[Category] Note')
      noteList.items.forEach((note) =>
        console.log(`[${note.category}] ${note.note}`)
      )
    })
}
