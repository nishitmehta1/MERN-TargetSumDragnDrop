const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
  profilepic: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  phone: {
    type: String
  },
  highestscore: {
    type: Number,
    default: 0
  },
  lastScore: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('User', User);
