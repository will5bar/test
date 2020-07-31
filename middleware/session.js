const {  jwtVerify } = require("./../lib/jwt.js");
const { customError } = require("./../lib/error.js");

//---------------
// session valid
//---------------

const sessionApp = async (req, res, next) => {
  try {
    
    const token = req.headers["authorization"];

    if (!token) {
      throw customError(
        "Payload invalid",
        "sessionApp",
        401,
        null,
        new Error().stack
      );
    }

    let respon = {};

    // login con el pass de admin
    respon = jwtVerify(token);


    if (respon.status === 1) {
      res.locals.data = respon.data;
      // used to created the JsonWebToken
      res.locals.token = token;
      next();
    } else {
      throw customError(
        "Error validation Token",
        "sessionApp",
        440,
        null,
        new Error().stack
      );
    }
  } catch (e) {
    next(e);
  }
};

//---------------
// session valid
//---------------

module.exports.sessionApp = sessionApp;
