<template>
  <div>
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
            <!--             <v-chip
              v-if="dev.os !== 'No os'"
              style="height: 20px; font-size:12px"
              color="success darken-2"
            >
              linux
            </v-chip> -->
            <v-chip
              v-for="(d, index) in tags"
              :key="index"
              color="warning darken-3"
              text-color="white"
              style="height: 20px; font-size:12px"
            >
              {{ d.name }}
            </v-chip>
          </v-col>
        </v-row>
        <v-divider class="my-2" />
        <div v-if="dev.note" class="py-2">
          {{ dev.note }}
        </div>
        <div class="text--primary">
          <v-list-item
            three-line
            class="pa-0"
          >
            <v-list-item-content v-if="dev.hasPorts">
              <v-list-item-title>Tags</v-list-item-title>
              <div>
                <v-chip
                  v-if="dev.os !== 'No os'"
                  style="height: 25px"
                  color="success darken-1"
                >
                  {{ dev.os[0].item.name }}
                </v-chip>
                <v-chip
                  v-for="(d, index) in items"
                  :key="index"
                  class="mx-1 my-1"
                  color="primary "
                  text-color="white"
                  style="height: 25px"
                >
                  {{ d }}
                </v-chip>
              </div>
            </v-list-item-content>
          </v-list-item>

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
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="teal accent-4"
          @click="reveal = true"
        >
          Edit
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <v-card
          v-if="reveal"
          class="transition-fast-in-fast-out v-card--reveal"
          color="#2F3136"
          style="height: 100%;"
        >
          <v-card-text>
            <span class="pb-4">Editing</span>
            <v-textarea
              v-model="note"
              class="my-4 text-body-1"
              outlined
              name="input-7-4"
              label="Note"
              hint="Press enter to save"
              rows="1"
              auto-grow
              row-height="1"
            />
            <!--             <v-btn
              color="primary"
              text
              @click="submit(dev.id)"
            >
              Save
            </v-btn>
             -->
            <v-combobox
              v-model="model"
              :items="tags[0]"
              :search-input.sync="search"
              hide-selected
              outlined
              hint=""
              label="Tags"
              multiple
              small-chips
              class="mt-4"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-combobox>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn
              text
              color="teal accent-4"
              @click="submit();reveal = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reveal: false,
      note: '',
      items: ['Router', 'Programming', 'Linux', 'Windows'],
      model: [],
      search: null
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
    },
    tags () {
      return this.$store.state.devices.selectedDevice[0].tags
    }
  },
  watch: {
    model () {
      console.log(this.model)
    }
  },
  mounted () {
    this.note = this.getnote
  },
  methods: {
    async submit () {
      if (this.note !== this.getnote) { // If same dont change
        this.$axios.$post('/api/devices/note/' + this.dev.devId, {
          text: this.note
        })
      }
      if (JSON.stringify(this.model) !== JSON.stringify(this.tags)) {
        for await (const contents of this.model) {
          console.log(contents)
          await this.$axios.$post('/api/devices/tag/' + this.dev.mId, {
            text: contents
          })
        }
      }
    }
  }
}
</script>

<style>

</style>
