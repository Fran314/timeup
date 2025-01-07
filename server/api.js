import express from 'express'
import { info } from './utils.js'

export default state => {
    const router = express.Router()
    router.post('/:endpoint', (req, res) => {
        info(`recieved ping for endpoint ${req.params.endpoint}`)
        if (state.ping(req.params.endpoint)) {
            info(`success ping for endpoint ${req.params.endpoint}`)
            res.sendStatus(200)
        } else {
            info(`failed ping for endpoint ${req.params.endpoint}`)
            res.sendStatus(400)
        }
    })

    return router
}
