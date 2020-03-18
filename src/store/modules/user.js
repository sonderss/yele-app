export default {
  namespaced: true,
  cache: 'not',
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo: (state, data) => {
      state.userInfo = data
    }
  },
  actions: {
    setUserInfo ({ commit }, data) {
      commit('setUserInfo', data)
    }
  }
}
