<template>
  <v-sheet
    class="overflow-hidden"
    style="position: relative;height: 100%;background-color: #1d1f24;"
  >
    {{ tags }}
    <DeviceContent v-if="selectedDevice" />
  </v-sheet>
</template>
<script>

export default {
  // async fetch () {
  //   if (this.$store.state.devices.all.length < 2) {
  //     const b = await this.$axios.get('/api/devices')

  //   }
  // },
  data () {
    return {
      device: [],
      devices: []
    }
  },
  computed: {
    allDevices () {
      return this.$store.state.devices.all
    },
    selectedId () {
      this.$store.commit('devices/setSelectedId', this.$route.fullPath.split('/').pop())
      return this.$route.fullPath.split('/').pop()
    },
    selectedDevice () {
      const s = this.selectedId
      const d = this.allDevices
      const sd = d.find(el => el._id === s)
      return sd
    },
    ip () {
      const d = this.selectedDevice
      return d.address[0].item.addr
    },
    mac () {
      const d = this.selectedDevice
      if (this.hasMac) {
        return d.address[1].item.addr
      }
      return 'n/a'
    },
    hasMac () {
      const d = this.selectedDevice
      let res = false
      // const dl = d.length
      if (d && d.address.length >= 2) {
        res = true
      }
      return res
    },
    hostname () {
      const d = this.selectedDevice
      if (this.hasHostname) {
        return d.hostnames[0].hostname[0].item.name
      }
      return d.hostnames[0]
    },
    hasHostname () {
      const d = this.selectedDevice
      let res = true
      // const dl = d.length
      if (d && d.hostnames[0] === '\n') {
        res = false
      }
      return res
    },
    devicetype () {
      const d = this.selectedDevice
      let res = []
      // const dl = d.length
      if (this.hasHostname === true) {
        const hn = d.hostnames[0].hostname[0].item.name.split('.').slice(0, -2).join('')
        if (hn.includes('android') | hn.includes('Android') || hn.includes('OnePlus') || hn.includes('Galaxy')) {
          res = { type: 'Phone', os: 'Android' }
        } else if (hn.includes('desktop')) {
          res = { type: 'Desktop', os: 'Windows' }
        } else if (hn.includes('Chromecast')) {
          res = { type: 'Media Adapter', os: 'n/a' }
        } else if (hn === '') {
          res = { type: 'Router', os: 'n/a' }
        } else {
          res = 'No info'
        }
      }
      return res
    },
    ports () {
      const d = this.selectedDevice
      if (this.hasPorts) {
        return d.ports[0].port
      } else {
        return { 'n/a': false }
      }
    },
    hasTimes () {
      const d = this.selectedDevice
      const hasTimes = (d && typeof d.times !== 'undefined')
      return hasTimes
    },
    hasOs () {
      const d = this.selectedDevice
      const hasOs = (d && typeof d.os !== 'undefined')
      return hasOs
    },
    hasPorts () {
      const d = this.selectedDevice
      let res = false
      const hasPorts = (d && typeof d.ports !== 'undefined')
      if (d) {
        if (hasPorts) {
          if (d.ports[0].port) {
            if (d.ports[0].port.length >= 1) {
              res = true
            }
          }
        }
      }
      return res
    },
    scan2time () {
      const scans = this.selectedDevice.scans
      const upcounts = this.$_.countBy(scans, 'status')
      const grouping = this.$_.groupBy(scans, element => element.time.substring(0, 10))
      const sections = this.$_.map(grouping, (items, time) => ({
        time,
        scans: items
      }))
      return { scans: sections, stats: { upcounts, scannr: scans.length } }
    },
    lastseen () {
      const scans = this.selectedDevice.scans
      return this.$moment(scans.slice().pop().time).fromNow()
    },
    osses () {
      const d = this.selectedDevice
      if (this.hasOs && d && typeof d.os[0].osmatch !== 'undefined') {
        return d.os[0].osmatch
      }
      return 'No os'
    }
  },

  watch: {
    '$store.state.devices.selectedId' () {
      this.getDevbyId()
    }
  },
  mounted () {
    this.getdevs()
    this.getDevbyId()
  },
  methods: {
    getdevs () {
      const a = this.$store.state.globaldevices
      this.$store.commit('devices/setDevices', a)
      this.$store.commit('devices/addMsg', 'Devices Successfully fetched')
    },
    containsKey (obj, key) {
      return Object.keys(obj).includes(key)
    },
    getDevbyId () {
      const dev = []
      dev.push(this.selectedDevice)
      const result = dev.map((item) => {
        return {
          hasPorts: this.hasPorts,
          hasMac: this.hasMac,
          hasHostname: this.hasHostname,
          hasTimes: this.hasTimes,
          devId: item.id,
          mId: item._id,
          ip: this.ip,
          mac: this.mac,
          hn: this.hostname,
          lastseen: this.lastseen,
          address: item.address,
          hostname: item.hostnames,
          devicetype: this.devicetype,
          scans: this.scan2time,
          ports: this.ports, // TODO: split shit up
          os: this.osses, // TODO: split shit up
          times: item.times, // TODO: split shit up
          note: item.note,
          tags: item.tags,
          owners: item.owners
        }
      }).sort((a, b) => b.count - a.count)
      this.device = result
      this.$store.commit('devices/setSelectedDevice', result)
    }
  }
}
</script>
<style lang="stylus" scoped>
.theme--dark.v-sheet {
    background-color: #35393F;
    border-color: #35393F;
    color: #FFFFFF;
}
</style>
