'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require("./key-token.service")
const { createTokenPair } = require("../auth/auth-utils")
const { getInfoData } = require("../utils")
const { BadRequestError, AuthFailureError } = require("../common/response/error.response")
const { findByEmail } = require("./shop.service")
const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}
class AccessService {

    static login = async ({ email, password, refreshToken = null}) => {
        const foundShop = await findByEmail({email});
        if(!foundShop) throw new BadRequestError("Shop not resiterd");
        
        const matchPassword = bcrypt.compare( password, foundShop.password);
        if(!matchPassword) throw new AuthFailureError('authen password is not correct!');

        const publicKey = crypto.randomBytes(64).toString('hex')
        const privateKey = crypto.randomBytes(64).toString('hex')

        const { _id: userId } = foundShop
        const tokens = await createTokenPair({userId , email}, publicKey, privateKey)
        await KeyTokenService.createKeyToken({
            privateKey, publicKey, userId,
            refreshToken: tokens.refreshToken
        })

        return {
            shop: getInfoData({fields: ['_id', 'email', 'name'], object: foundShop}),
            tokens
        }

    }

    static signUp = async ({ name, email, password}) => {
        // try {
            const holderShop = await shopModel.findOne({email}).lean()
            if(holderShop) {
                throw new BadRequestError('Error: Shop already registed')
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            const newShop = await shopModel.create({
                name, email, password: hashedPassword, roles: [RoleShop.SHOP]
            })

            if(newShop) {
                // create privateKey, publicKey
                // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {   // dang bat doi xung, Buffer
                //     modulusLength: 4096,
                //     publicKeyEncoding: {
                //         type: 'pkcs1',                          ==> he thong lon
                //         format: 'pem'
                //     },
                //     privateKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     }
                // })

                const publicKey = crypto.randomBytes(64).toString('hex')
                const privateKey = crypto.randomBytes(64).toString('hex')

                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                })

                if(!keyStore) {
                    return {
                        code: 'xxx',
                        message: 'publicKeyString error'
                    }
                }
                const tokens = await createTokenPair({userId: newShop._id, email}, publicKey, privateKey)
                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({fields: ['_id', 'email', 'name'], object: newShop}),
                        tokens
                    }
                }
            }

            return  {
                code: 200,
                metadata: null
            }
            
        // } catch (error) {
        //     return {
        //         code: 'xxx',
        //         message: error.message,
        //         status: 'error'
        //     }
        // }
    }
}

module.exports = AccessService