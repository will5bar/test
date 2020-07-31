const { customError } = require("./error.js");
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// Class sqlite
class SqLiteDB {

	static getConection() {
    try {
      // retirn the Firebase object
      return {db: this._db};
    } catch (e) {
      throw customError("Error sqlite", "getConection", 500, e);
    }
  }

  static async createConection() {
    try {

			if (this._db) {
        return SqLiteDB.getConection();
      }


      this._db = await open({
      filename: './data/db.bot',
      driver: sqlite3.Database
    })


			return {db: this._db};

    } catch (e) {
      throw customError("Error sqlite", "createConection", 500, e);
    }
  }
}

module.exports.sqliteConfig = SqLiteDB;
