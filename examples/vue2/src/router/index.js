import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'todos',
    component: () => import(/* webpackChunkName: "todos" */ '../views/todos.vue')

    /**
     * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import
     * https://cn.vuejs.org/v2/guide/components-dynamic-async.html#处理加载状态
     * https://webpack.docschina.org/guides/code-splitting/
     * 
    */


  }  
]

const router = new VueRouter({
  routes
})

export default router
