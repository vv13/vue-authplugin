import Vue from 'vue'
import App from './App.vue'
import authPlugin from '../lib/auth'

Vue.use(authPlugin)

new Vue({
  el: '#app',
  render: h => h(App)
})
