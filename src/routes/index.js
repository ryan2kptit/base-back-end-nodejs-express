'use strict'

const express = require('express')
const router = express.Router()


router.use('api/v1', require('./access/index'))
// router.get('/', (req, res, next) => {
//     const strCompress = 'Ayo nigga'
//     return res.status(200).json({
//         message: "Hello and goodbye",
//         metadata: strCompress.repeat(100000)
//     })
// })

module.exports = router