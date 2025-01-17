import express from 'express'
import config from './config.js'
import State from './state.js'
import ssr from './ssr.js'
import api from './api.js'
import { info } from './utils.js'

const app = express()
const state = new State(config)

app.use('/api', api(state))
app.use('/', ssr(state))

app.listen(config.port, () => {
    info(`Listening at http://localhost:${config.port}`)
})
