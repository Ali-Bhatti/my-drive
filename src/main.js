import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import '@babel/polyfill'

Vue.config.productionTip = false;

Vue.component("navbar", './components/Layout/Navbar.vue');
Vue.component("base-button", './components/UI/BaseButton.vue');

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
