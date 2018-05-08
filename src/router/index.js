import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Lhome from '@/components/front/home'
import Llogin from '@/components/front/login'
import Lregister from '@/components/front/register'
import LnewPaper from '@/components/front/newPaper'
import LuserCenter from '@/components/front/userCenter'
import Larticledetail from '@/components/front/articledetail'
import LarticleTagsList from '@/components/front/tagarticlelist'
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{
        title:'博客首页'
      },
      component: Lhome
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: Llogin
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '登录'
      },
      component: Lregister
    },
    {
      path: '/newPaper',
      name: 'newPaper',
      meta: {
        title: '登录'
      },
      component: LnewPaper
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      meta: {
        title: '登录'
      },
      component: LuserCenter
    },
    {
      path: '/articledetail',
      name: 'articledetail',
      meta: {
        title: '登录'
      },
      component: Larticledetail
    },
    {
      path:'/tagarticlelist',
      name:'tagarticlelist',
      meta:{
        title:'标签文章'
      },
      component: LarticleTagsList
    }
  ]
})
