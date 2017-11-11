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

var db = firebase.database()

var ref = db.ref()
ref.once('value')
	.then(function(snapshot) {
		var name = snapshot.child("name").val()
	})

setTimeout(function() {
	console.log(ref.name)
}, 3000)
