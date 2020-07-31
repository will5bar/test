const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.cached.Database('./data/db.bot');
const db = new sqlite3.cached.Database('./data/db.bot' , function (err) {
   console.error('err_sqlite',err);
});

db.run(`CREATE TABLE IF NOT EXISTS doc_test (
                          ID INTEGER PRIMARY KEY AUTOINCREMENT,
                          nome TEXT,
                          data_nacimento TEXT,
                          cpf TEXT,
                          rg TEXT
                          );`);

db.run(`CREATE TABLE IF NOT EXISTS login_test (
                          ID INTEGER PRIMARY KEY AUTOINCREMENT,
                          user TEXT,
                          pass TEXT
                          );`);


//db.run(`INSERT INTO login_test (user, pass) VALUES ( "test" , "test")`);

// close the database connection
db.close();

module.exports = db;