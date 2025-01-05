import express from 'express'
import State from './state.js'
import { INDEX, PUBLIC } from './frontend.js'

const PORT = 3000
const ENDPOINTS = ['umbreon', 'aaa']

const app = express()

const state = new State(ENDPOINTS)

app.post('/api/:endpoint', (req, res) => {})

app.use('/', express.static(PUBLIC))
app.get('/*', (req, res) => res.send(INDEX(state.view)))

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})
