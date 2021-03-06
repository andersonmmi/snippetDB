const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const mongoURL = 'mongodb://localhost:27017/snippetsdb';
const app = express();
mongoose.connect(mongoURL);
const chalk = require('chalk');
const Snippets = require('./models/snippets');
const Creators = require('./models/creators');
const DUPLICATE_RECORD_ERROR = 11000;
let username;
let password;

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

app.get('/', function(req,res){
   req.session.username = "";
   req.session.authenticated = false;
   console.log(req.session.username+" "+req.session.authenticated);
   res.render('index');
});

app.post('/', function(req,res){
   Creators.findOne({username: req.body.username})
   .then(function(compare){
      if(bcrypt.compareSync(req.body.password, compare.password)===true){
         req.session.username = req.body.username;
         req.session.authenticated = true;
         console.log(req.session.username+" "+req.session.authenticated);
         res.redirect('/home/');
      } else{
         let errorMsg = "Oops, something went worng!";
         res.render('index', {errorMsg});
      }
   })
   .catch(function(error){
      let errorMsg = "Oops, something went wrong!"
      res.render('index',{errorMsg})
   });
});

app.get('/registration/', function(req,res){
   res.render('registration');
});

app.post('/registration/', function(req,res){
   console.log(req.body.username+" "+req.body.password);
   username = req.body.username;
   password = req.body.password;
   let hash = bcrypt.hashSync(password, 8);
   Creators.create({
      username: username,
      password: hash
   });
   res.redirect('/');
});

app.get('/home/', function(req,res){
   Snippets.find({author: req.session.username})
   .then(function (snippets){
      res.render('home',{snippets});
   })
   .catch(function (error){
      let errorMsg = "there is an error";
      console.log(errorMsg);
   });
});

app.post('/home/', function(req,res){
   Snippets.create({
      author   : req.session.username,
      title    : req.body.title,
      code     : req.body.code,
      notes    : req.body.notes,
      language : req.body.language,
      tags     : req.body.tags
   });
   console.log(req.session.username);
   res.redirect('/home/', "home", "get");
});

app.get('/snippets/:title', function(req,res){
   Snippets.findOne({title: req.params.title})
   .then(function(snippets){
      res.render('snippets',{snippets});
   });
});

//build app.listen here
app.listen(3000, function() {
   console.log(chalk.yellow.bgBlue.bold('Listening on port 3000'))
});
