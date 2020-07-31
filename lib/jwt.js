const jwt = require("jsonwebtoken");
const { customError } = require("./error.js");
const config = require("./config.js");
const { getPublicKey, getPrivateKey } = require("./encrypt.js");

//--- jwt

const jwtSign = payload => {
  try {
    return jwt.sign(payload, getPrivateKey(), {
      algorithm: config.get("jwtSign.algorithm"),
      expiresIn: config.get("jwtSign.expiresIn")
    });
  } catch (e) {
    throw customError("Error ao jwtSign", "jwtSign", 500, e);
  }
};

const jwtVerify = (token, uid) => {
  try {
    const decodedToken = jwt.verify(token, getPublicKey(), {
      algorithm: config.get("jwtSign.algorithm")
    });

    //console.log('decodedToken',decodedToken);

    return { status: 1, data: decodedToken };
  } catch (e) {
    if (e.name && ["TokenExpiredError", "JsonWebTokenError"].includes(e.name)) {
      return false;
    } else {
      throw customError("Error ao jwtVerify", "jwtVerify", 500, e);
    }
  }
};

module.exports.jwtSign = jwtSign;
module.exports.jwtVerify = jwtVerify;
