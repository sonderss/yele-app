export default {
  namespaced: true,
  cache: 'not',
  state: {
    selected_products: [],
    giveAwayInfo: {}, // 限制信息
    storeSelArr: [] // 赠送商品已选商品
  },
  mutations: {
    setselected_products: (state, data) => {
      state.selected_products = data
    },
    setselected_giveAwayInfo: (state, data) => {
      state.giveAwayInfo = data
    },
    setStoreSelArr: (state, data) => {
      state.storeSelArr = data
    }
  },
  actions: {
    setselected_products ({ commit }, data) {
      commit('setselected_products', data)
    },
    setselected_giveAwayInfo ({ commit }, data) {
      commit('setselected_giveAwayInfo', data)
    },
    setStoreSelArr ({ commit }, data) {
      commit('setStoreSelArr', data)
    }
  }
}
