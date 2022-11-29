import { createRouter, createWebHashHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

const routes = [
  {
    path: '/',
    name: 'Start',
    component: StartView
  },
    {
    path: '/poll/:id',
    name: 'PollView',
    component: () => import(/* webpackChunkName: "about" */ '../views/PollView.vue')
  },
  {
    path: '/create/:lang',
    name: 'CreateView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateView.vue')
  },
  {
    path: '/result/:id',
    name: 'ResultView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ResultView.vue')
  },
  {
    path: '/createGame/:lang',
    name: 'createGame',
    component: () => import('../views/createGameView.vue')
  },
  {
    path: '/joinGame/:lang',
    name: 'joinGame',
    component: () => import('../views/joinGameView.vue')
  },
  {
    path: '/firstPage',
    name: 'firstPage',
    component: () => import('../views/StartViewNew.vue')
  },
  {
    path: '/lobbyView',
    name: 'lobbyView',
    component: () => import('../views/lobbyView.vue')
  },
  {
    path: '/drawView',
    name: 'drawView',
    component: () => import('../views/drawView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
