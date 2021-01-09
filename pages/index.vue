<template>
  <v-sheet
    class="overflow-hidden"
    style="position: relative;height: 100%;"
  >
    <v-container fill-height>
      <v-layout row wrap align-center>
        <v-flex class="text-center">
          <h1 class="align-center">
            Welcome to wnMap
          </h1>
          <h2 v-if="all.length === 0" class="align-center">
            No devices Found
          </h2>
          <span v-if="all.length === 0">Maybe try to run a scan?</span>
          <span v-else>Maybe try to select a device on the left</span>
          <Fetchbutton v-if="all.length === 0" />
        </v-flex>
      </v-layout>
    </v-container>
    <!--     <v-navigation-drawer
      v-model="drawer2"
      absolute
      temporary
      floating
    /> -->
    <v-img
      style="background-color: #383d44"
    >
      <div>
        <v-row>
          <v-col class="mb-6 xs-12">
            <v-list color="#383d44">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Welcome to wNmap
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Select a device to see more info
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </div>
    </v-img>
  </v-sheet>
</template>
<script>
export default {
  data () {
    return {
      drawer: null,
      events: [],
      input: null,
      nonce: 0
    }
  },
  computed: {
    all () {
      return this.$store.state.globaldevices
    },
    dev () {
      return this.$store.state.devices.selectedDevice[0]
    },
    timeline () {
      return this.events.slice().reverse()
    },
    messages () {
      return this.$store.state.devices.msgs
    }
  },
  methods: {
    comment () {
      const time = (new Date()).toTimeString()
      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
          return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
        })
      })

      this.input = null
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
