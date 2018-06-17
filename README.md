# vue-authplugin
[![npm](https://img.shields.io/badge/npm-0.2.3-blue.svg)](https://www.npmjs.com/package/vue-authplugin)
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/vv13/vue-authplugin/blob/master/LICENSE)


an elegant view auth control plugin, support directive and prototype methods.

## Installation
```
$ npm install vue-authplugin
```

## Demo

```
import authPlugin from 'vue-authplugin'

Vue.use(authPlugin, {
    authCode: [101, 102, 103, 104, 105],
    authMap: new Map([
      ['AUTH_LOGIN', 101],
      ['AUTH_SUBMIT', [102, 103]],
    ])
})
```
after init, we can use directives or methods in template:
```
<template>
  <!-- show Login btn if 101 is exists -->
  <button v-auth="'101'">Login</button>
  <!-- AUTH_LOGIN is Map to 101 -->
  <button v-auth="'AUTH_LOGIN'">Login</button>

  <!-- show Submit1 btn if 102 or 103 is exists -->
  <button v-auth="[102, 103]">Submit1</button>
  <button v-auth="'AUTH_SUBMIT'">Submit2</button>

  <!-- show Fetch btn if 105:exist and 106:miss -->
  <button v-if"$_auth.verify({105: true, 106: false})">Fetch</button>
</template>
```
### verify(code)
The verify parameter is very flexible. It can be used in the following ways:
- Pass in String and check if the authCode contains this code.
- Pass Array to check if the authCode contains any of the code in the array
- Pass in Object, check whether all key values pass the check, key is the auth name, and value is whether this permission is needed
- Pass the key of authMap, the actual check  detection object is the mapped value


## Usage
If you use `this.$_auth.verify` to verify the success or failure, it will return true or false; using the directives `v-auth`, if the verify is successful, the `data-auth="success"` attribute will be added to the dom method. If the verification fails, data will be added. `data-auth="fail"` and set `display: none`.

### Init
For init plugin, below is the options can be configure:

| key      | desc                      | type          | default | required |
| :------- | ------------------------- | ------------- | ------- | -------- |
| name     | v-{name} and prototype $_{name} | String        | auth    | false    |
| authCode | auth table                | Array \| Map  | []      | true     |
| authMap  | mapping table           | Object \| Map | {}      | false    |

### Methods
#### updateAuthCode(authCode)
- Arguments
  - { Array | Map } authCode

Sometimes authCode would change, so can use it to update authCode. Remember to use it before the beforeCreate lifecycle or beffore

#### verify(code)
- Arguments
  - {String | Object | Array} auth
- Return
  - true or false

Find the authCode, verify that the required code are satisfied, return true if it is satisfied, otherwise return false.
