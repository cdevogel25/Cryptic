import {EventEmitter} from 'events'
import 'ws'
import { clearImmediate, clearInterval } from 'timers';

class WebsocketClient extends EventEmitter {
    constructor(
        productIDs,
        websocketURI='wss://ws-feed.gdax.com',
        auth=null,
        {heartbeat = false, channels = null} = {}) {
            super()
            this.productIDs = productIDs // FIXME: maybe a determineProductIDs is a good idea?
            this.websocketURI = websocketURI
            // TODO: figure out auth later
            // make sure that when auth is provided, it has auth.secret, auth.key, auth.passphrase
            this.channels = channels
            this.auth = auth || {}
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
                throw new Error('Could not disconnect (not connected)')
            }
            this.socket.close()
            this.socket = null
        }

        onOpen() {
            this.emit('open')

            const subscribeMessage = {
                type: 'subscribe',
                product_ids: this.productIDs
            }

            if(this.channels) {
                subscribeMessage.channels = this.channels
            }

            // TODO: fix once auth is done
            /*
            if(this.auth.secret) {
                let sig = signRequest(
                    this.auth,
                    'GET',
                    this.channels ? '/users/self/verify' : '/users/self'
                )
                Object.assign(subscribeMessage, sig)
            }*/
            this.socket.send(JSON.stringify(subscribeMessage))
            if(this.heartbeat) {
                const heartbeatMessage = {
                    type: 'heartbeat',
                    on: true
                }
                this.socket.send(JSON.stringify(heartbeatMessage))
            } else {
                this.pinger = setInterval(() => {
                    if(this.socket) {
                        this.socket.ping('keepalive')
                    }
                }, 30000)
            }
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

            if (err.message === 'unexpected server response (429)') {
                throw new Error(
                    'You are conecting too fast and are being throttled! Make sure you subscribe to multiple books on one connection.'
                )
            }

            this.emit('error', err)
        }
}

export {WebsocketClient}