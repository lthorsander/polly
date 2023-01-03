import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'firstPage',
    component: () => import('../views/firstPage.vue')
  },
 
  {
    path: '/createGame/:lang',
    name: 'createGame',
    component: () => import('../views/createGameView.vue')
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
    path: '/game/:lang',
    name: 'gameView',
    component: () => import('../views/gameView.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
