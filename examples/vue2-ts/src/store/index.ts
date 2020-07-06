import Vue from 'vue'
import Vuex from 'vuex'
import todo from './modules/todo'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loading: true
  },
  getters: {
  },
  mutations: {
    update (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
  },
  modules: {
    todo
  }
})

export default store
