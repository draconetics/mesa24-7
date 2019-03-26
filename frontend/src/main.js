import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// bootstrap-vue
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'

import VueSession from 'vue-session';


Vue.use(BootstrapVue)
Vue.use(VueSession,{persist:true});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
