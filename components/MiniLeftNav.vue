<template>
  <v-navigation-drawer
    v-model="drawer"
    absolute
    color="#35393F"
    mini-variant
    width="70"
  >
    <v-avatar
      x-large
      class="d-block text-center mx-auto mt-4"
      size="36"
      color="gray darken-1"
      icon
    >
      <v-icon
        dark
        color="gray"
      >
        mdi-robot
      </v-icon>
    </v-avatar>

    <v-divider class="mx-3 my-5" />

    <v-avatar
      v-for="n in 6"
      :key="n"
      class="d-block text-center mx-auto mb-9"
      color="grey darken-3"
      size="28"
    />
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    floating: true,
    drawer: null,
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }
    ]
  })
}
</script>

<style lang="stylus" scoped>
.titlemenu
  margin 10px
  min-width 223px !important
.title
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
.subtitle
  font-size .6em !important
.main
  background-color #35393F
</style>
