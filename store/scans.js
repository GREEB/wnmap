export const state = () => ({
  scanstatus: []
})

export const mutations = {
  setScanStatus (state, newId) {
    state.scanstatus = newId
  }

}
