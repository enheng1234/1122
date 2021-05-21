import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import browser from './utils/browser'

// 加载vant合心组件库
import Vant from 'vant'
// 加载vant全局样式
import 'vant/lib/index.css'
import 'amfe-flexible'

// 注册vant组件库
Vue.use(Vant)
Vue.prototype.browser = browser

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
