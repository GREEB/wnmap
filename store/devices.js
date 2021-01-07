export const state = () => ({
  selectedDevice: [],
  selectedId: -1,
  all: [],
  msgs: []
})

export const mutations = {
  setSelectedId (state, newId) {
    state.selectedId = newId
  },
  setSelectedDevice (state, device) {
    state.selectedDevice = device
  },
  setDevices (state, devices) {
    state.all = devices
  },
  addMsg (state, pmsg) {
    const msg = { time: new Date().toLocaleTimeString(), msg: pmsg }
    state.msgs.push(msg)
  }
}
