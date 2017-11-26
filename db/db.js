import firebase from 'firebase'

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

class dbException {
  constructor(message) {
    this.message = message
    this.name = 'dbException'
  }
  toString() {
    return this.name + ': "' + this.message + '"'
  }
}

class database {
  constructor() {
  }
  readDb(path) {
    db.ref(path).on('value', (data) => {
      console.log(data.val())
    })
  }
  writeDb(path, payload) {
    this.db.ref(path).set(payload)
  }
}

let dataB = new database()
console.log(dataB.readDb())

export {database}

