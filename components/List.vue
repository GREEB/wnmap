<template>
  <div class="pl-14">
    <v-list

      shaped
    >
      <v-list-item
        v-for="n in data"
        :key="n.id"
        link
        :to="{ name: 'device-id', params: { id: n.id }}"
        @click="rowClick(n)"
      >
        <v-list-item-content>
          <v-list-item-title>
            <v-row class="no-gutters">
              <v-col class="col-3">
                <v-icon v-if="n.status" small color="green darken-2">
                  mdi-check-network
                </v-icon>
                <v-icon v-else small color="red darken-2">
                  mdi-check-network
                </v-icon>
              </v-col>
              <v-col class="col-6 text-right" style="color: rgb(162, 162, 162)">
                {{ n.up }}{{ n.ip.split('.').slice(0,-1).join('.') + '.' }}
              </v-col>
              <v-col class="col-3 text-left" style="color: #1976d2;">
                {{ n.ip.split('.').pop() }}
              </v-col>
            </v-row>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="sorter ()">
        <v-list-item-content>
          <v-list-item-subtitle>sort</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-icon>{{ sorticon }}</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>
<style lang="stylus" scoped>
.v-badge
    margin-top 0
.dot
    background-color #629f66
    height 18px
    width 18px
    border-radius 100px
    border 2px solid #2e2e2e
    text-align right
    position absolute
    right 17px
.v-list-item--link
  &:before
    background-color  #56595e
</style>
<script>
export default {
  data () {
    return {
      data: [],
      sorticon: 'mdi-menu-down',
      iptoggle: true,
      selectedId: -1

    }
  },
  computed: {
    /*     lastseen (dev) {
      const de = this.devices[0].scans
      console.log(de)
      const f = de.slice().reverse()
      const obj = this.$_.find(f, function (obj) { return obj.status === true })
      obj.ago = this.$moment(obj.time).fromNow()
      return obj
    }, */
    devices () {
      return this.$store.state.globaldevices
    },
    ipsdata () {
      const devs = this.devices
      const ips = []
      for (const d in devs) {
        const scan = devs[d].scans
        const objs = this.$_.find(scan, function (obj) { return obj.status === true })
        const ago = this.$moment(objs.time).fromNow()
        if (devs[d].scans.status) {
          ips.push({ scan })
        } else {
          ips.push({ status: devs[d].up, time: ago, ip: devs[d].address[0].item.addr, id: devs[d]._id, ipid: devs[d].address[0].item.addr.split('.').join('') })
        }
      }
      return ips
    }
  },
  mounted () {
    this.data = this.down(this.ipsdata)
  },
  methods: {
    down (arr) {
      // Set slice() to avoid to generate an infinite loop!
      return arr.slice().sort(function (a, b) {
        return a.ipid - b.ipid
      })
    },
    up (arr) {
      // Set slice() to avoid to generate an infinite loop!
      return arr.slice().sort(function (a, b) {
        return b.ipid - a.ipid
      })
    },
    sorter () {
      if (!this.iptoggle) {
        this.data = this.down(this.ipsdata)
        this.sorticon = 'mdi-menu-up'
      } else {
        this.data = this.up(this.ipsdata)
        this.sorticon = 'mdi-menu-down'
      }
      this.iptoggle = !this.iptoggle
    },
    rowClick (item) {
      /*       router.push({ name: 'user', params: { userId: '123' } })
      router.push('home')
      this.$store.commit('devices/setSelectedId', item.id) */
    }
  }
}
</script>
