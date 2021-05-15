import Vue from 'vue'
import VueRouter from 'vue-router'
import Todos from '../views/Todos.vue'
import Login from '../views/Login.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    component: Login
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(store.state.auth.status.loggedIn) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

export default router
