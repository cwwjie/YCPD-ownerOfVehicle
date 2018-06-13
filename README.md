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

### 打包 上传 生产

- 步骤
    1. 项目打包: npm run build
    2. 打包转换为aspx文件: node toAspx
    3. 覆盖到 http://svn.hotgz.com:3390/svn/ABY/UI/WeixinWeb/wx
    4. SVN 提交
    
- 测试url
    - https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx69b29a9a280c57d9&redirect_uri=http%3A%2F%2Fpicc.hotgz.com%2Fwx20%2Findex.html&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect

### 本地 开发 测试

- 步骤
    1. 项目打包: npm run builddev
    2. 打包转换为aspx文件: node toAspx
    3. 覆盖到 http://svn.hotgz.com:3390/svn/ABY/UI/WeixinWeb/wx
    4. 启动代理: ngrok http 80
    5. 配置微信测试号
        - Web.config
        - https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
    6. 使用微信Web开发工具调试

- 测试openid
    - 黄测试(ozkjr1ARY97XNMVZQH2zWRKPzYm4) 
    - 曾测试(oI0FV0pK5sqCnE_LBBXb6sxdROwg)

### 上传 测试

- 步骤
    1. 项目打包: npm run builddev
    2. 远程桌面: mstsc
    3. 将dist里面 覆盖到 远程桌面 C:\Web\YCPD_WX\wx20 下
    4. 打开微信开发工具: https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx98bac09017cef825&redirect_uri=http%3A%2F%2Fshzj.demo.hotgz.com%2Fwx20%2Findex.html&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect
- 测试url
    - https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx98bac09017cef825&redirect_uri=http%3A%2F%2Fshzj.demo.hotgz.com%2Fwx20%2Findex.html&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect


### 预约记录 openid
ozkjr1EI3qaZXGWLN5KGDOz81aN8
ozkjr1EfnSnXZvkBQBLmIIX4x1nc
ozkjr1BQr_fMNE4ynca4_XskmQtQ
ozkjr1I6dSIaeeyXo8qerliL7PWY
ozkjr1FkQTV_FtwHAo_vptzmhy-I
ozkjr1NAliDZcQpH87ZppqB0imPk
ozkjr1K-YTBdHcLd9Wy9p3a98lI8
ozkjr1AAzzqBWUoPI--2O7WxgE1Y
ozkjr1IgpFmdV7eOtuxJ3_1bc_Pw
ozkjr1JtGUdxwJGRVnqu9Ps7RxLs
ozkjr1FhIFAm3e5gWgHu8CJAu7mw
ozkjr1MLA9v_o7KMbIw5c0E98QNQ
ozkjr1LeNafzXYFPmk3bhpiFxqUM
ozkjr1EvglnpUrtcnl8Y_BFzJOOw
ozkjr1CpCvfTgB7isuNf6alrGkvU

## License
MIT
