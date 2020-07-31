const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const responseTime = require("response-time");
const cors = require("cors");
const dotenv = require("dotenv");

const config = require("./lib/config.js");
const winston = require("./lib/winston.js");

const db = require("./lib/db.js");

//const { createKeyPairs } = require("./lib/encrypt.js");

//--------------------//
//--------------------//

const app = express();

// Max request body size
app.use(bodyParser.json({ limit: config.get("json.limit") }));
app.use(bodyParser.urlencoded({ extended: true }));

// compress all responses
app.use(compression());

app.use(express.static("public"));

// CORS defines interaction browser/server using cross-origin request
app.use(cors({ origin: true }));

// responseTime Header (res)
app.use(responseTime());

// load values from the .env file in this directory into process.env
dotenv.config();

//-----------
// ROUTES
//-----------

const { routerReport } = require("./routers/report/index.js");
const { routerLogin } = require("./routers/login/index.js");
const { logResponse } = require("./middleware/response.js");
const { errorHandler } = require("./middleware/error.js");

// add the routers
app.use(routerReport);
app.use(routerLogin);

// add the response log midddleware
app.use(logResponse);
// add the Error middleware
app.use(errorHandler);

//-----------
// Uncaught
//-----------

// Uncaught JavaScript exception
process.on("uncaughtException", err => {
  // LOG
  winston.error({
    error: err,
    info: { method: "uncaughtException", message: "unhandle error" },
    stack: err.stack || new Error().stack
  });
});

// Promise is rejected AND No error handler is attached to the promise
process.on("unhandledRejection", (reason, promise) => {
  // LOG
  winston.error({
    error: reason,
    info: { method: "unhandledRejection", message: "unhandle Promise" },
    promise: promise,
    stack: reason.stack || new Error().stack
  });
});

//--------------------//
//--------------------//

//createKeyPairs();

//-----------------
// Port to Listen
//-----------------

const PORT = process.env.PORT || config.get("port.ini");

if (process.env.NODE_ENV !== 'test') {

app.listen(PORT, () => {
  // LOG
  winston.log({
    info: {
      method: "app.listen",
      message: `Server is listening on port ${PORT}`
    }
  });
});

}

module.exports = app;