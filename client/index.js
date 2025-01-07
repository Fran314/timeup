import config from './config.js'

const ping = async () => {
    try {
        await fetch(`${config.domain}/api/${config.name}`, { method: 'POST' })
    } catch (e) {
        console.log(e)
    }
}

await ping()
setInterval(ping, config.frequency * 1000)
