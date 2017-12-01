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
    constructor(config) {
        firebase.initializeApp(config)
        this.db = firebase.database()
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
    async debugRead(path) {
        var response = await this.readDB(path).catch((error) => {
            console.log(error)
            return null
        })
        if(response != null) {
            console.log(response)
        }
    }
}

class ETHHandler extends Database {
    constructor(dbConfig) {
        super(dbConfig)
        this.client = new PublicClient(config.types.eth.usd)
    }
    tickerRequest() {
        this.client.getProductTicker().then(data => {
            this.writeDB('/price', data, false)
        })
    }
}

const ETH = new ETHHandler(config.firebase)
ETH.tickerRequest()