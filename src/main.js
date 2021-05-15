import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import Axios from 'axios'
import store from './store/index'

Vue.prototype.$http = Axios

const user = JSON.parse(localStorage.getItem('user'))

if (user) {
  Vue.prototype.$http.defaults.headers.common['x-access-token'] = user.token
}

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
