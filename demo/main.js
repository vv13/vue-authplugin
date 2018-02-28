import Vue from 'vue'
import App from './App.vue'
// import authPlugin from '../src'
import authPlugin from '../dist/vue-authplugin'
import authMap from './authMap'

Vue.use(authPlugin, {
  authCode: ['one', 'two', 'three', 'four'],
  authMap,
})

new Vue({
  el: '#app',
  render: (h) => h(App),
})
