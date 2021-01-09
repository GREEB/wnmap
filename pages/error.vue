<template>
  <v-container fill-height>
    <v-layout row wrap align-center>
      <v-flex class="text-center">
        <h1 v-if="error.statusCode === 404" class="align-center">
          <v-btn icon to="/" style="font-size:1em">
            <v-icon>
              mdi-arrow-left
            </v-icon>
          </v-btn>
          {{ pageNotFound }}
        </h1>
        <h1 v-else>
          {{ otherError }}
        </h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'Page Not Found',
      otherError: 'An error occurred, dummy'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 2.5em;
}
</style>
