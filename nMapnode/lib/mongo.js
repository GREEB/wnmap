const mongoose = require('mongoose')
const async = require('async')
const config = require('../config/DB')
const Device = require('../models/device.model')

mongoose.Promise = global.Promise
mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {
    console.log('Database is connected')
  },
  (err) => {
    console.log('Can not connect to the database' + err)
  }
)
mongoose.set('useFindAndModify', false)
module.exports = async function addDevices (devices) {
  console.log('MongoDB: saving devices ')
  const scanresult = {}
  scanresult.added = []
  scanresult.notadded = []
  for (const devi in devices) {
    const ip = parseInt(devices[devi].address[0].item.addr.split('.').join(''))
    const dev = await Device.find({ id: devices[devi].id })
    if (!dev.length) {
      // DEVICE NOT FOUND
      scanresult.added.push(ip)
      const device = new Device(devices[devi])
      device.save()
    } else {
      // DEVICE FOUND
      scanresult.notadded.push(ip)
    }
  }
  for await (const devi of Device.find()) {
    if (scanresult.added.includes(devi.id)) {
      // ONLINE: NEW DEVICE
      await devi.updateOne(
        { $set: { scans: { time: new Date(), status: true, firstscan: true } } })
      await devi.updateOne(
        { $set: { up: true } })
    } else if (scanresult.notadded.includes(devi.id)) {
      // ONLINE: WAS ALREADY HERE
      await devi.updateOne(
        { $push: { scans: { time: new Date(), status: true } } })
      await devi.updateOne(
        { $set: { up: true } })
    } else {
      // OFFLINE: UPDATING OLD DEVICE FOR TIMELINE CONTINUITI
      await devi.updateOne(
        { $push: { scans: { time: new Date(), status: false } } })
      await devi.updateOne(
        { $set: { up: false } })
    }
  }
  console.log('MongoDB: save done')
  return scanresult
}
