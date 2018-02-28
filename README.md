## Description
Vue权限验证插件

## Example
```
import AuthPlugin from './auth.js'

Vue.use(AuthPlugin)
AuthCode.setAuthCode([AuthCode1, AuthCode2, AuthCode3])

// template auth
<div v-auth="'AuthCode'"></div>
<div v-auth="[AuthCode1, AuthCode2]"></div>

// js auth
this.$auth('AuthCode') // return true if exists
```
