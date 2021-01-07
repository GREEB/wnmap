<template>
  <v-card>
    <v-card-title>
      <div>{{ selectedId }}</div>
    </v-card-title>
    <v-app id="inspire">
      <v-data-table
        item-key="_id"
        single-select
        :headers="headers"
        :items="devs"
        :items-per-page="5"
        class="elevation-1"
        @click:row="rowClick"
      />
    </v-app>
    <!--     <v-data-table
      item-key="_id"
      :headers="headers"
      :items="devies"
      hide-default-header
      hide-default-footer
    /> -->
  </v-card>
</template>
<style lang="stylus">
ul>li
  display inline
</style>
<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  submit () {
    this.$emit('inputData', this.selectedId)
  },
  async fetch () {
    const devs = await this.$axios.$get('http://localhost:4000/devices')
    this.devs = devs
    this.addTodo(devs)
  },
  data () {
    return {
      computed: mapGetters({
        devices: 'devices/devices'
      }),
      selectedId: -1,
      devs: [],
      headers: [
        {
          text: 'ipv4',
          align: 'start',
          filterable: false,
          value: 'address[0].item.addr'
        }]
    }
  },
  methods: {
    addTodo (e) {
      const text = e
      this.$store.commit('devices/add', { text })
    },
    ...mapMutations({
      toggle: 'devices/toggle'
    }),
    rowClick (item, row) {
      this.$store.commit('devices/setid', this.selectedId)
      row.select(true)
      this.selectedId = item._id
    }
  }
}
</script>
