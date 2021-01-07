const express = require('express')
const userRoutes = express.Router()
const mongoose = require('mongoose')

// Require Post model in our routes module
const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const Device = require('../models/device.model')

// Defined get data(index or listing) route
userRoutes.route('/').get(function (req, res) {
  User.find({}).populate('devices').exec((err, posts) => {
    res.json(posts)
  })
})
userRoutes.route('/').post(asyncHandler(async (req, res) => {
  console.log(req.body, req.params)
  const n = await User.findOne({ name: req.body.users }).exec()
  if (n === null) {
    const owner = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.users
    })
    owner.save(function (err) {
      if (err) { console.log(err) }
    })
    res.json(owner)
  }
}))
userRoutes.route('/:id').delete(asyncHandler(async (req, res) => {
  console.log(req.body, req.params.id)
  const n = await User.findOne({ _id: req.params.id }).exec()
  if (n !== null) {
    User.findByIdAndRemove(req.params.id, function (err) {
      if (err) { console.log(err) }
      console.log('Successful deletion')
    })
  }
}))
userRoutes.route('/add/:id').post(asyncHandler(async (req, res) => {
  console.log(req.body.users[0])
  const n = await User.findOne({ name: req.body.users[0] }).exec()
  const d = await Device.findById(req.params.id).exec()
  if (n === null) {
    const owner = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.users[0]
    })
    owner.save(function (err) {
      if (err) { return handleError(err) }

      Device.findOne({ _id: req.params.id }, function (error, dev) {
        console.log(dev)
        if (error) {
          return handleError(error)
        }
        dev.owner = owner._id
        dev.save()
        console.log(dev.owner) // prints "Ian Fleming"
      })
    })
  } else {
    Device.findOne({ _id: req.params.id }, function (error, dev) {
      console.log(dev)
      if (error) {
        return handleError(error)
      }
      dev.owner = n._id
      dev.save()
      console.log(dev.owner) // prints "Ian Fleming"
    })
  }

  /* if (n === null) {
    if (req.params.id !== null) {
      const users = new User({ name: req.body.users[0], devices: req.params.id })
      users.save(function (err) {
        if (err) { return handleError(err) }

        d.owner = req.body.users[0]

        d.save(function (err) {
          if (err) { return handleError(err) }
          // that's it!
        })
      })
    }
  } */
  res.json('done')
  // const users = new User({ name: req.body.users[0], devices: [req.params.id] })
  // users.save()
}))
/* userRoutes.route('/add/:id').post( async(req, res) {
  const d = User.find({ name: req.body.users }).exec()
  console.log(d)
  User.find({ name: req.body.users }, function (err, docs) {
    if (err) {
      console.log(err)
    } else {
      console.log('Original Doc')
    }
  })
}) */
// Defined delete | remove | destroy route
userRoutes.route('/delete/:id').delete(function (req, res) {
  User.findOneAndDelete({ id: req.params.id }, function (err) {
    if (err) { res.json(err) } else { res.json('Successfully removed') }
  })
})

module.exports = userRoutes
