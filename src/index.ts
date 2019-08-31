import AuthPlugin, { IOptions, Code } from './authPlugin'

interface IInstallOptions extends IOptions {
  name?: string
}
const plugin = {
  install(Vue: any, options: IInstallOptions = {}) {
    const pluginName = options.name || 'auth'
    const auth = new AuthPlugin(options)

    Object.defineProperty(Vue.prototype, `$_${pluginName}`, {
      get() {
        return auth
      },
    })

    Vue.directive(pluginName, {
      bind(el: HTMLElement, { value }: { value: Code }) {
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

if (typeof window !== 'undefined' && (window as any).Vue) {
  ;(window as any).Vue.use(plugin)
}

export default plugin
