import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import moment from 'moment'

// axios.defaults.baseURL = 'http://192.168.0.104:19531/spy/api/v1'
// axios.defaults.baseURL = 'http://39.97.220.46:6000/api/v1'
axios.defaults.baseURL = 'http://sping.site/spy/api/v1'
Vue.prototype.$http = axios
Vue.config.productionTip = false

// 通过axios请求拦截器添加token，保证拥有获取数据的权限
axios.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token')
  return config
})

Vue.filter('formatTime', function(data, timeset = 'YYYY-MM-DD HH:mm:ss') {
  return moment(data).format(timeset)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
