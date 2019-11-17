import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        {
          path: '/chatbot',
          name: 'chatbot',
          component: () => import(/* webpackChunkName: "demo" */ './views/ChatBot.vue')
        },
        {
          path: '/cameraview',
          name: 'camera-view',
          component: () => import(/* webpackChunkName: "demo" */ './views/CameraView.vue')
        },
        {
          path: '/speechview',
          name: 'speech-view',
          component: () => import(/* webpackChunkName: "demo" */ './views/SpeechView.vue')
        },
        {
          path: '/diary',
          name: 'diary',
          component: () => import(/* webpackChunkName: "demo" */ './views/Diary.vue')
        },
        // List of products 
        {
          path: '/shoppingrecommendation',
          name: 'shoppingrecommendation',
          component: () => import(/* webpackChunkName: "demo" */ './views/ShoppingRecommendation.vue')
        },
        {
          path: '/diary-list',
          name: 'diary-list',
          component: () => import(/* webpackChunkName: "demo" */ './views/DiaryList.vue')
        },
        {
          path: '/children',
          name: 'children',
          component: () => import(/* webpackChunkName: "demo" */ './views/Children.vue')
        },
        {
          path: '/connection',
          name: 'connection',
          component: () => import(/* webpackChunkName: "demo" */ './views/Connection.vue')
        },
        {
          path: '/maps',
          name: 'maps',
          component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
        }
      ]
    }
   
  ]
})
