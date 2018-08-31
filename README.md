# 养车频道 车主入口

### 项目搭建

``` bash
# 初始化项目
npm install

# 运行开发环境, 服务端端口热加载
npm run dev

# 项目打包 到 开发环境
npm run builddev

# 项目打包 到 生产环境
npm run build

```

### 本地开发
在本地开发和测试

- 打开命令行
- 执行 npm run dev
- 浏览器打开: http://localhost:8000/?openid=o9rEN0_rX4ySFsIbKi5MBL8YGnAg#/

### 上传到测试环境
- 打开命令行
- 执行项目打包 npm run builddev
- 复制 dist 目录下的文件
- 打开远程工具连接到测试服务器
- 将打包出来的文件粘贴到服务器

### 上传到生产环境
- 打开命令行
- 执行项目打包 npm run build
- 复制 dist 目录下的文件
- 覆盖到SVN http://svn.hotgz.com:3390/svn/ABY/UI/WeixinWeb/wx20
- 呼叫阿敏进行上传


## License
MIT
