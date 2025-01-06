import fs from 'fs'
import path from 'path'
import Handlebars from 'handlebars'
import express from 'express'

const INDEX = Handlebars.compile(
    fs
        .readFileSync(path.join(import.meta.dirname, 'templates', 'index.html'))
        .toString(),
)
const PUBLIC = path.join(import.meta.dirname, 'public')

export default state => {
    const router = express.Router()
    router.use('/', express.static(PUBLIC))
    router.get('/*', (req, res) => res.send(INDEX(state.view)))

    return router
}
