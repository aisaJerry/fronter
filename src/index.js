import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import routes from './routerMap.js'
// import store from './store/store.js'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter, Vuex);
// Vue.use(ElementUI);

const router = new VueRouter({routes,});

/*路由缓存*/
// router.beforeEach((to, from, next) => {
//   store.commit('addHistory', to.path)
//   next();
// })

new Vue({
  el: '#app',
  router,
})
