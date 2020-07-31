const express = require("express");

const { SelectDataDB , AddDataDB } = require("./../../lib/sqliteFunctions.js");

const { jwtSign } = require("./../../lib/jwt.js");
const { customError } = require("./../../lib/error.js");

const router = express.Router();

//-----------------------------------
//-----------------------------------

// Login User using google
router.post("/loginUser", async (req, res, next) => {
  try {

    // Se valida los Datos del Formulario
     if (!req.body.user || !req.body.pass) {
       throw customError(
         "Error Payload",
         "/loginUser",
         400,
         null,
         new Error().stack
       );
     }

     let { user } = req.body;

    //----------
    //  Front
    //----------

    // make up the JWT
    const jwt = jwtSign({ user });

    // Respuesta al Front
    res.locals.responseSend = {
      message: "Login Success",
      token: jwt
    };

    res.locals.responseCode = 200;
    // call the responseÂ´s log middleware
    next();

  } catch (e) {

    // call the Error middleware
    next(e);
  }
});


//----------------------------------

module.exports.routerLogin = router;
