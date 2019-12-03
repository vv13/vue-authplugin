# vue-authplugin
[![npm](https://img.shields.io/badge/npm-0.2.3-blue.svg)](https://www.npmjs.com/package/vue-authplugin)
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/vv13/vue-authplugin/blob/master/LICENSE)


an elegant view auth control plugin, support directive and prototype methods.

## Installation
```sh
$ npm install vue-authplugin
```

## Demo

```js
import authPlugin from 'vue-authplugin'

Vue.use(authPlugin, {

    permissionCode: [101, 102, 103, 104, 105],
    permissionCodeMap: new Map([
      ['AUTH_LOGIN', 101],
      ['AUTH_SUBMIT', [102, 103]],
    ])
})
```
after init, we can use directives or methods in template:
```vue
<template>
  <!-- show Login btn if 101 is exists -->
  <button v-auth="'101'">Login</button>
  <!-- AUTH_LOGIN is Map to 101 -->
  <button v-auth="'AUTH_LOGIN'">Login</button>

  <!-- show Submit1 btn if 102 or 103 is exists -->
  <button v-auth="[102, 103]">Submit1</button>
  <button v-auth="'AUTH_SUBMIT'">Submit2</button>
</template>
```
### check(code)
The check parameter is very flexible. It can be used in the following ways:
- Pass in String and check if the permissionCode contains this code.
- Pass Array to check if the permissionCode contains any of the code in the array
- Pass in Object, check whether all key values pass the check, key is the auth name, and value is whether this permission is needed
- Pass the key of permissionCodeMap, the actual check  detection object is the mapped value


## Usage
If you use `this.$_auth.check` to check the success or failure, it will return true or false; using the directives `v-auth`, if the check is successful, the `data-auth="success"` attribute will be added to the dom method. If the verification fails, data will be added. `data-auth="fail"` and set `display: none`.

### Init
For init plugin, below is the options can be configure:

| key      | desc                      | type          | default | required |
| :------- | ------------------------- | ------------- | ------- | -------- |
| name     | v-{name} and prototype $_{name} | String        | auth    | false    |
| permissionCode | auth table                | Array   | []      | true     |
| permissionCodeMap  | mapping table           | Object  | {}      | false    |

### Methods
#### initPermissionCode(permissionCode)
- Arguments
  - { Array | Map } permissionCode

Sometimes permissionCode would change, so can use it to update permissionCode. Remember to use it before the beforeCreate lifecycle or beffore

#### check(code)
- Arguments
  - {String | Object | Array} auth
- Return
  - true or false

Find the permissionCode, check that the required code are satisfied, return true if it is satisfied, otherwise return false.
