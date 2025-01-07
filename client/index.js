import config from './config.js'
import { info } from './utils.js'

const ping = async () => {
    try {
        await fetch(`${config.domain}/api/${config.name}`, { method: 'POST' })
        info('ping success')
    } catch (e) {
        info('ping failure')
        console.log(e)
    }
}

await ping()
setInterval(ping, config.frequency * 1000)
