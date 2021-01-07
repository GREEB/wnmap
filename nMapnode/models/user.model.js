const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define collection and schema for Post
const User = new Schema({
  id: Number,
  name: String,
  devices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device'
  }]
}, {
  collection: 'users'
})

module.exports = mongoose.model('User', User)
