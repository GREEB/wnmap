<template>
  <div>
    <v-row
      v-for="n in msgs"
      :key="n"
      class="msg"
      no-gutters
    >
      <v-col class="text-center overline" md="1">
        {{ n.time }}
      </v-col>
      <v-col md="11">
        {{ n.msg }}
      </v-col>
    </v-row>
    <v-footer
      app
      color="transparent"
      height="72"
      inset
    >
      <v-text-field
        v-model="input"
        background-color="#2f3136"
        dense
        flat
        solo
        label="Type Message..."
        height="50"
        @keyup.enter="onEnter"
      />
    </v-footer>
  </div>
</template>
<script>
export default {
  computed: {
    msgs () {
      return this.$store.state.devices.msgs
    }
  },
  methods: {
    onEnter () {
      this.$store.commit('devices/addMsg', this.input)
    }
  }
}
</script>
