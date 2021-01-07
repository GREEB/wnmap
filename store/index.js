export const state = () => ({
  globaldevices: null
})

export const mutations = {
  SET_GLOBALDEVICES (state, message) {
    state.globaldevices = message
  }
}

export const actions = {
  async nuxtServerInit ({ commit }) {
    await this.$axios.get('/api/devices').then((res) => {
      console.log('fetch from store')
      commit('SET_GLOBALDEVICES', res.data)
    })
  }
}
