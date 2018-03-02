# vue-authplugin
它是一个用于前端权限验证权限的Vue插件(通常用于验证登录下发的权限集合数组)，核心代码主要使用es6实现，可直接移植到其他框架中。

[English](./README_EN.md)

## 安装
使用npm：
```
$ npm install git+ssh://git@gitlab.intra.knownsec.com:weixin/vue-auth.git
```
通过浏览器：
```
<script src="lib/vue-authplugin.js"></script>
```

## 开发
- 开发：`npm run dev`
- 编译：`npm run build`
- 打包组件：`npm run build:umd`

## 参数
通过Vue.plugin使传入的options进行构造整个插件结构，其中options一些可配置项为：
```
{
  authCode: [], // 账户所拥有权限列表
  authMap: {}, // 权限映射表
  vName: '', // 指令名称，默认为'auth'
}
```

## API
#### updateAuthCode
通过此API可更新项目的权限列表，可用于以下场景：
1. 进入组件之前，在beforeCreate里调用此方法更新内存中的权限列表，此时权限组件才会生效
2. 在路由钩子的beforeEnter中，当获取到新的权限表后，可先进行更新插件权限表，再进行路由跳转
