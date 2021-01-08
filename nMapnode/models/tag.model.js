const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define collection and schema for Post
const Tag = new Schema({
  id: Number,
  name: String,
  devices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device'
  }]
}, {
  collection: 'tags'
})

module.exports = mongoose.model('Tag', Tag)
