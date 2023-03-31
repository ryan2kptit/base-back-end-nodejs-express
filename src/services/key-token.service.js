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
            console.log('tokens :>> ', tokens);

            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }
}

module.exports = KeyTokenService