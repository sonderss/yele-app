export default {
  namespaced: true,
  cache: 'not',
  state: {
    intNet: false,
    a: 1,
    date:""
  },
  mutations: {
    setStatus: (state, data) => {
      state.intNet = data
    },
    setDate: (state,data) => {
      state.date = data
      console.log(state.date)
    }
  },
  actions: {
    setStatus ({ commit }, data) {
      commit('setStatus', data)
    },
    setDate ({ commit }, data) {
      commit('setDate', data)
    }
  }
}
