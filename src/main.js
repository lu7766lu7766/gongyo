// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import router from './router'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/slidebar.css'
import './lib'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<router-view transition="slide"></router-view>',
  store,
  router,
  mounted () {
    // Promise.all([store.dispatch('GET_LEAGUE'),store.dispatch('GET_RING'),store.dispatch('GET_AREA')]).then(() => { console.log('all done'')})
    store.dispatch('GET_LEAGUE')
    store.dispatch('GET_RING')
    store.dispatch('GET_AREA')
    // console.log('main mounted') just first time
  }
})
