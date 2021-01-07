const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define collection and schema for Post
const Device = new Schema({
  id: Number,
  item: {},
  address: {},
  hostnames: {},
  up: {},
  ports: {},
  os: {},
  uptime: {},
  distance: {},
  tcpsequence: {},
  ipidsequence: {},
  tcptssequence: {},
  times: {},
  scans: [],
  note: String,
  owners: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  collection: 'devices'
})

module.exports = mongoose.model('Device', Device)
