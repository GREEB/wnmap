<template>
  <v-card
    max-width="344"
    color="rgb(47, 49, 54)"
  >
    <v-card-text>
      <v-row>
        <v-col class="mt-2 col-2">
          <v-icon large color="green darken-2 text-h5">
            mdi-account
          </v-icon>
        </v-col>
        <v-col>
          <p v-if="assignedusers.length !== 1" class="mb-0 text-h5 text--primary">
            no user
          </p>
          <p v-else class="mb-0 text-h5 text--primary" />
          <div
            v-for="(item, index) in assignedusers"
            :key="index"
          >
            {{ item }}
          </div>

          {{ assignedusers }}

          <div>
            1 user assigned to this device
          </div>
        </v-col>
      </v-row>

      <v-select
        v-if="assignedusers.length < 1"
        v-model="select"
        :items="items"
        label="Outlined style"
        outlined
        :menu-props="{ bottom: true, offsetY: true }"
      />
    </v-card-text>
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
.v-list
  background #2f3136
</style>
<script>
export default {
  async fetch () {
    // const resp = []
    const a = await this.$axios.$get('/api/users')
    this.items = Object.keys(a).map(key => a[key].name)
  },
  data () {
    return {
      select: 'test',
      scandata: [],
      model: [],
      exuser: [],
      search: null,
      items: []
    }
  },
  computed: {
    sd () {
      const e = this.$store.state.devices.selectedDevice[0].scans
      const b = e.slice().reverse()
      return b
    },
    dev () {
      return this.$store.state.devices.selectedDevice[0]
    },
    assignedusers () {
      const a = this.$store.state.devices.selectedDevice[0].owners
      return Object.keys(a).map(key => a[key].name)
    }
  },
  watch: {
    select (val) {
      this.checkinput(val)
    }
  },
  methods: {
    async checkinput (n) {
      await this.$axios.$post('/api/devices/user/' + this.dev.mId, {
        users: n
      })
      await console.log(n)
    }
    /*       console.log(this.select, this.exuser)
      if (n.length === 0 || n === this.exuser[0]) {
      } else {
        await this.$axios.$post('/api/devices/user/' + this.dev.mId, {
          users: n
        })
      } */
    // on enter
    // console.log(n)
  }

}
</script>

<style>

</style>
