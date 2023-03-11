'use strict'
const { asyncHandler } = require('../../auth/checkAuth')
const express = require('express')
const accessController = require('../../controllers/access.controller')
const router = express.Router()

router.post('/shops/sign-up', asyncHandler(accessController.signUp))

module.exports = router