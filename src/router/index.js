import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcom.vue'
import UserList from '../components/user/userList.vue'
import RoleList from '../components/permission/roleList.vue'
import Permission from '../components/permission/permission.vue'

Vue.use(VueRouter)

// 路由规则
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/user', component: UserList },
      { path: '/role', component: RoleList },
      { path: '/permission', component: Permission }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航强制跳转页面
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) return next('/login')
  return next()
})

export default router
