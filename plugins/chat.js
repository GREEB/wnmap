export default (context, inject) => {
  const addMsg = (pmsg) => {
    const msg = { time: new Date().toLocaleTimeString(), msg: pmsg }
    this.$store.commit('devices/addMsg', msg)
  }

  // Inject $hello(msg) in Vue, context and store.
  inject('addMsg', addMsg)
  // For Nuxt <= 2.12, also add 👇
  context.$addMsg = addMsg
}
