import * as Api from '../../api/index'
import axios from '../../tools/axios.ts'

export default {
  namespaced: true,
  state: {
    todoList: []
  },
  mutations: {
    update (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    async getTodos ({ commit }, params) {
      try {
        const data = await axios.get(Api.getTodos, {
          params
        })
        if (data.code == 0) {
          console.log('getTodos', data)
          commit('update', {
            loading: false
          }, { root: true })
          commit('update', {
            todoList: data.data.list
          })
          return data
        }
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
