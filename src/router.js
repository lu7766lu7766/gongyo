import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import FeedBack from 'components/FeedBack'
import AboutMe from 'components/AboutMe'

const Friends = {
  template: '<div>friends</div>'
}

const Loading = {
  template: '<div>Loading...</div>'
}

const routes = [
  { path: '/', component: Loading},
  { path: '/feedback', component: App, children: [{ path: '', component: FeedBack}]},
  { path: '/aboutme', component: App, children: [{ path: '', component: AboutMe}]},
  { path: '/friends', component: App, children: [{ path: '', component: Friends}]}
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes // same with routes: routes
})

export default router
