const express = require('express');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const mongoURL = 'mongodb://localhost:27017/snippet_creators';
