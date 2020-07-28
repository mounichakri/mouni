
const express = require('express');
const app = express();
const path = require('path');
const config = require('./public/config');

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

let mysql = require('mysql');


var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'user@123',
  database: 'chad',
  multipleStatements: true
});
// let connection = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'user@123',
//   database: 'chad'
// });
// const connection = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'user@123',
//   database: 'chad'
// });

mysqlConnection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  } else {
    console.log('Connected to the MySQL server.');
  }
});
// console.log('database ...', mysqlConnection);
// let database =await mysqlConnection.getConnection();


app.get('/', async (req, res) => {

  console.log('databasedatabasedatabase ...', mysqlConnection);

  var data = await mysqlConnection.query('SELECT * FROM chad.ilance_users').exec();
  console.log("data -------------", data);


});



app.get('/index', function (req, res) {
  res.render('index');
});

// app.get('/services', function (req, res) {
//   res.render('services');
// });

// app.get('/bookings', function (req, res) {
//   res.render('bookings');
// });

// app.get('/contact', function (req, res) {
//   res.render('contact');
// });


app.listen(3005)