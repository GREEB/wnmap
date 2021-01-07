
const bodyParser = require('body-parser')
const port = 4000
const cors = require('cors')
require('better-logging')(console)
const app = require('express')()

const deviceRoute = require('./routes/device.route')
const userRoute = require('./routes/user.route')
const scanRoute = require('./routes/scan.route')

const unixTime = Math.floor(Date.now() / 1000)
// Pass a http.Server instance to the listen method

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/test', function (req, res) {
  res.send('hello world')
})

app.use('/users', userRoute)
app.use('/devices', deviceRoute)
app.use('/scan', scanRoute)
// Export express app

module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
