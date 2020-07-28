
const express = require('express');
const app = express();
const path = require('path');
const config = require('./public/config');
const md5 = require('md5');
var bodyParser = require('body-parser');
var $ = require('jquery');

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


let mysql = require('mysql');

const connection = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'user@123',
  database: 'chad'
});

app.get('/', function (req, res) {

  connection.getConnection(function (err, connection) {
    var query = connection.query('SELECT * FROM chad.ilance_users', function (err, result) {
      if (err) throw err;
      //  console.log("query", result);
      res.render('index', { "layout": false, data: JSON.stringify(result) });
    });

  });
});



app.get('/list', function (req, res) {

  connection.getConnection(function (err, connection) {
    var query = connection.query("SELECT  project_title as ProjectTitle,username as UserName,ilance_categories.name as 'categories' FROM ilance_users LEFT JOIN ilance_projects ON ilance_users.user_id = ilance_projects.user_id LEFT JOIN ilance_categories ON ilance_projects.cid = ilance_categories.cid order by ilance_users.user_id Desc", function (err, result) {
      if (err) throw err; 
      //  console.log("query", result);
      res.render('list', { "layout": false, data: JSON.stringify(result), username:JSON.stringify(result)[0].username });
    });

  });
});

app.post('/login', function (req, res) {
  let username = req.body.username.toLowerCase()

  var query = connection.query("SELECT username,password,salt FROM chad.ilance_users where username = '" + username + "'", function (err, result) {
    if (err) throw err;
    //let data = JSON.stringify(result);
    console.log("iiiiiiiiiiiiiiiiiiii");

    if (result[0].username) {

      res.send(result);
    }
  });
});


app.listen(3005)