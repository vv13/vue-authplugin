import authPlugin from './authPlugin'

let auth

const plugin = {
  install(Vue, options = {}) {
    auth = new authPlugin(options)
    Vue.prototype.$auth = auth.checkAuth
    Vue.directive('auth', {
      bind(el, { value }) {
        if (!auth.checkAuth(value)) {
          el.style.display = 'none'
          el.dataset.auth = 0
        }
        el.dataset.auth = 1
      },
    })
  },
  updateAuthCode(codes) {
    auth.updateAuthCode(codes)
  },
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
