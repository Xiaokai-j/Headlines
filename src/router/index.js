import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '@/views/login'
import Homes from '@/views/home/homes'
Vue.use(VueRouter)
const routes = [
  {
    // 强制跳转
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 在一级路由表下 childer 配置二级路由表
    children: [
      {
        // 二级路由的path   什么都不写代表二级路由表的默认组件
        path: '',
        component: Homes // 默认的二级路由组件
      }, {
        // path:'/home/comment'  完整地址 评论列表的地址
        path: 'comment', // 简写地址

        component: () => import('@/views/comment')// 按需加载的方式
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
//   {
//     // 按需加载
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
]

const router = new VueRouter({
  routes
})

export default router
