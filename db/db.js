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

let db = {
  db: firebase.database(),
  read_db: (path) => {
    this.db.ref(path).on('value', (data) => {
      return data
    })
  },
  write_db: (path, payload) => {
    // will overwrite any data at this location!!
    this.db.ref(path).set(payload)
  }
}

export {db}
