import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Openness from '@/pages/openness/Openness'
import News from '@/pages/news/News'
import Interact from '@/pages/interact/Interact'
import InteractList from '@/pages/interact/List'
import InteractDetail from '@/pages/interact/Detail'
import List from '@/pages/list/List'
import Detail from '@/pages/detail/Detail'
import Leader from '@/pages/leader/Leader'
import LeaderDetail from '@/pages/leader/Detail'
import LeaderList from '@/pages/leader/List'
import InteractionLive from '@/pages/interactionLive/InteractionLive'
import InteractionDetail from '@/pages/interactionLive/InteractionDetail'
import FbhDetail from '@/pages/interactionLive/FbhDetail'
import About from '@/pages/about/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/openness',
      name: 'Openness',
      component: Openness
    }, {
      path: '/news',
      name: 'News',
      component: News
    }, {
      path: '/interact',
      name: 'Interact',
      component: Interact
    }, {
      path: '/list/:id',
      name: 'List',
      component: List
    }, {
      path: '/detail/:branch/:id',
      name: 'Detail',
      component: Detail
    }, {
      path: '/interactList/:id',
      name: 'InteractList',
      component: InteractList
    }, {
      path: '/interactDetail/:branch/:id',
      name: 'InteractDetail',
      component: InteractDetail
    }, {
      path: '/leader',
      name: 'Leader',
      component: Leader
    }, {
      path: '/leaderDetail/:id',
      name: 'LeaderDetail',
      component: LeaderDetail
    }, {
      path: '/leaderList/:branch/:id',
      name: 'LeaderList',
      component: LeaderList
    }, {
      path: '/interactionLive/:id',
      name: 'InteractionLive',
      component: InteractionLive
    }, {
      path: '/fbhDetail/:branch/:id',
      name: 'FbhDetail',
      component: FbhDetail
    }, {
      path: '/interactionDetail/:id',
      name: 'InteractionDetail',
      component: InteractionDetail
    }, {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
