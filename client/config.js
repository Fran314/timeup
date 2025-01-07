import fs from 'fs'
import path from 'path'
import { parse } from 'yaml'

const CONFIG_PATH = process.env.__DEV__
    ? path.join(import.meta.dirname, 'config.yml')
    : '/config.yml'
const config = parse(fs.readFileSync(CONFIG_PATH, 'utf8'))

config.frequency = config.frequency || 30

export default config
