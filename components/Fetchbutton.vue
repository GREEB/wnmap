<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          dark
          v-bind="attrs"
          @click="check4scan"
          v-on="on"
        >
          <v-icon>mdi-skull-scan</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Nmap Settings</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <div v-if="scandin && scanstatus.data[1]" class="alertcontainer">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <div
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-progress-circular
                          class="spinner"
                          :size="16"
                          indeterminate
                        />
                        <v-alert
                          class="alert"
                          dense
                          color="primary"
                        >
                          Nmap is running in a loop with
                          <strong> {{ scanstatus.data[1].intervaltime }} ms </strong>
                          delay
                          <v-btn
                            small
                            @click="stopscan"
                          >
                            stop?
                          </v-btn>
                        </v-alert>
                      </div>
                    </template>
                  </v-tooltip>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="subnet"
                  label="Subnet/IP*"
                  hint="ex: 192.168.0.0/24"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="flags"
                  label="Flags"
                  hint="'-O'"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-checkbox
                  v-model="interval"
                  label="Interval"
                  hint="ex: 192.168.0.0/24"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="intervaltime"
                  label="Time between scans"
                  hint="in ms"
                  required
                />
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="scanf({
              'subnet': subnet,
              'flags': flags,
              'interval': interval,
              'intervaltime' : intervaltime})"
          >
            Start Scan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      subnet: '192.168.0.0/24',
      flags: '-O -sV --traceroute',
      interval: true,
      intervaltime: 300000,
      dialog: false,
      scan: [],
      scanstatus: [],
      scandin: false
    }
  },
  methods: {
    async scanf (data) {
      // this.dialog = false
      const res = await this.$axios.post('api/scan', data)
      this.scanstatus = await this.$axios.get('api/scan/check')
      this.scandin = this.scanstatus.data[0]

      return res
    },
    async check4scan () {
      this.scanstatus = await this.$axios.get('api/scan/check')
      this.scandin = this.scanstatus.data[0]
    },
    async stopscan () {
      this.scanstatus = await this.$axios.get('api/scan/stop')
      this.check4scan()
    }
  }
}
</script>

<style lang="stylus">
.alertcontainer
  position relative
  button
    right 10px
    bottom 4px
    position absolute
.spinner
  position absolute !important
  z-index 999
  top 10px
  color #ffffff !important
  left 9px
.alert
  padding-left 2em
</style>
