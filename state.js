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
        for (const endpoint of endpoints) {
            this.endpoints[endpoint] = {
                name: endpoint,
                lastState: true,
                lastPing: NOW,
                outages: [
                    {
                        from: NOW - 1000 * 60 * 60 * 24 * 3,
                        to: NOW - 1000 * 60 * 60 * 24 * 2,
                    },
                    {
                        from: NOW - 1000 * 60 * 60 * 24 * 12,
                        to: NOW - 1000 * 60 * 60 * 24 * 9,
                    },
                    {
                        from: NOW - 1000 * 60 * 60 * 24 * 19,
                        to: NOW - 1000 * 60 * 60 * 24 * 18,
                    },
                ],
            }
        }
    }

    get view() {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            // second: 'numeric',
            // hour12: false,
            // timeZone: 'America/Los_Angeles',
        }
        return {
            endpoints: Object.values(this.endpoints).map(endpoint => {
                return {
                    name: endpoint.name,
                    state: endpoint.lastState ? 'up' : 'down',
                    verboseState: endpoint.lastState
                        ? 'Up'
                        : `Down since ${formatDate(endpoint.lastPing)}`,
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
