const { customError } = require("./error.js");
const { sqliteConfig } = require("./sqliteConf.js");
const config = require("./config.js");

//--------------------------
//--------------------------

//-------
// FIND
//-------
// Select Data
const SelectDataDB = async (sql_query) => {
  try {
    // Conection DB
    const { db } = await sqliteConfig.createConection();

    // Get Data
		const result =  await db.all(sql_query);

		return result;

  } catch (e) {
    throw customError("Error sqlite", "SelectDataDB", 500, e);
  }
};

//------
// ADD
//------

// Select Data
const AddDataDB = async (sql_query) => {
  try {
    // Conection DB
    const { db } = await sqliteConfig.createConection();

    console.log('db',db);

    // Get Data
		const result =  await db.all(sql_query);

		return result;

  } catch (e) {
    throw customError("Error sqlite", "AddDataDB", 500, e);
  }
};

//-------------------------------------------------
//-------------------------------------------------

module.exports.AddDataDB = AddDataDB;
module.exports.SelectDataDB = SelectDataDB;
