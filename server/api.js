import express from 'express'

export default state => {
    const router = express.Router()
    router.post('/:endpoint', (req, res) => {
        if (state.ping(req.params.endpoint)) {
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    })

    return router
}
