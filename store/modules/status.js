export default {
  namespaced: true,
  cache: 'not',
  state: {
    intNet: false,
    a: 1,
    date:"",
    dev:false,
    payMethods:[],
    isGetUser:false,
    bookTime:[],
    vipUser:false,
    vipUrl:''
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
    },
    setisGetUser: (state,data) => {
      state.isGetUser = data
      console.log(state.isGetUser)
    },
    setBookTime: (state,data) => {
      state.bookTime = data
    },
    setvipUser: (state,data) => {
      state.vipUser = data
    },
    setvipUrl: (state,data) => {
      state.vipUrl = data
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
    },
    setisGetUser ({ commit }, data) {
      commit('setisGetUser',data)
    },
    setBookTime ({ commit },data) {
      commit('setBookTime',data)
    },
    setvipUser ({ commit }, data) {
      commit('setvipUser',data)
    },
    setvipUrl ({ commit }, data) {
      commit('setvipUrl',data)
    }
  }
}
