class AuthPlugin {
  static initAuthCode(authCode) {
    if (isType(authCode, 'Array')) {
      return new Map(authCode.map(e => [e, e]));
    } else if (isType(authCode, 'Map')) {
      return authCode;
    }
    return new Map()
  }

  static initAuthMap(authMap) {
    if (isType(authMap, 'Object')) {
      return new Map(Object.entries(authMap));
    } else if (isType(authMap, 'Map')) {
      return authMap;
    }
    return new Map();
  }

  constructor(options = {}) {
    const { authCode, authMap } = options;
    this.authCode = AuthPlugin.initAuthCode(authCode);
    this.authMap = AuthPlugin.initAuthMap(authMap);
  }

  verify(value) {
    if (!value || ["{}", "[]"].includes(JSON.stringify(value))) return true;
    if (typeof value === "string") {
      return this.authMap.has(value)
        ? this.verify(this.authMap.get(value))
        : this.authCode.has(value);
    } else if (Array.isArray(value)) {
      return value.some(code => this.verify(code));
    } else if (isType(value, 'Object')) {
      return Object.entries(value).every(
        ([code, condi]) => this.verify(code) === condi
      );
    }
    return false;
  }

  updateAuthCode(authCode) {
    this.authCode = AuthPlugin.initAuthCode(authCode);
  }
}

function isType(obj, type) {
  return Object.prototype.toString.call(obj) === `[object ${type}]`;
}

export default AuthPlugin;
