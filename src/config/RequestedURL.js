// 真实环境请求的链接
let RequestedURL = {
    ycpdapi: 'http://ycpdapi.hotgz.com',
    picc: 'http://picc.hotgz.com',

    /**
     * 通过openid获取用户信息 的链接
     * @param {methods} POST
     * @param {contentType} json application/json; charset=utf-8
     * @param {string} OpenID openid
     */
    getUserInfor: 'http://ycpdapi.hotgz.com/Customer/GetCustomerInfoByOpenID',

    /**
     * 通过openid用户信息的头像 的链接
     * @param {methods} GET
     * @param {contentType} text text/html; charset=utf-8
     * @param {string} Type 1
     * @param {string} OpenID openid
     */
    getHeadImageUrl: 'http://picc.hotgz.com/GetOpenID.aspx',
    
    /**
     * 获取 用于交换 openid 的 code 方法
     * @param {methods} GET
     * @param {contentType} text application/json; charset=utf-8
     */
    getGetOpenidCode: `http://${window.location.host}/wx/Handler.ashx`,
}

/**
 * 测试环境 重写 RequestedURL
 * 测试环境有时候需要重写方法, 方便测试, 生产环境不会执行下面方法
 * 此方法可以随意改动，
 */
if (process.env.NODE_ENV === 'development') {
    RequestedURL.getUserInfor = 'http://api.demo.hotgz.com/Customer/GetCustomerInfoByOpenID';
    RequestedURL.getHeadImageUrl = 'http://shzj.demo.hotgz.com/GetOpenID.aspx';
    RequestedURL.getGetOpenidCode = 'http://shzj.demo.hotgz.com/wx/Handler.ashx';
}

export default RequestedURL
