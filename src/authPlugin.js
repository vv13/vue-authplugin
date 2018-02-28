class AuthPlugin {
  constructor(options = {}) {
    this.authCode = options.authCode || []
    this.authMap = options.authMap || {}
    this.checkAuth = this.checkAuth.bind(this)
    this.updateAuthCode = this.updateAuthCode.bind(this)
  }

  checkAuth(value) {
    if (!value || ['{}', '[]'].includes(JSON.stringify(value))) return true
    if (typeof value === 'string') {
      const mapValue = this.authMap[value]
      return mapValue ? this.checkAuth(this.authMap[value]) : this.authCode.includes(value)
    } else if (Array.isArray(value)) {
      return value.some((code) => this.checkAuth(code))
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      return Object.entries(value).every(([code, condi]) => this.checkAuth(code) === condi)
    }
    return false
  }

  updateAuthCode(codes) {
    this.authCode = codes
  }
}

export default AuthPlugin
