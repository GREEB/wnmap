<template>
  <div>
    {{ }}
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
  </div>
</template>

<script>
export default {
  computed: {
    msgs () {
      return this.$store.state.devices.msgs
    }
  }
}
</script>

<style lang="stylus" scoped>
.msg
    line-height 2em
    padding: .3em 0em;
.msg
    &:hover
        background-color #3a4048
</style>
