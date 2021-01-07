<template>
  <v-card
    class="mx-auto"
    max-width="400"
    tile
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Open Ports</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item
      v-for="(d, index) in sd"
      :key="index"
    >
      <v-list-item-content>
        <v-list-item-title>{{ d.service[0].item.name }}  {{ d.state[0].item.state }} . {{ d.item.portid }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title>Three-line item</v-list-item-title>
        <v-list-item-subtitle>
          Secondary line text Lorem ipsum dolor sit amet,
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          consectetur adipiscing elit.
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<style lang="stylus" scoped>
.v-list-group__items .v-list-item
  padding-left 38px !important
  height 0px
.v-list-group__items .v-list-item .v-icon
  marign-top 5px
  position absolute
.v-application .primary--text
    color #fff !important
    caret-color #fff !important
</style>
<script>
export default {
  data () {
    return {
      scandata: []
    }
  },
  computed: {
    sd () {
      const e = this.$store.state.devices.selectedDevice[0].ports
      const b = e.slice().reverse()
      return b
    }
  },
  methods: {
  }

}
</script>

<style>

</style>
