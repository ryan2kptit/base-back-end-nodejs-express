"use strict";

const AccessService = require("../services/access.service");
const { OK, CREATED, SuccessResponse }  = require('../common/response/success.response')
class AccessController {

  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessService.login(req.body)
    }).send(res)
  }

  signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    const newShop = await AccessService.signUp({ name, email, password });
    return new CREATED({
      message: 'Registed OK',
      metadata: newShop,
      options: {
        limit: 10
      }
    }).send(res)
  };
}

module.exports = new AccessController();
