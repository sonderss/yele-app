export default {
  namespaced: true,
  cache: 'not',
  state: {
    selected_products: [],
    giveAwayInfo: {}
  },
  mutations: {
    setselected_products: (state, data) => {
      state.selected_products = data
    },
    setselected_giveAwayInfo: (state, data) => {
      state.giveAwayInfo = data
    }
  },
  actions: {
    setselected_products ({ commit }, data) {
      commit('setselected_products', data)
    },
    setselected_giveAwayInfo ({ commit }, data) {
      commit('setselected_giveAwayInfo', data)
    }
  }
}
