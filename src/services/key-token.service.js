const { Types } = require("mongoose");
const keyTokenModel = require("../models/key-token.model")


class KeyTokenService {
    static createKeyToken = async ({ refreshToken, publicKey, privateKey, userId }) => {
        try {
            // const tokens = await keyTokenModel.create({
            //     user: userId,
            //     publicKey,
            //     privateKey
            // })

            // return tokens ? tokens.publicKey : null
            console.log('userId :>> ', userId);
            const filter = {
                user: userId
            }, update = { publicKey, privateKey, refreshTokenUsed: [], refreshToken},
            options = { upsert: true, new: true }

            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)

            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }

    static findByUserId = async (userId) => {
        return keyTokenModel.findOne({user: Types.ObjectId(userId)}).lean()
    }
}

module.exports = KeyTokenService