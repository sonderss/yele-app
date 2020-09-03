export default {
  namespaced: true,
  cache: 'not',
  state: {
    userInfo: {},
    userInfos:{}
  },
  mutations: {
    setUserInfo: (state, data) => {
      state.userInfo = data
    },
    setUserInfoAuth: (state,data) => {
      // state.userInfo.apiAuth = data
      console.log("state.userInfo.apiAuth",state.userInfo.apiAuth)
    },
    setUserAccss: (state,data) => {
      state.userInfo.access = data
    },
    setUserInfos: (state,data) => {
      state.userInfos = data
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
    },
    setUserInfos ({ commit }, data) {
      commit('setUserInfos', data)
    }
  }
}
