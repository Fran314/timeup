import fs from 'fs'
import path from 'path'
import { parse } from 'yaml'

const CONFIG_PATH = process.env.__DEV__
    ? path.join(import.meta.dirname, 'config.yml')
    : '/config.yml'
const config = parse(fs.readFileSync(CONFIG_PATH, 'utf8'))

config.port = config.port || 5104

config.endpoints = config.endpoints || {}
for (const endpoint in config.endpoints) {
    config.endpoints[endpoint].pw_hash =
        config.endpoints[endpoint].pw_hash.toLowerCase()
}

export default config
