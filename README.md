# vue-authplugin
一款用于验证用户权限表是否包含所需权限的Vue插件，它具有以下特性：

1. 核心逻辑不到20行，由es6 class编写，稍微修改即可在其他框架中使用
2. 支持复杂的权限验证逻辑，可使用String、Array、Object或嵌套类型进行权限验证
3. 提供权限映射表机制，即可在一个文件中对前端权限进行管理，方便管理维护





## 安装
使用npm：
```
$ npm install git+ssh://git@gitlab.intra.knownsec.com:weixin/vue-auth.git
```


通过浏览器：

```
<script src="lib/vue-authplugin.js"></script>
```

插件成功加载后，会创建一个`window.authPlugin`对象，可使用其对象更新权限表。



## 初始化

通过Vue.plugin传入的options对象进行构造整个插件结构：

| key      | desc                      | default | required |
| :------- | ------------------------- | ------- | -------- |
| authCode | 权限表                    | []      | true     |
| name     | 指令名与Vue原型链上的键名 | auth    | false    |
| authMap  | 权限验证映射表            | {}      | false    |

还有一些你可能会用到的**API**:

#### updateAuthCode(authCode)

- 参数
  - {Array} authCode
- 用法
  - 进入组件之前，在beforeCreate里调用此方法更新内存中的权限表，此时权限组件才会生效
  - 在路由钩子的beforeEnter中，当获取到新的权限表后，可先进行更新插件权限表，再进行路由跳转
  - 若使用script标签加载，则必须通过此方法进行权限表初始化



#### check(auth)

- 参数
  - {String | Object | Array} auth
- 返回值：true or false
- 用法
  - 在js中进行验证权限





## 用法

1. 初始化插件

   ```
   // ...
   import authPlugin from 'vue-auth-plugin'

   Vue.use(authPlugin, {
       authCode: [101, 102, 103, 104, 105],
       authMap: {
           AUTH_LOGIN: '101',
           AUTH_SUBMIT: [102, 103]
       }
   })
   ```

2. 验证权限

   可以通过v-auth指令或Vue原型链上的$_auth.verify方法进行权限验证，参数说明如下：

   - 传入String，检测权限表是否包含此权限
   - 传入Array，检测权限表是否包含数组中的任意一个权限
   - 传入Object，检测所有键值是否在权限表中符合要求，若传入：`{101: true, 102: false}`，则要求权限表中必须包含101，不能包含102，此时验证才会通过
   - 传入authMap的Key，则会获取映射表中实际的值，如上述初始化方法，传入AUTH_SUBMIT字符串，实际上传入的值是[102, 103]

   若使用this.$_auth.verify验证成功或失败，则会返回true或false；使用指令形式，验证成功，则会在dom方法上添加data-auth="success"属性，验证失败，则会添加data-auth="fail"，并设置display: none。

   ​

   使用示例：

    ```
    <template>
        <button v-auth="'101'">Login</button>
        <button v-auth="[102, 103]">Submit1</button>
        <button v-auth="'AUTH_SUBMIT'">Submit2</button>
        <button v-if"$_auth.verify({105: true, 106: false})">Fetch</button>
    </template>
    ```





## 开发

- 开发：`npm run dev`
- 编译demo：`npm run build`
- 打包lib：`npm run build:umd`



