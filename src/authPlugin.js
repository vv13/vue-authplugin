class AuthPlugin {
  constructor(options = {}) {
    this.authCode = options.authCode || []
    this.authMap = options.authMap || {}
  }

  verify(value) {
    if (!value || ['{}', '[]'].includes(JSON.stringify(value))) return true
    if (typeof value === 'string') {
      const mapValue = this.authMap[value]
      return mapValue ? this.verify(this.authMap[value]) : this.authCode.includes(value)
    } else if (Array.isArray(value)) {
      return value.some((code) => this.verify(code))
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      return Object.entries(value).every(([code, condi]) => this.verify(code) === condi)
    }
    return false
  }

  updateAuthCode(authCode) {
    this.authCode = authCode
  }
}

export default AuthPlugin
