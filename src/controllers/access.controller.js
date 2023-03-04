'use strict'

const AccessService = require("../services/access.service");

class AccessController {

    signUp = async ( req, res, next) => {
        try {
            console.log('req.body :>> ', req.body);
            const { name, email, password} = req.body
            const newShop = await AccessService.signUp({name, email, password});
            return res.status(201).json(newShop)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AccessController()