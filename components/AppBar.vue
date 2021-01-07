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
      <v-toolbar-title v-if="dev">
        {{ dev.hostname[0].hostname[0].item.name }}
      </v-toolbar-title>
      <v-btn v-if="!dev" icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon to="/chat">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon to="/json">
        <v-icon>mdi-code-json</v-icon>
      </v-btn>
      <v-btn icon to="/users">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
      <Fetchbutton />

<!--       <UserDialog />
 -->      <v-spacer />

      <v-responsive max-width="156">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
        />
      </v-responsive>
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
  }),
  computed: {
    dev () {
      return this.$store.state.devices.selectedDevice[0]
    }
  },
  methods: {
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
</style>
