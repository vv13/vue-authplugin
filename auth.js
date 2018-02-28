/* eslint-disable no-param-reassign */

let authCode = []
let authMap = {}

function checkAuth(value, auths = authCode) {
  if (!value || ['{}', '[]'].includes(JSON.stringify(value))) return true
  if (typeof value === 'string') {
    if (authMap[value]) {
      return checkAuth(authMap[value])
    }
    return auths.includes(value)
  } else if (Array.isArray(value)) {
    return value.some((code) => checkAuth(code))
  } else if (Object.prototype.toString.call(value) === '[object Object]') {
    return Object.entries(value).every(([code, condi]) => checkAuth(code) === condi)
  }
  return false
}

export default {
  install(Vue, { authCode: _authCode, authMap: _authMap }) {
    if (_authCode) authCode = _authList
    if (_authMap) authMap = _authMap

    Vue.prototype.$auth = checkAuth.bind(this)
    Vue.directive('auth', {
      bind(el, { value }) {
        if (!checkAuth(value)) {
          el.style.display = 'none'
          el.dataset.auth = 0
        }
        el.dataset.auth = 1
      },
    })
  },

  setAuthCode(codes) {
    authCode = codes
  },
}
