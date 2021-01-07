<template>
  <v-navigation-drawer
    app
    clipped
    right
    color="#2F3136"
    floating
  >
    <v-timeline
      style="height:100%"
      dense
      clipped
    >
      <v-slide-x-transition
        group
      >
        <v-timeline-item
          v-for="event in sd"
          :key="event"
          class="mb-4"
          :color="event.status == true ? 'green' : 'red'"
          small
        >
          <v-row justify="space-between">
            <v-col
              cols="7"
              v-text="event.time"
            />
          </v-row>
          <ul>
            <li
              v-for="b in event.scans"
              :key="b"
            >
              {{ b.time }}
            </li>
          </ul>
        </v-timeline-item>
      </v-slide-x-transition>

      <v-timeline-item
        class="mb-6"
        hide-dot
      >
        <span>Scans</span>
      </v-timeline-item>

      <v-timeline-item
        class="mb-4"
        small
      >
        <v-row justify="space-between">
          <v-col
            class="text-right"
            cols="8"
          >
            15:25 EDT
          </v-col>
        </v-row>
      </v-timeline-item>
      <v-timeline-item
        class="mb-4"
        small
      >
        <v-row justify="space-between">
          <v-col
            class="text-right"
            cols="8"
          >
            15:25 EDT
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
    {{ timeline() }}
  </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      scandata: []
    }
  },
  computed: {
    sd () {
      return this.$store.state.devices.selectedDevice[0].scans
    }
  },
  methods: {
    timeline () {
      /* const d = this.$store.state.devices.selectedDevice[0].scans
            for (const key in d) {
        if (Object.hasOwnProperty.call(d, key)) {
          const element = d[key]
        }
      } */
      // return 'test'
    }
  }

}
</script>

<style>

</style>
