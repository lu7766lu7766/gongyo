import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import FeedBack from 'components/FeedBack'
import AboutMe from 'components/AboutMe'
import Login from 'components/Login'

const Friends = {
  template: '<div>施工中...</div>'
}

// const Loading = {
//   template: '<div>Loading...</div>'
// }

const GetChanting = {
  template: '<div>施工中...</div>'
}

const routes = [
  { path: '/', component: Login},
  { path: '/feedback', component: App, children: [{ path: '', component: FeedBack}]},
  { path: '/getchanting', component: App, children: [{ path: '', component: GetChanting}]},
  { path: '/aboutme', component: App, children: [{ path: '', component: AboutMe}]},
  { path: '/friends', component: App, children: [{ path: '', component: Friends}]}
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes // same with routes: routes
})

export default router
