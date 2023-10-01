"use strict";

const  ProductFactory  = require("../services/product.service");
const { SuccessResponse } = require("../common/response/success.response");
const { Types } = require("mongoose");
class ProductController {
  createProduct = async (req, res, next) => {
    const { product_type } = req.body;
    const body = {
        ...req.body,
        product_shop: Types.ObjectId(req.keyStore.user)
    }
    new SuccessResponse({
      message: "Create new Product success",
      metadata: await ProductFactory.createProduct(product_type, body),
    }).send(res);
  };
}

module.exports = new ProductController();