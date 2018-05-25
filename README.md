# 养车频道 车主入口

## 项目依赖

- [node.js](http://nodejs.cn/)
- [Vue](https://cn.vuejs.org/)
- [Vue](https://cn.vuejs.org/)
- [WeUI](https://weui.io/)
- [Mint UI](http://mint-ui.github.io/)
- [Element-UI](http://element.eleme.io/)
- [Font Awesome](http://www.bootcss.com/p/font-awesome/)

## 项目预览

[https://www.rejiejay.cn/maintain-channel/](https://www.rejiejay.cn/maintain-channel/)

## 项目搭建

``` bash
# 初始化项目
npm install

# 运行开发环境, 服务端端口热加载
npm run dev
# 曾杰杰头像
# http://localhost:8000/?openid=oI0FV0pK5sqCnE_LBBXb6sxdROwg#/
# 黄测试 
# http://localhost:8000/?openid=ozkjr1ARY97XNMVZQH2zWRKPzYm4#/

# 项目打包 到 开发环境
npm run builddev

# 项目打包 到 生产环境
npm run build

```

### 如何打包上传生产环境
1. 项目打包: npm run build
2. 打包转换为aspx文件: node toAspx
3. 覆盖到 http://svn.hotgz.com:3390/svn/ABY/UI/WeixinWeb/wx
4. SVN 提交

### 本地开发环境 如何进行微信端测试
1. 项目打包: npm run builddev
2. 打包转换为aspx文件: node toAspx
3. 覆盖到 http://svn.hotgz.com:3390/svn/ABY/UI/WeixinWeb/wx
4. 启动代理: ngrok http 80
5. 配置微信测试号
    - Web.config
    - https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
6. 使用微信Web开发工具调试
7. 测试 openid ozkjr1ARY97XNMVZQH2zWRKPzYm4

### 如何上传到远程测试环境
1. 项目打包: npm run builddev
2. 打包转换为aspx文件: node toAspx
3. 远程桌面: mstsc
4. 将dist里面 ownerEntrance.aspx ownerEntrance 覆盖到 远程桌面 C:\Web\YCPD_WX\wx 下
5. 打开连接: http://shzj.demo.hotgz.com/wx/ownerEntrance.aspx?openid=oI0FV0pK5sqCnE_LBBXb6sxdROwg
6. 完成

## License
MIT
