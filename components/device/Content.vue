<template>
  <v-container>
    <v-row>
      <v-col class="justify pa-4">
        <DeviceInfo />
      </v-col>
      <v-col class="justify pa-4">
        <DeviceScans />
      </v-col>
      <v-col class="justify pa-4">
        <DeviceOwner />
      </v-col>
      <v-col class="col-1" />
    </v-row>
  </v-container>
</template>

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
