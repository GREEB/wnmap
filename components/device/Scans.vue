<template>
  <v-card
    v-if="dev"
    max-width="344"
    color="rgb(47, 49, 54)"
  >
    <v-card-text>
      <v-row>
        <v-col class="mt-2 col-2">
          <v-icon large color="deep-purple text-h5">
            mdi-wifi
          </v-icon>
        </v-col>
        <v-col>
          <p class="mb-0 text-h5 text--primary">
            Scans
          </p>
          <div>
            Last seen {{ dev.lastonline }}
          </div>
          <div>
            <v-rating
              :value="getperc() / 10"
              color="deep-purple"
              dense
              half-increments
              readonly
              size="14"
              empty-icon="mdi-circle-outline"
              full-icon="mdi-circle"
              half-icon="mdi-circle-half"
              length="10"
              style="position: absolute;
margin-left: -3px;"
              background-color="#495164"
            />
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-list
      class="pb-0"
      style="background: rgb(47, 49, 54);
color: #FFFFFF;"
    />

    <v-card-title>Infos</v-card-title>

    <v-card-text>
      <v-chip-group
        active-class="deep-purple accent-4 white--text"
        column
      >
        Total Scans: {{ dev.scans.stats.scannr }}<br>
        Uptime: {{ getperc() }}%
      </v-chip-group>
    </v-card-text>

    <v-card-actions
      style="bottom: 0;"
    >
      <v-btn
        color="deep-purple lighten-2"
        text
      >
        See all scans
      </v-btn>
    </v-card-actions>
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
      const e = this.$store.state.devices.selectedDevice[0].scans
      const b = e.scans.slice().reverse()
      return b
    },
    dev () {
      return this.$store.state.devices.selectedDevice[0]
    }
  },
  methods: {
    getperc () {
      const a = this.dev.scans.stats.scannr
      const u = this.dev.scans.stats.upcounts.true
      return Math.round(u / (a / 100))
    }
  }

}
</script>

<style>

</style>
