import express from 'express'
import State from './state.js'
import ssr from './ssr.js'
import api from './api.js'

const PORT = 3000
const ENDPOINTS = ['umbreon', 'aaa']

const app = express()
const state = new State(ENDPOINTS)

app.use('/api', api(state))
app.use('/', ssr(state))

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})
