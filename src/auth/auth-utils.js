const JWT = require("jsonwebtoken");
const { asyncHandler, HEADER } = require("./checkAuth");
const { findByUserId } = require("../services/key-token.service");
const {
  NotFoundRequestError,
  AuthFailureError,
} = require("../common/response/error.response");
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    return { accessToken, refreshToken };
  } catch (error) {}
};

const authentication = asyncHandler(async (req, res, next) => {
  /**
   * check userId missing ?
   * get access Token
   * verify token
   * check user in bds
   * check keyStore with this userId
   * ok all => return next()
   */

  const userId = req.headers[HEADER.CLIENT_ID];
  const user = await findByUserId(userId);
  if (!user) throw NotFoundRequestError("user not found");

  const keyStore = await findByUserId(userId);
  if (!keyStore) throw new NotFoundRequestError("key store Not found");

  const accessToken = req.headers.authorization;
  if (!accessToken) throw new AuthFailureError("Invalid request");

  try {
    const decodeToken = JWT.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeToken.userId)
      throw new AuthFailureError("Invalid userId");
    console.log('decodeToken :>> ', decodeToken);
    console.log('keyStore :>> ', keyStore);
    req.keyStore = keyStore;
    return next();
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createTokenPair,
  authentication,
};
