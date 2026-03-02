import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage/index.vue'
import NotFoundPage from '../views/NotFoundPage/index.vue'
import QuizPage from '../views/QuizPage/index.vue'
import ResultPage from '../views/ResultPage/index.vue'
import TicketPage from '../views/TicketPage/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizPage,
    },
    {
      path: '/result/:type',
      name: 'result',
      component: ResultPage,
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: TicketPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
