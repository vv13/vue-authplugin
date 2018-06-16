# vue-authplugin
用于视图权限显示控制的一款轻量级Vue Plugin，支持指令、原型链等方法。

## 安装
```
$ npm install vue-authplugin
```

## 示例

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
在初始化完成后，即可使用指令或原型链的形式调用验证方法：
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
### 使用规则
验证权限参数十分灵活，具体有以下形式可使用：
- 传入String，检测权限表是否包含此权限
- 传入Array，检测权限表是否包含数组中的任意一个权限
- 传入Object，检测所有键值是否都通过校验，key为权限名称，value为是否需要此权限
- 传入映射名称，即authMap的Key，则实际检测对象为映射值


## 用法
使用this.$_auth.verify验证成功或失败，则会返回true或false；使用指令形式，验证成功，则会在dom方法上添加data-auth="success"属性，验证失败，则会添加data-auth="fail"，并设置display: none。

### 初始化
在使用Vue.use(authPlugin, options)时，options的各个选项为：

| key      | desc                      | type          | default | required |
| :------- | ------------------------- | ------------- | ------- | -------- |
| name     | 指令名与Vue原型链上的键名 | String        | auth    | false    |
| authCode | 权限表                    | Array \| Map  | []      | true     |
| authMap  | 权限验证映射表            | Object \| Map | {}      | false    |

### API
#### updateAuthCode(authCode)
- 参数
  - { Array | Map } authCode

在初始化插件以后，有时权限表会更改，这是可通过此方法来进行更新。记得在组件初始化之前调用此方法。

#### verify(code)
- 参数
  - {String | Object | Array} code
- 返回值：true or false

查找权限表，验证所需权限是否满足，若满足则返回true，否则返回false。
