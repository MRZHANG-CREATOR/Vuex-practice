import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios' // 请求是异步操作
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [], // 任务列表
    inputValue: 'aaa', // 文本框
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList (state, list) { // 初始化数据
      state.list = list
    },
    setInputValue (state, value) { // 为inputValue赋值
      state.inputValue = value
    },
    addItem (state) {
      const obj = {
        id: state.list.length,
        info: state.inputValue,
        done: false
      }
      state.list.push(obj)
    },
    removeItem (state, id) {
      // 找对应项索引
      const i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    changeStatus (state, param) {
      const i = state.list.findIndex(v => v.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    cleanDone (state) {
      state.list = state.list.filter(v => v.done === false)
    },
    changeViewKey (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  getters: {
    unDoneLength (state) {
      return state.list.filter(v => v.done === false).length
    },
    infoList (state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(v => !v.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(v => v.done)
      }
      return state.list
    }
  },
  modules: {
  }
})
