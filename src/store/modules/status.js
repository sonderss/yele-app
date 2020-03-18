export default {
  namespaced: true,
  cache: 'not',
  state: {
    intNet: false,
    a: 1
  },
  mutations: {
    setStatus: (state, data) => {
      state.intNet = data
    }
  },
  actions: {
    setStatus ({ commit }, data) {
      commit('setStatus', data)
    }
  }
}
