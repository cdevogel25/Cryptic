import {EventEmitter} from 'events'
import {clearInterval} from 'timers'
import {ListenerException} from '../lib/exceptions.js'
import urls from '../lib/urls.json'
import Websocket from 'ws'

class Listener extends EventEmitter {
    constructor(productIDs=["ETH-USD"]) {
        super()
        this.productIDs = this.checkIDs(productIDs)
        this.websocketURI = urls.ws_uri
        this.connect()

    }
    checkIDs(productIDs) {
        if(Array.isArray(productIDs)) {
            return productIDs
        }

        return [productIDs]
    }

    connect() {
        if(this.socket) {
            clearInterval(this.pinger)
            this.socket.close()
        }
        this.socket = new Websocket(this.websocketURI)
        this.socket.on('error', this.onError.bind(this))
        this.socket.on('open', this.onOpen.bind(this))
        this.socket.on('close', this.onClose.bind(this))
        this.socket.on('message', this.onMessage.bind(this))
    }

    disconnect() {
        clearInterval(this.pinger)
        if(!this.socket) {
            throw new ListenerException('Not Connected, could not disconnect') 
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

    // TODO: Modify so this function also sends info to database every second.
    onMessage(data) {
        var payload = JSON.parse(data)
        if(payload.reason === 'filled') {
            this.emit('message', payload)
        }
    }

    onError(err) {
        if(!err) {
            return
        }
        if(err.message === 'unexpected server response (429)') {
            throw new ListenerException('You are requesting too fast and being throttled.')
        }
        this.emit('error', err)
    }
}

export {Listener}