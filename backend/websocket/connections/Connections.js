class Connections {
    constructor() {
        this.connections = []
    }

    getConnections() {
        return this.connections
    }

    saveConnection(id, conn) {
        this.connections.push({
            id,
            conn
        })
    }

    removeConnection(id) {
        this.connections.filter(connection => connection.id !== id)
    }
}

class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new Connections()
        }
    }


    getInstance() {
        return Singleton.instance;
    }
}


module.exports = Singleton