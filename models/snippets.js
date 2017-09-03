
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  author: String,
  title: String,
  code: String,
  notes: String,
  language: String,
  tags: String
})

const Snippets = mongoose.model('Snippets', schema);

module.exports = Snippets;
