'use strict'
const { asyncHandler } = require('../../auth/checkAuth')
const express = require('express')
const productController = require('../../controllers/product.controller')
const { authentication } = require('../../auth/auth-utils')
const router = express.Router()

router.use(authentication);

router.post('', asyncHandler(productController.createProduct))


module.exports = router