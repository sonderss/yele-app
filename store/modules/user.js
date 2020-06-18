export default {
  namespaced: true,
  cache: 'not',
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo: (state, data) => {
      state.userInfo = data
    },
    setUserInfoAuth: (state,data) => {
      state.userInfo.apiAuth = data
    },
    setUserAccss: (state,data) => {
      state.userInfo.access = data
    },
  },
  actions: {
    setUserInfo ({ commit }, data) {
      commit('setUserInfo', data)
    },
    setUserInfoAuth ({ commit }, data) {
      commit('setUserInfoAuth', data)
    },
    setUserAccss ({ commit }, data) {
      commit('setUserAccss', data)
    }
  }
}
