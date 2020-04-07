export default {
  namespaced: true,
  cache: 'not',
  state: {
    selected_products: []
  },
  mutations: {
    setselected_products: (state, data) => {
      state.selected_products = data
    }
  },
  actions: {
    setselected_products ({ commit }, data) {
      commit('setselected_products', data)
    }
  }
}
