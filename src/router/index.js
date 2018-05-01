import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Lhome from '@/components/front/home'
import Llogin from '@/components/front/login'
import Lregister from '@/components/front/register'
import LnewPaper from '@/components/front/newPaper'
import LuserCenter from '@/components/front/userCenter'
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Lhome
    },
    {
      path: '/login',
      name: 'login',
      component: Llogin
    },
    {
      path: '/register',
      name: 'register',
      component: Lregister
    },
    {
      path: '/newPaper',
      name: 'newPaper',
      component: LnewPaper
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: LuserCenter
    }
  ]
})
