# 管理平台

### 开发环境

1. 开发命令
```
npm run dev 
```

2. 发布命令

```
npm run dist
```

### 技术选型

* react
* redux
* webpack

### 业务逻辑

1. 文章管理
    + 发布
    + 修改
    + 删除
    + 存为草稿

2. 标签管理
    + 增加
    + 删除
    + 修改

### 目录结构

```
src/
 |---- actions: redux actions
 |---- common: 公共组件
 |---- constants: 常量
 |---- main: 应用入口
 |---- middlewares： redux 中间件
 |---- reduces: redux reduces
 |---- services: cgi
 |---- store: redux store
```


