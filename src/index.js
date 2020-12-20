import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import router from './router'

Vue.use(VueRouter, Vuex);

new Vue({
  el: '#app',
  router,
})
