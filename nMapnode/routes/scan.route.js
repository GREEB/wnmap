const express = require('express')
const scanRoutes = express.Router()
const asyncHandler = require('express-async-handler')
const runmap = require('../lib/nmap')
const addDevices = require('../lib/mongo')
const scanner = require('../lib/doscan')

let lastscan

// Defined get data(index or listing) route
scanRoutes.route('/').post(asyncHandler(async (req, res) => {
  // console.log(lastscan, unixTime, unixTime - lastscan);
  const doscanb = await scanner.scan(req)
  res.send(doscanb)
  /*
console.log(scanres);
res.write(scanres); */
}))

scanRoutes.route('/stop').get(asyncHandler(async (req, res) => {
  const stopscan = await scanner.stopscan(req)
  res.send(stopscan)
}))

scanRoutes.route('/check').get(asyncHandler(async (req, res) => {
  const checkscan = await scanner.checkiflooping()
  res.send(checkscan)
}))
module.exports = scanRoutes
