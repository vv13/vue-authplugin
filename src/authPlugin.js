class AuthPlugin {
  static initAuthCode(authCode) {
    if (authCode instanceof Array) {
      return new Map(authCode.map(e => [e, e]))
    } else if (authCode instanceof Map) {
      return authCode
    }
    return new Map()
  }

  static initAuthMap(authMap) {
    if (authMap instanceof Object) {
      return new Map(Object.entries(authMap))
    } else if (authMap instanceof Map) {
      return authMap
    }
    return new Map()
  }

  constructor(options = {}) {
    const { authCode, authMap } = options
    this.authCode = AuthPlugin.initAuthCode(authCode)
    this.authMap = AuthPlugin.initAuthMap(authMap) || {}
  }

  verify(value) {
    if (!value || ['{}', '[]'].includes(JSON.stringify(value))) return true
    if (typeof value === 'string') {
      return this.authMap.has(value) ? this.verify(this.authMap.get(value)) : this.authCode.has(value)
    } else if (Array.isArray(value)) {
      return value.some((code) => this.verify(code))
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      return Object.entries(value).every(([code, condi]) => this.verify(code) === condi)
    }
    return false
  }

  updateAuthCode(authCode) {
    this.authCode = AuthPlugin.initAuthCode(authCode)
  }
}

export default AuthPlugin
