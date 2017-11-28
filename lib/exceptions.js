class DBException {
    constructor(message) {
        this.message = message
        this.name = 'DBException'
    }
    toString() {
        return this.name + ': "' + this.message + '"'
    }
}

export { DBException }