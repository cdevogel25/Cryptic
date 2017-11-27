import {request} from 'https'
import firebase, { database } from 'firebase'
import dataFrame from '../api_ref/example.json'

var config = {
	apiKey: "AIzaSyBOO6VOLFovome29KGVwpP1r1HijNbYbX4",
  authDomain: "crypt-ic.firebaseapp.com",
  databaseURL: "https://crypt-ic.firebaseio.com",
  projectId: "crypt-ic",
  storageBucket: "crypt-ic.appspot.com",
  messagingSenderId: "59440889225"
}

firebase.initializeApp(config)
let db = firebase.database()

class DBException {
  constructor(message) {
    this.message = message
    this.name = 'dbException'
  }
  toString() {
    return this.name + ': "' + this.message + '"'
  }
}

class Database {
  constructor() {
    // does nothing
  }
  readDb(path) {
    db.ref(path).on('value', (snapshot) => {
      console.log(snapshot.val())
    })
  }
  overWriteDB(path, payload) {
    db.ref(path).set(payload)
  }
  writeDB(path, payload) {
    db.ref(path).push().set(payload)
  }
  update(data) {
    return data
  }
}

let newDB = new Database()

// request({
//   host: "api.cryptowat.ch",
//   path: '/markets/gdax/ethusd/summary'
// }, (res) => {
//   var dataStr = ''
//   res.on('data', (data) => {
//     dataStr += data
//     console.log(dataStr)
//   })
//   res.on('end', () => {
//     newDB.writeDB(undefined, JSON.parse(dataStr))
//     console.log('done!')
//   })
// }).end()

function apiRequest(reqHost, reqPath) {
  request({
    host: reqHost,
    path: reqPath
  }, (res) => {
    var dataStr = ''
    res.on('data', (data) => {
      dataStr += data
    })
    res.on('end', () => {
      newDB.writeDB(undefined, JSON.parse(dataStr))
      console.log('done!')
    })
  }).end()
}

newDB.readDb()
