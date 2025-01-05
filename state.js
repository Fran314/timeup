export default class State {
    #endpoints

    constructor(endpoints) {
        const NOW = new Date()

        this.endpoints = {}
        for (const endpoint of endpoints) {
            this.endpoints[endpoint] = {
                name: endpoint,
                lastState: false,
                lastPing: NOW,
            }
        }
    }

    get view() {
        console.log(Object.values(this.endpoints))
        return { endpoints: Object.values(this.endpoints) }
    }
}
