class DBException {
    constructor(message) {
        this.message = message
        this.name = 'DBException'
    }
    toString() {
        return this.name + ': "' + this.message + '"'
    }
}

class ListenerException {
    constructor(message) {
        this.message = message
        this.name = 'ListenerException'
    }
    toString() {
        return this.name + ': "' + this.message + '"'
    }
}
export { DBException }