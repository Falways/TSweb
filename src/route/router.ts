import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store';

Vue.use(Router)
/*
export default new Router({
  routes: [
    {
      path: '/',
      name: 'search',
      component: () => import(/!* webpackChunkName: "Search" *!/ '@/views/Search.vue')
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/!* webpackChunkName: "Home" *!/ '@/views/Home.vue')
    }
  ]
})*/


const routers:object[] = [
  {
    path: '/',
    name: 'search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Home.vue')
  }
]

// 路由配置
const RouterConfig:object = {
  routes: routers
};

let router:Router = new Router(RouterConfig);

export default router;
router.beforeEach((to, from ,next) => {
  if (to.name !== 'search'&& (!store.state.userName || !store.state.token) ) {
    // 未登录状态

    next({
      name:'search'
    });
  }else {
    next()
  }
})
