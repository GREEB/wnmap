<template>
  <div>
    <v-app-bar
      app
      clipped-right
      height="48"
      color="rgb(47, 49, 54)"
    >
      <v-btn v-if="dev" icon to="/" @click="unselect()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn v-if="!drawer" icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title v-if="dev && dev.hasHostname">
        {{ dev.hostname[0].hostname[0].item.name }}
      </v-toolbar-title>
      <v-btn v-if="!dev" icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon to="/json">
        <v-icon>mdi-code-json</v-icon>
      </v-btn>

      <Fetchbutton />
      <v-spacer />

      <v-alert
        v-if="scandin && scanstatus"
        class="alert justify-center pa-1 ma-0 pl-10"
        dense
        color="#2f3136"
      >
        <v-progress-circular
          class="spinner"
          :size="16"
          indeterminate
        />
        Nmap is running in a loop with
        <strong> {{ (scanstatus[1].intervaltime / 1000) / 60 }} min </strong>
        delay
        <v-btn
          class="ml-3"
          small
          @click="stopscan"
        >
          stop?
        </v-btn>
      </v-alert>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      width="300"
      color="#2F3136"
      floating
    >
      <v-navigation-drawer
        v-model="drawer"
        hide-overlay
        absolute
        color="#35393F"
        mini-variant
        width="70"
        floating
      >
        <!-- <v-avatar
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

        <v-divider class="mx-3 my-5" /> -->
        <v-btn
          v-if="!dev"
          active-class="no-active"
          class="ml-2 mt-2"
          size="28"
          icon
          to="/"
        >
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-divider class="mx-3 my-5" />
        <v-btn
          class="ml-2 mb-6"
          size="28"
          icon
          to="/users"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <Fetchbutton class="ml-2 mb-6" />
      </v-navigation-drawer>
      <v-sheet
        color="#2F3136"
        width="100%"
        class="pl-14 title menuclasss"
      >
        <v-menu
          content-class="titlemenu"
          class="titlemenu"
          :offset-y="true"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-list-item
              class="itemlist"
              dark
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-list-item-content>
                <v-list-item-title>
                  wNmap
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon>mdi-menu-down</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-sheet>
      <div style="height: calc(100% - 48px);position:relative">
        <List />
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  async fetch () {
    await this.$axios.get('api/scan/check').then((res) => {
      this.scandin = res.data[0]
      this.scanstatus = res.data
      console.log(this.scanstatus)
    })
  },
  data: () => ({
    scan: [],
    scanstatus: [],
    scandin: false,
    rounded: true,
    floating: true,
    drawer: null,
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }
    ]
  }),
  computed: {
    dev () {
      return this.$store.state.devices.selectedDevice[0]
    },
    scansta () {
      return this.$store.state.scans.scanstatus
    }
  },
  watch: {
    '$store.state.scans.scanstatus' () {
      this.$fetch()
    }
  },
  mounted () {
    this.$fetch()
  },
  activated () {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 3000) {
      this.$fetch()
    }
  },
  methods: {
    async stopscan () {
      this.scanstatus = await this.$axios.get('api/scan/stop')
      this.scandin = false
    },
    unselect () {
      const d = []
      this.$store.commit('devices/setSelectedDevice', d)
    }
  }
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
.v-btn--active.no-active::before
  display: none
</style>
