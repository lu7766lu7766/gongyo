import Vue from 'vue'
import VueRouter from 'vue-router'
import FeedBack from 'components/FeedBack'
import AboutMe from 'components/AboutMe'

const Friends = {
  template: '<div>friends</div>'
}

const routes = [
{ path: '/', component: FeedBack },
{ path: '/aboutme', component: AboutMe },
{ path: '/friends', component: Friends }
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes // same with routes: routes
})

export default router
