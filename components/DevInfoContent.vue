<template>
  <v-container>
    <v-row>
      <v-col class="justify pa-4">
        <v-card
          max-width="344"
          color="rgb(47, 49, 54)"
        >
          <v-card-text>
            <v-row>
              <v-col class="mt-2 col-2">
                <v-icon large color="warning darken-3 text-h5">
                  mdi-desktop-tower
                </v-icon>
              </v-col>
              <v-col>
                <p class="mb-0 text-h5 text--primary">
                  {{ dev.address[0].item.addr }}
                </p>
                <div v-if="dev.hasMac">
                  {{ dev.address[1].item.addr }}
                </div>
                <div v-if="dev.os !== 'No os'">
                  {{ dev.os[0].item.name }}
                </div>
              </v-col>
            </v-row>
            <div class="text--primary">
              <v-textarea
                v-model="note"
                class="mt-4 mb-0 text-body-1"
                outlined
                name="input-7-4"
                label="Note"
                rows="1"
                auto-grow
                row-height="1"
              />
              <v-btn
                color="primary"
                text
                @click="submit(dev.id)"
              >
                Save
              </v-btn>
              <v-expand-transition>
                <v-list-item
                  three-line
                  class="pa-0"
                >
                  <v-list-item-content v-if="dev.hasPorts">
                    <v-list-item-title>Open Ports</v-list-item-title>
                    <div>
                      <v-chip
                        v-for="(d, index) in sd"
                        :key="index"
                        class="mx-1 my-1"
                        color="#2f3136"
                        text-color="white"
                        style="height: 28px"
                      >
                        <v-avatar
                          style="height: 22px !important;width: 40px !important;border-radius:25px;margin-left:-6px;"
                          left
                          color="warning darken-3"
                        >
                          {{ d.item.portid }}
                        </v-avatar>
                        {{ d.service[0].item.name }}
                      </v-chip>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-expand-transition>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="justify pa-4">
        <Scans />
      </v-col>
      <v-col class="justify pa-4">
        <Owner />
      </v-col>
      <v-col class="col-1" />
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      reveal: false,
      note: ''
    }
  },
  computed: {
    getnote () {
      return this.$store.state.devices.selectedDevice[0].note
    },
    sd () {
      const e = this.$store.state.devices.selectedDevice[0].ports
      const b = e.slice().reverse()
      return b
    },
    dev () {
      return this.$store.state.devices.selectedDevice[0]
    }
  },
  mounted () {
    this.note = this.getnote
  },
  methods: {
    submit () {
      this.$axios.$post('/api/devices/note/' + this.dev.devId, {
        text: this.note
      })
    }
  }
}
</script>

<style>
textarea{
  font-size: 12px;
line-height: 2em;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
