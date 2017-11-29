import { PublicClient } from 'gdax'
import { request } from 'https'
import firebase, { database } from 'firebase'
import urls from '../lib/urls.json'
import config from '../lib/config.json'
import { DBException } from '../lib/exceptions.js'

/*
TODO: decide what data needs to stay and when
overwrite rules:
    price: false,
    orderbook: true
    orders: true
    summary: true
*/

/* TODO: rewrite Database using gdax-node library
    currently: building for public api, eventually for private api
*/

class Database {
    constructor(config, type) {
        firebase.initializeApp(config)
        this.client = new PublicClient(type)
        this.db = firebase.database()
        this.initTime = Date.now()
    }
    readDB(path) {
        return new Promise((resolve, reject) => {
            this.db.ref(path).on('value', (snapshot) => {
                if(snapshot.val() === null) {
                    reject(new DBException('received null data'))
                } else {
                    resolve(snapshot.val())
                }
            })
        })
    }
    writeDB(path, payload, overwrite) {
        if(overwrite) {
            this.db.ref(path).set(payload)
        } else {
            this.db.ref(path).push().set(payload)
        }
    }
    async apiRequest(overwrite) {
        this.client.getProductTicker().then((data) => {
            console.log(data)
        })
    }
}

const DB = new Database(config.firebase, config.types.eth.usd)