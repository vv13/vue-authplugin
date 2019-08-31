export type CodeRaw = string | number
export type Code = CodeRaw | CodeRaw[] | { [index: string]: boolean }
export interface IOptions {
  authCode?: CodeRaw[]
  authMap?: { [index: string]: Code } | Map<string, Code>
}

class AuthPlugin {
  private static initAuthCode(authCode: any): Map<any, any> {
    if (isType(authCode, 'Array')) {
      return new Map(authCode.map((e: CodeRaw) => [e, e]))
    } else if (isType(authCode, 'Map')) {
      return authCode
    }
    return new Map()
  }

  private static initAuthMap(authMap: any): Map<string, Code> {
    if (isType(authMap, 'Object')) {
      return new Map(Object.entries(authMap))
    } else if (isType(authMap, 'Map')) {
      return authMap
    }
    return new Map()
  }

  public authCode: Map<CodeRaw, CodeRaw>
  public authMap: Map<any, Code>

  constructor(options: IOptions = {}) {
    const { authCode, authMap } = options
    this.authCode = AuthPlugin.initAuthCode(authCode)
    this.authMap = AuthPlugin.initAuthMap(authMap)
  }

  public verify(value: Code): boolean {
    if (!value || ['{}', '[]'].includes(JSON.stringify(value))) return true
    if (['string', 'number'].includes(typeof value)) {
      return this.authMap.has(value)
        ? this.verify(this.authMap.get(value) || '')
        : this.authCode.has(value as CodeRaw)
    } else if (Array.isArray(value)) {
      return value.some((code: Code) => this.verify(code))
    } else if (isType(value, 'Object')) {
      return Object.entries(value).every(
        ([code, condi]) => this.verify(code) === condi
      )
    }
    return false
  }

  public updateAuthCode(authCode: CodeRaw[]) {
    this.authCode = AuthPlugin.initAuthCode(authCode)
  }
}

function isType(obj: any, type: string) {
  return Object.prototype.toString.call(obj) === `[object ${type}]`
}

export default AuthPlugin
