
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);


import axios from './lib/interceptor.js'
Vue.prototype.$http = axios;
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // window.document.title = to.mata.title;
  console.log(window.document.titlee)
  next();
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
