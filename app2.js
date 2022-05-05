var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "erick",
  password: "erick",
  port:3306,
  database: "nodejs_note_db"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM notes", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});