const express = require("express");

const fs = require('fs');

const { SelectDataDB , AddDataDB } = require("./../../lib/sqliteFunctions.js");


const { customError } = require("./../../lib/error.js");
const { sessionApp } = require("./../../middleware/session.js");

const router = express.Router();

//-----------------------------------
//-----------------------------------

// router.post('/getData', sessionApp, async (req, res, next) => {
router.post(
  "/getData",
  sessionApp,
  async (req, res, next) => {
    try {

      let user = req.body; // tomamos [data_ini]

      let data

      //------
      // DB
      //------

      sql =  `INSERT INTO doc_test (nome,data_nacimento,cpf,rg) 
              VALUES ( "${user.nome}", 
              "${user.data_nacimento}",
              "${user.cpf}",
              "${user.rg}")`;

      data = await AddDataDB(sql);

      //------
      // TXT
      //------

      let text =  `Nome Completo ${user.nome}
                  data de naciemnto ${user.data_nacimento}
                  CPF ${user.cpf}
                  RJ ${user.rg}
                  
                  Usuario Auth
                  Login ${user.user}`;

       fs.appendFileSync(`./docs/${user.user}.txt`, text); 


      data = `Documento Gerado pelo User -> ${user.user}`

      // Respuesta al Front
      res.locals.responseSend = { message: "ok", data };
      res.locals.responseCode = 200;

      // call the responseÂ´s log middleware
      next();
    } catch (e) {
      //console.log('Error occurred');
      // call the Error middleware
      next(e);
    }
  }
);



module.exports.routerReport = router;