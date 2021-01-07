<template />

<script>
export default {
  data: () => ({
    rounded: true,
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
