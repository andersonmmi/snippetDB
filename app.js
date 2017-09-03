const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const mongodb = require('mongodb');
const mongoURL = 'mongodb://localhost:27017/snippetsdb';
const app = express();
mongoose.connect(mongoURL);
const chalk = require('chalk');
const Snippets = require('./models/snippets');
const DUPLICATE_RECORD_ERROR = 11000;

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req,res){
   res.render('index');
});

app.post('/', function(req,res){
   console.log("login button pressed");
   if (req.body.userId === req.body.userId &&
      req.body.password === req.body.password){
      res.redirect('/home/');
   } else{
      console.log("login button press failed");
      res.send('failed')
   }
});

app.get('/home/', function(req,res){
      res.render('home');
});

app.post('/home/', function(req,res){
   // TODO: submit info from form to DB
   console.log(chalk.red.bgWhite.bold("attempting add app.js 42"));
   console.log(req.body.title);
   Snippets.create({title: req.body.title})
   .then(function (snippet) {
      res.redirect('/home/');
   })
   .catch(function (error) {
      let errorMsg;
      if (error.code === DUPLICATE_RECORD_ERROR) {
         // make message about duplicate
         errorMsg = `The Title "${req.body.title}" has already been used.`
      } else {
         errorMsg = "You have encountered an unknown error."
      }
         res.render('home');
   });
});

app.get('/snippets/', function(req,res){
   res.render('snippets');
});

//build app.listen here
app.listen(3000, function() {
   console.log(chalk.yellow.bgBlue.bold('Listening on port 3000'))
});
