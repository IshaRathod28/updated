const mysql = require("mysql");
const con = mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"root1234",
    database:"squad"
//   timezone: "utc", //<-- here
});
const queryRunner = (query) => {
  return new Promise((resolve, reject) => {
    con.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = { queryRunner };
