const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const mongoURL = 'mongodb://localhost:27017/snippet_creators';
const app = express();
mongosse.connect(mongoURL);

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


//build app.listen here
 app.listen(3000, function() {
   console.log('Listening on port 3000')
 });
