import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'firstPage',
    component: () => import('../views/StartViewNew.vue')
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
    path: '/lobbyView/:lang/:id',
    name: 'lobbyView',
    component: () => import('../views/lobbyView.vue')
  },
  {
    path: '/drawView',
    name: 'drawView',
    component: () => import('../views/drawView.vue')
  },
  {
    path: '/guessView',
    name: 'guessView',
    component: () => import('../views/guessView.vue')
  },
  {
    path: '/hostLobbyView/:lang/:id',
    name: 'hostlobbyView',
    component: () => import('../views/hostLobbyView.vue')
  },
  {
    path: '/scoreBoard',
    name: 'scoreBoard',
    component: () => import('../views/scoreBoardAdmin.vue')
  },
  {
    path: '/createGameMobile/:lang',
    name: 'createGameMobile',
    component: () => import('../views/createGameViewMobile.vue')
  },
  {
    path: '/testView',
    name: 'testView',
    component: () => import('../views/gameView.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
