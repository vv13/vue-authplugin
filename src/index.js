import AuthPlugin from './authPlugin'

const plugin = {
  install(Vue, options = {}) {
    const pluginName = options.name || 'auth'
    const auth = new AuthPlugin(options)

    Object.defineProperty(Vue.prototype, `$_${pluginName}`, {
      get () { return auth }
    })

    Vue.directive(pluginName, {
      bind(el, { value }) {
        if (!auth.verify(value)) {
          el.style.display = 'none'
          el.dataset[pluginName] = 'fail'
        } else {
          el.dataset[pluginName] = 'success'
        }
      },
    })
  },
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
