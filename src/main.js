// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import router from './router'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/slidebar.css'
import './assets/scripts/lib'
/* eslint-disable no-new */
var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
var is_safari = navigator.userAgent.indexOf("Safari") > -1;
var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
if ((is_chrome)&&(is_safari)) {is_safari=false;}
if ((is_chrome)&&(is_opera)) {is_chrome=false;}


new Vue({
  el: '#app',
  template: '<router-view transition="slide"></router-view>',
  store,
  router,
  mounted () {
    // Promise.all([store.dispatch('GET_LEAGUE'),store.dispatch('GET_RING'),store.dispatch('GET_AREA')]).then(() => { console.log('all done'')})
    // store.dispatch('GET_LEAGUE')
    // store.dispatch('GET_RING')
    // store.dispatch('GET_AREA')
    // console.log('main mounted') just first time
    if(is_explorer) store.state.browser = 'IE'
    if(is_firefox) store.state.browser = 'Firefox'
    if(is_chrome) store.state.browser = 'Chrome'
    if(is_opera) store.state.browser = 'Opera'
    if(is_safari) store.state.browser = 'Safari'
    window.scrollTo(0, 1)
  }
})
