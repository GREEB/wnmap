<template>
  <div>
    <json-viewer
      :value="dev"
      :expand-depth="1"
      copyable
      sort
      theme="my-awesome-json-theme"
    />
  </div>
</template>
<script>
export default {
  computed: {
    dev () {
      return this.$store.state.devices.selectedDevice[0]
    }
  }
}
</script>
<style lang="scss">
.my-awesome-json-theme {
  background: #35393f;
  white-space: nowrap;
  color: #fff;
  font-size: 14px;
  font-family: Consolas, Menlo, Courier, monospace;

  .jv-ellipsis {
    color: rgb(23, 184, 157);
    background-color: rgba(238, 238, 238, 0.021);
    display: inline-block;
    line-height: 0.9;
    font-size: 0.9em;
    padding: 0px 4px 2px 4px;
    border-radius: 3px;
    vertical-align: 2px;
    cursor: pointer;
    user-select: none;
  }
  .jv-button { color: #49b3ff }
  .jv-key { color: #fff }
  .jv-item {
    &.jv-array { color: #146bbd }
    &.jv-boolean { color: #fc1e70 }
    &.jv-function { color: #067bca }
    &.jv-number { color: #fc1e70 }
    &.jv-number-float { color: #fc1e70 }
    &.jv-number-integer { color: #fc1e70 }
    &.jv-object { color: #2dcbd6 }
    &.jv-undefined { color: #e08331 }
    &.jv-string {
      color: #42b983;
      word-break: break-word;
      white-space: normal;
    }
  }
  .jv-code {
    .jv-toggle {
      &:before {
        padding: 0px 2px;
        border-radius: 2px;
      }
      &:hover {
        &:before {
          background: #eee;
        }
      }
    }
  }
}
</style>
