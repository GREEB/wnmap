<template>
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
</template>

<script>
export default {
  methods: {
    onEnter () {
      this.$store.commit('devices/addMsg', this.input)
    }
  }
}
</script>

<style>

</style>
