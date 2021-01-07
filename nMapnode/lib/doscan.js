const express = require('express')
const scanRoutes = express.Router()
const asyncHandler = require('express-async-handler')
const runmap = require('../lib/nmap')
const addDevices = require('../lib/mongo')
let args
let lastscan
let loop = false
module.exports = {
  async scan (req) {
    args = req.body
    if (req.body.flags && req.body.subnet && req.body.interval && req.body.intervaltime) {
      console.log(args)
      if (req.body.interval === true) {
        loop = true
        await runOnInterval()
      }
    } else if (req.body.flags && req.body.subnet) {
      await doSingleScan()
    } else {
      return 'not all arguments set'
    }
  },
  stopscan (req) {
    loop = false
    return true
  },
  checkiflooping (req) {
    console.log('checking sending this', loop)
    return [loop, args]
  }
}

function runOnInterval () {
  console.log('running on loop', args.intervaltime)
  if (loop) {
    interval().catch((err) => {
      loop = false
      console.log(err)
      return 'user stopped scan'
    })
  } else {
    return 'nomore loop'
  }
}
function awaitFunction () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve()
    }, args.intervaltime)
  })
};

const interval = async function actuallydoScan () {
  if (!loop) { return }
  console.log('acctually doning scan')
  if (!lastscan) {
    const scanresult = await runmap(args.subnet, args.flags)
    if (scanresult) {
      const adddevices = await addDevices(scanresult)
      if (adddevices) {

      }
    }
  } else if (Math.floor(Date.now() / 1000) >= (lastscan + 180)) {
    const scanresult = await runmap(args.subnet, args.flags)
    if (scanresult) {
      const adddevices = await addDevices(scanresult)
      if (adddevices) {

      }
    }
  } else {
    // const scnt = (Math.floor(Date.now() / 1000)) - lastscan
    // res.json({ error: { msg: 'no scan, last scan was only ' + scnt + ' seconds ago!', text: 'The min timeout is 60seconds, you can change that in the settings' } })
  }
  if (loop) {
    const _await = await awaitFunction()
    setTimeout(interval, 2000)
  } else {
    return 'loop was set to fasle'
  }
}

async function doSingleScan () {
  console.log('acctually doning scan')
  if (!lastscan) {
    const scanresult = await runmap(args.subnet, args.flags)
    if (scanresult) {
      const adddevices = await addDevices(scanresult)
      if (adddevices) {

      }
    }
  } else if (Math.floor(Date.now() / 1000) >= (lastscan + 180)) {
    const scanresult = await runmap(args.subnet, args.flags)
    if (scanresult) {
      const adddevices = await addDevices(scanresult)
      if (adddevices) {

      }
    }
  } else {
    // const scnt = (Math.floor(Date.now() / 1000)) - lastscan
    // res.json({ error: { msg: 'no scan, last scan was only ' + scnt + ' seconds ago!', text: 'The min timeout is 60seconds, you can change that in the settings' } })
  }
  return 'loop was set to fasle'
}
