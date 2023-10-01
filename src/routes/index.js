'use strict'

const express = require('express')
const { apiKey, permission } = require('../auth/checkAuth')
const router = express.Router()

// check apiKey
router.use(apiKey)
// check permission

// router.use(permission('0000'))


router.use('/api/v1', require('./access/index'))
router.use('/api/v1/products', require('./product/index'))



module.exports = router