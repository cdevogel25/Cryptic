import {request} from 'https'
import firebase, { database } from 'firebase'
import urls from '../lib/urls.json'
import config from '../lib/config.json'

class DBException {
    constructor (message) {
        this.message = message
        this.name = 'DBException'
    }
    toString() {
        return this.name + ': "' + this.message + '"'
    }
}

class Database {
    constructor(urls, config) {
        firebase.initializeApp(config)
        this.urls = urls
        this.db = firebase.database()
    }
    async readDBsync(path) {
        var res = await new Promise((resolve, reject) => {
            this.db.ref(path).on('value', (snapshot) => {
                resolve(snapshot.val())
            })
        })
        return res
    }
    writeDB(path, payload, overwrite) {
        if(overwrite) {
            this.db.ref(path).set(payload)
        } else {
            this.db.ref(path).push().set(payload)
        }
    }
    apiRequest(reqHost, reqPath, destPath, overwrite) {
        request({
            host: reqHost,
            path: reqPath
        }, (res) => {
            var dataStr = ''
            res.on('data', (data) => {
                dataStr += data
            })
            res.on('end', () => {
                this.db.ref(destPath, JSON.parse(dataStr), overwrite)
            })
        })
    }
}

let testDB = new Database(urls, config)
