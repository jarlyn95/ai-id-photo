目前版本为 `v4.0+` 基于 `vue-cli` 进行构建

## Build Setup

进入项目目录
```
cd src/web
```

安装依赖
```
npm install --registry=https://registry.npm.taobao.org
```

启动服务
```
npm run dev
```

浏览器访问 [http://localhost:8080](http://localhost:8080)

## 发布

构建测试环境
```
npm run build:stage
```

构建生产环境
```
npm run build:prod
```

## 其它

预览发布环境效果
```
npm run preview
```

预览发布环境效果 + 静态资源分析
```
npm run preview -- --report
```

代码格式检查
```
npm run lint
```

代码格式检查并自动修复
```
npm run lint -- --fix
```

## Demo

[demo](https://actboy.github.io/ai-id-photo/#/id-photo)
