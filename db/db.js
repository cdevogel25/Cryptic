import { PublicClient } from 'gdax'
import { request } from 'https'
import firebase, { database } from 'firebase'
import urls from '../lib/urls.json'
import config from '../lib/config.json'
import { DBException } from '../lib/exceptions.js'
import 'ws'
import {clearInterval} from 'timers'
import {EventEmitter} from 'events'

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

class Listener extends EventEmitter {
    constructor(productIDs) {
        super()
        this.productIDs = productIDs
        this.websocketURI = urls.ws-uri
        this.connect()
    }
    connect() {
        if(this.socket) {
            clearInterval(this.pinger)
            this.socket.close()
        }
        this.socket = new WebsocketClient(this.websocketURI)
        this.socket.on('message', this.onMessage.bind(this))
        this.socket.on('open', this.onOpen.bind(this))
        this.socket.on('close', this.onClose.bind(this))
        this.socket.on('error', this.onError.bind(this))
    }
    disconnect() {
        clearInterval(this.pinger)

        if(!this.socket) {
            throw new Error('could not disconnect, not connected')
        }
        this.socket.close()
        this.socket = null
    }
    onOpen() {
        this.emit('open')
        this.socket.send(JSON.stringify({
            type: 'subscribe',
            product_ids: this.productIDs
        }))
        this.pinger = setInterval(() => {
            if(this.socket) {
                this.socket.ping('keepalive')
            }
        }, 30000)
    }
    onClose() {
        clearInterval(this.pinger)
        this.socket = null
        this.emit('close')
    }
    onMessage(data) {
        this.emit('message', JSON.parse(data))
    }
    onError(err) {
        if(!err) {
            return
        }
        if(err.message === 'unexpected server response (429)') {
            throw new Error('too fast. throttling')
        }
        this.emit('error', err)
    }
}

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