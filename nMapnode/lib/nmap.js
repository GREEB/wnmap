const nmap = require('libnmap')
module.exports = runmap = (subnet, flags) => {
  const opts = {
    flags: [flags],
    range: [subnet]
  }
  console.log('Nmap: Scan Started', opts)
  return new Promise((resolve) => {
    nmap.scan(opts, function (err, report) {
      if (report) { console.log('Nmap: Scan done') }
      // console.log(JSON.stringify(report));
      const deviceInfo = []
      for (const item in report) {
        const hosts = report[item].host
        for (const devices in hosts) {
          const host = hosts[devices]
          host.scans = []
          host.scans.push({ time: new Date(), status: true, firstscan: true })
          host.id = parseInt(host.address[0].item.addr.split('.').join(''))
          host.up = true
          deviceInfo.push(host)
        };
      };
      resolve(deviceInfo)
      console.log(err)
    })
  })
}
