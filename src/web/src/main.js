import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss'

/** 引入公共js */
import './assets/js/adaptive-version2.js'

import App from './App'
import router from './router'

import '@/permission'

import * as filters from './filters'

Vue.use(ElementUI, { locale })

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$message = function(msg) {
  Message.closeAll()
  Message(msg)
}
const messageArr = ['success', 'warning', 'info', 'error']
messageArr.forEach(function(type) {
  Vue.prototype.$message[type] = function(options) {
    Message.closeAll()
    return ElementUI.Message[type](options)
  }
})
Vue.prototype.$message.close = function(id, userOnClose) {
  return ElementUI.Message.close(id, userOnClose)
}
Vue.prototype.$message.closeAll = function() {
  return ElementUI.Message.closeAll()
}
