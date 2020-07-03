export default {
  namespaced: true,
  cache: 'not',
  state: {
    intNet: false,
    a: 1,
    date:"",
    dev:false,
    payMethods:[]
  },
  mutations: {
    setStatus: (state, data) => {
      state.intNet = data
    },
    setDate: (state,data) => {
      state.date = data
    },
    setDev: (state,data) => {
      state.dev = data
    },
    setPayMethods: (state,data) => {
      state.payMethods = data
    }
  },
  actions: {
    setStatus ({ commit }, data) {
      commit('setStatus', data)
    },
    setDate ({ commit }, data) {
      commit('setDate', data)
    },
    setDev ({ commit },data) {
      commit('setDev',data)
    },
    setPayMethods ({ commit }, data) {
      commit('setPayMethods',data)
    }
  }
}
