<template>
  <v-container>
    <v-row>
      <v-col class="justify pa-4">
        <DeviceInfo />
      </v-col>
      <v-col class="justify pa-4">
        <DeviceScans />
      </v-col>
      <v-col class="justify pa-4">
        <DeviceOwner />
      </v-col>
      <v-col class="col-1" />
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      reveal: false,
      note: ''
    }
  },
  computed: {
    getnote () {
      return this.$store.state.devices.selectedDevice[0].note
    },
    sd () {
      const e = this.$store.state.devices.selectedDevice[0].ports
      const b = e.slice().reverse()
      return b
    },
    dev () {
      return this.$store.state.devices.selectedDevice[0]
    }
  },
  mounted () {
    this.note = this.getnote
  },
  methods: {
    submit () {
      this.$axios.$post('/api/devices/note/' + this.dev.devId, {
        text: this.note
      })
    }
  }
}
</script>

<style>
textarea{
  font-size: 12px;
line-height: 2em;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
