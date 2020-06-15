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
      console.log(state.userInfo)
    }
  },
  actions: {
    setUserInfo ({ commit }, data) {
      commit('setUserInfo', data)
    },
    setUserInfoAuth ({ commit }, data) {
      commit('setUserInfoAuth', data)
    },
  }
}
