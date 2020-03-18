# yele-store

编码：

> 最好使用 `vscode` 编辑器
>
> 源码也上传了项目 `vscode eslint`配置
>
> 如果不需要请删除  `.vscode` 文件夹



## Router使用方式:

在页面添加 `navigate`类型是 `Array` 对应值是：`['navigateTo', 'switchTab', 'reLaunch', 'redirectTo']`

用法

```js
// 文件目录 pages/home/index.vue


export default {
  navigate: ['navigateTo']
}
// 会生成 navigateTo 跳转的方式
// 会生成 name 值为 所在文件夹的名称(home)

export default {
  navigate: ['navigateTo', 'switchTab']
}
// 会生成navigateTo、switchTab跳转的方式
// 会生成两条数据
// navigateTo 对应 name 值为 所在文件夹的名称(home)
// switchTab 对应 name 值为 所在文件夹的名称(swhome)

// 其他方式对应值
// reLaunch 对应 name 值为 所在文件夹的名称(relhome)
// redirectTo 对应 name 值为 所在文件夹的名称(redhome)

```

```js
this.$minRouter.push({
	// 这里的 name 对应上面生成的 name 值
    name: 'home',
    // params 是页面传参类型最好是 Object
    params: { id: 1 }
})


// 不传参时可以直接如下写法
this.$minRouter.push('swhome')


// 获取页面参数
this.$parseURL()

```

项目中文件目录 `router/index.js` 

可以设置路由拦截用法和 `Vue` 全局前置钩子类似

## Request使用方式

文件目录 `api/index`

基本配置都在这里，最好不要乱动这个文件

需要添加新的请求需要在文件夹 `api` 下面建文件

按如下形式编写

```js
import { minRequest } from './index'

export default {
  /**
   * @description 描述信息
   */
  uniapp (data) {
    return minRequest.get('/s', data)
  },
  /**
   * @description post请求
   */
  puniapp (data) {
    return minRequest.post('/s', data)
  }
}
```

```js
// 在页面中
this.$minApi.uniapp({ wd: 'uni-app' })
this.$minApi.puniapp({ wd: 'uni-app' })
```

## Store使用方式

文件目录 `store/`

和Request使用方式类似

新建文件必须使用命名空间 `namespaced: true`

还有一个可选参数 `cache` 值是 `String` 类型的

```js
export default {
    namespaced: true,
	cache: 'local'
}
```

local 表示使用localStorage缓存

默认不缓存

## `min-cache`缓存使用方式

| 事件名 |                             参数                             |             说明             |       返回值       |
| :----: | :----------------------------------------------------------: | :--------------------------: | :----------------: |
|  set   | 缓存的key，缓存的数据, 缓存时间，默认缓存300s, timeout设置为0表示永久缓存（但是没必要，如果有需要请使用Vuex） |         设置缓存数据         |      Map集合       |
|  get   |                          缓存的key                           | 获取数据(缓存过期将返回null) | 返回缓存的数据data |
|  has   |                          缓存的key                           |            检查值            |     true/false     |
| delete |                          缓存的key                           |           删除数据           |     true/false     |
| clear  |                              -                               |         清空缓存数据         |     true/false     |

```js
// 缓存数据
this.$cache.set('name', 'MinCache')

// 获取数据
this.$cache.get('name')
```

## 组件

- `min-btn`

|   参数   |  类型   | 默认值 |     可选值     |
| :------: | :-----: | :----: | :------------: |
|   long   | Boolean | false  |  true、false   |
|  inline  | Boolean | false  |  true、false   |
| hairline | Boolean | false  |  true、false   |
|   type   | String  | theme  |     theme      |
|  shape   | String  | square | square、circle |
|   size   | String  |   sm   |     xs、sm     |
| disabled | Boolean | false  |  true、false   |

- `min-avatar`

|   参数   |  类型  |   默认值   |     可选值     |
| :------: | :----: | :--------: | :------------: |
|  shape   | String |   circle   | circle、square |
|   size   | String |     xs     |   xs、sm、md   |
|   url    | String |     -      |       -        |
| errorUrl | String |            |       -        |
|   mode   | String | aspectFill |  参考uni-app   |

- `min-message`

| 参数        | 类型    | 默认值  | 可选值                        |
| ----------- | ------- | ------- | ----------------------------- |
| type        | String  | success | success、error、warning、info |
| content     | String  | -       | -                             |
| duration    | Number  | 2500    | -                             |
| isAutoClose | Boolean | true    | true、false                   |

```js
// 引入组件
<min-message ref="msg"></min-message>

// 调用方式
this.$refs.msg.open({
    type: 'success',
    content: 'hello world',
    duration: 3000,
    isAutoClose: true
})
```

- `min-badge`

|   参数   |  类型   | 默认值 |   可选值    |
| :------: | :-----: | :----: | :---------: |
|   dot    | Boolean | false  | true、fasle |
|  count   | Number  |   0    |      -      |
| maxCount | Number  |   99   |      -      |

- `min-action-sheet`

|    属性    |                说明                |   类型   | 默认值 |
| :--------: | :--------------------------------: | :------: | :----: |
|    asID    |              组件标识              |  String  |   as   |
| showCancel |          是否显示取消按钮          | Boolean  |  true  |
| cancelText |           取消按钮的文案           |  String  |  取消  |
| maskClose  |     点击遮罩层是否可以关闭组件     | Boolean  |  true  |
|  actions   |    按钮组，具体项参照后面的表格    |  Array   |   []   |
|  success   |       组件调用成功的回调函数       | function |   -    |
|    slot    | slot插槽，标题栏，可以添加提示信息 |   slot   |   -    |

`actions` 说明

|  属性   |                    说明                    |  类型  | 默认值 |
| :-----: | :----------------------------------------: | :----: | :----: |
|  name   |                  按钮文案                  | String |   -    |
|  color  |               按钮文字的颜色               | String |   -    |
|  icon   |                  按钮图标                  | String |   -    |
|  image  |                  按钮图片                  | String |   -    |
| loading | 按钮是否显示为加载中（开启loading必须为0） | Number |   -    |

`success` 返回值

|    属性    |                  说明                  |   类型   |
| :--------: | :------------------------------------: | :------: |
|    asID    |                组件标识                |  String  |
|     id     |                按钮标识                |  Number  |
| handleHide | 回调函数关闭组件(loading必须为0才会有) | function |

- `min-modal`

|     属性     |             说明             |   类型   | 默认值  |
| :----------: | :--------------------------: | :------: | :-----: |
|   modalID    |           组件标识           |  String  |  modal  |
|    title     |             标题             |  String  |    -    |
|   content    |             内容             |  String  |    -    |
|  showCancel  |       是否显示取消按钮       | Boolean  |  true   |
| cancelColor  |      取消按钮的文字颜色      |  String  | #1c2438 |
|  cancelText  |        取消按钮的文案        |  String  |  取消   |
| confirmColor |      确认按钮的文字颜色      |  String  | #007aff |
| confirmText  |        确定按钮的文案        |  String  |  确定   |
|  actionMode  |        按钮的排列方向        | Boolean  |  true   |
|  maskClose   |  点击遮罩层是否可以关闭组件  | Boolean  |  false  |
|   actions    | 按钮组，具体项参照后面的表格 |  Array   |   []    |
|   success    |    组件调用成功的回调函数    | function |    -    |
|     slot     | slot插槽内容对应content属性  |   slot   |    -    |

`actions` 说明

|  属性   |                    说明                    |  类型  |      |
| :-----: | :----------------------------------------: | :----: | :--: |
|  name   |                  按钮文案                  | String |  -   |
|  icon   |                  按钮图标                  | String |  -   |
|  image  |                  按钮图片                  | String |  -   |
|  color  |               按钮文字的颜色               | String |  -   |
| loading | 按钮是否显示为加载中（开启loading必须为0） | Number |  -   |

`success` 返回值

|    属性    |                  说明                  |   类型   |
| :--------: | :------------------------------------: | :------: |
|  modalID   |                组件标识                |  String  |
|     id     |                按钮标识                |  Number  |
| handleHide | 回调函数关闭组件(loading必须为0才会有) | function |

- `min-cell-item`

| 参数   | 类型    | 默认值 | 可选值      |
| ------ | ------- | ------ | ----------- |
| img    | String  | -      | -           |
| title  | String  | -      | -           |
| label  | String  | -      | -           |
| tail   | String  | -      | -           |
| border | Boolean | true   | true、false |
| arrow  | Boolean | fasle  | true、false |
|tailType| String  | gray   | gray、black 、green、red |

