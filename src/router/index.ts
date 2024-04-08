import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAgendaStore } from '@/stores/agenda.store'
import { useRoomStore } from '@/stores/room.store'
import { useTalkStore } from '@/stores/talk.store'
import { useSpeakerStore } from '@/stores/speaker.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/talk/:talkId',
      name: 'talk',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(() => {
  useRoomStore().init()
  useSpeakerStore().init()
  useTalkStore().init()
  useAgendaStore().init()
})

export default router
