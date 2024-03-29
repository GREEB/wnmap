const express = require('express')
const deviceRoutes = express.Router()
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')

// Require Post model in our routes module
const Device = require('../models/device.model')
const User = require('../models/user.model')
const Tag = require('../models/tag.model')

// Defined get data(index or listing) route
deviceRoutes.route('/').get(function (req, res) {
  console.info('Express: ', req.originalUrl)
  Device.find({})
    .populate('owners')
    .populate('tags')
    .exec((err, a) => {
      res.json(a)
    })
})
deviceRoutes.route('/note/:id').post(function (req, res) {
  console.log(req.body, req.params)
  Device.findOneAndUpdate({ id: req.params.id },
    { note: req.body.text }, null, function (err, docs) {
      if (err) {
        console.log(err)
      } else {
        console.log('Original Doc')
      }
    })
})
deviceRoutes.route('/user/:id').post(asyncHandler(async (req, res) => {
  const n = await User.findOne({ name: req.body.users }).exec()
  const d = await Device.findById(req.params.id).exec()
  console.log(req.body)
  // console.log(n, d)
  if (n === null) {
    // user not found
  } else {
    d.owners.push(n)
    d.save()
    n.devices.push(d)
    n.save()
  }
}))
deviceRoutes.route('/tag/:id').post(asyncHandler(async (req, res) => {
  console.log('Tag req send', req.params, req.body)
  const n = await Tag.findOne({ name: req.body.text }).exec()
  // console.log(n, d)
  if (n === null) {
    const d = await Device.findById(req.params.id).exec()
    const tag = new Tag({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.text
    })
    tag.devices.addToSet(d)
    tag.save()
    d.tags.addToSet(tag)
    d.save()
  } else {
    const d = await Device.findById(req.params.id).exec()
    d.tags.addToSet(n)
    d.save()
    n.devices.addToSet(d)
    n.save()
  }
}))
/* deviceRoutes.route('/user/:id').post(function (req, res) {
  console.log(req.body, req.params.id)
  Device.findById(req.params.id, function (err, docs) {
    if (err) {
      console.log(err)
    } else {
      console.log(docs)
      console.log('Original Doc')
    }
  })
}) */
// Defined delete | remove | destroy route
deviceRoutes.route('/delete/:id').delete(function (req, res) {
  Device.findOneAndDelete({ id: req.params.id }, function (err) {
    if (err) { res.json(err) } else { res.json('Successfully removed') }
  })
})

module.exports = deviceRoutes
