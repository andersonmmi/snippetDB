
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username  : {type: String, required: true, unique: true},
  password  : {type: String, required: true}
})

const Creators = mongoose.model('Creators', schema);

module.exports = Creators;
