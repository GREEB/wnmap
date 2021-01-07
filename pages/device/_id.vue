<template>
  <v-sheet
    class="overflow-hidden"
    style="position: relative;height: 100%;background-color: #1d1f24;"
  >
    <!--     <v-navigation-drawer
      v-model="drawer2"
      absolute
      temporary
      floating
    /> -->
    <DevInfoContent v-if="dev" />
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
