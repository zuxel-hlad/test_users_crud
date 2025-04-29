import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/:userId/edit-user',
            name: 'edit',
            component: async () => import('@/views/UserViews/EditUser.vue'),
        },
        {
            path: '/create-user',
            name: 'create',
            component: async () => import('@/views/UserViews/CreateUser.vue'),
        },
    ],
})

export default router
