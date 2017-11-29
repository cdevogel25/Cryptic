import { request } from 'https'
import firebase, { database } from 'firebase'
import urls from '../lib/urls.json'
import config from '../lib/config.json'
import { DBException } from '../lib/exceptions.js'

class Database {
    constructor(urls, config, minAllowance) {
        firebase.initializeApp(config)
        this.urls = urls
        this.db = firebase.database()
        this.minAllowance = minAllowance
        this.noUpdate = false
        this.initTime = Date.now()
    }
    async checkAllowance() {
        var response = await this.readDB('/allowance/remaining').catch((error) => {
            console.log(error)
            return null
        })
        if(response != null) {
            return response
        }
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
    /* TODO: allow specification of location within db for each request
             maybe set so each reqPath is the same as the DB path?
    */
    apiRequest(reqHost, reqPath, overwrite) {
        this.readDB('allowance/remaining').then((allowance) => {
            // if noUpdate, check time and set to false or whatever
            if(this.noUpdate) {
                if((Date.now() - this.initTime) >= 3600000) {
                    this.noUpdate = false
                    this.initTime = Date.now()
                }
            }
            // if allowance remaining is less than minAllowance, set noUpdate to true and continue
            if((allowance <= this.minAllowance)) {
                this.noUpdate = true
                throw new DBException('allowance too low')
            } else if(!this.noUpdate) {
                request({
                    host: reqHost,
                    path: reqPath
                }, (res) => {
                    var dataStr = ''
                    res.on('data', (data) => {
                        dataStr += data
                    })
                    res.on('end', () => {
                        var payload = JSON.parse(dataStr)
                        payload.result.timestamp = Date.now()
                        this.writeDB(reqPath, payload.result, overwrite)
                        this.writeDB('/allowance', payload.allowance, true)
                    })
                }).end()
            }
        }).catch((error) => {
            console.log(error.toString())
        })
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

/*
TODO: decide what data needs to stay and when
overwrite rules:
    price: false,
    orderbook: true
    orders: true
    summary: true
*/

const DB = new Database(urls, config, 2000000)
export { DB }