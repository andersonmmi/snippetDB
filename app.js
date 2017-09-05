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
   if (req.body.userId === req.body.userId &&
      req.body.password === req.body.password){
      res.redirect('/home/');
   } else{
      res.send('failed')
   }
});

app.get('/home/', function(req,res){
   Snippets.find()
   .then(function (snippets){
      res.render('home',{snippets});
   })
   .catch(function (error){
      let errorMsg = "there is an error";
      console.log(errorMsg);
   });
});

// there is a validation error produced by this post method
app.post('/home/', function(req,res){
   console.log(req.body.title+req.body.code+req.body.notes+req.body.language+req.body.tags);
   Snippets.create({
      author   : "Aaron",
      title    : req.body.title,
      code     : req.body.code,
      notes    : req.body.notes,
      language : req.body.language,
      tags     : req.body.tags
   });
   res.redirect('/home/', "home", "get");
});


app.get('/snippets/', function(req,res){
   res.render('snippets');
});

//build app.listen here
app.listen(3000, function() {
   console.log(chalk.yellow.bgBlue.bold('Listening on port 3000'))
});
