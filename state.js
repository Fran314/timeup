const CHECK_FREQUENCY = 1000 * 60 * 2 // 2 minutes
// const CHECK_FREQUENCY = 1000 * 5 // 5 seconds

const typeCalculator = date => {
    const WEEK_LENGTH = 1000 * 60 * 60 * 24 * 7

    const elapsedTime = (new Date() - date) / WEEK_LENGTH

    if (elapsedTime <= 1) {
        return 'recent'
    } else if (elapsedTime <= 2) {
        return 'oldish'
    } else {
        return 'old'
    }
}

const formatDate = date => {
    const OPTIONS = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        // second: 'numeric',
    }
    return new Intl.DateTimeFormat('it-IT', OPTIONS).format(date)
}

export default class State {
    #endpoints

    constructor(endpoints) {
        const NOW = new Date()

        this.endpoints = {}
        for (const endpoint in endpoints) {
            this.endpoints[endpoint] = {
                name: endpoint,
                lastState: false,
                downSince: NOW,
                ping: NOW - 1000 * 60 * 3,
                outages: Array(5),
            }
        }

        setInterval(this.tick.bind(this), CHECK_FREQUENCY)
    }

    ping(endpoint) {
        if (!(endpoint in this.endpoints)) {
            return false
        }

        this.endpoints[endpoint].ping = new Date()
        return true
    }

    tick() {
        const now = new Date()

        for (const endpoint in this.endpoints) {
            const elapsedSinceLastPing = now - this.endpoints[endpoint].ping
            const isUp = elapsedSinceLastPing < CHECK_FREQUENCY
            if (isUp && !this.endpoints[endpoint].lastState) {
                this.endpoints[endpoint].outages.unshift({
                    from: this.endpoints[endpoint].downSince,
                    to: this.endpoints[endpoint].ping,
                })
                this.endpoints[endpoint].outages.length = 5
                this.endpoints[endpoint].lastState = true
            }
            if (!isUp && this.endpoints[endpoint].lastState) {
                this.endpoints[endpoint].downSince =
                    this.endpoints[endpoint].ping
                this.endpoints[endpoint].lastState = false
            }
        }
    }

    get view() {
        return {
            endpoints: Object.values(this.endpoints).map(endpoint => {
                return {
                    name: endpoint.name,
                    state: endpoint.lastState ? 'up' : 'down',
                    verboseState: endpoint.lastState
                        ? 'Up'
                        : `Down since ${formatDate(endpoint.downSince)}`,
                    outages: endpoint.outages.map(outage => {
                        return {
                            text: `${formatDate(outage.from)} to ${formatDate(outage.to)}`,
                            type: typeCalculator(outage.to),
                        }
                    }),
                }
            }),
        }
    }
}
