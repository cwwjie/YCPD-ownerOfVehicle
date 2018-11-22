// 真实环境请求的链接
let RequestedURL = {
    ichebaoyang: 'http://wx.ichebaoyang.com',
    ycpdapi: 'http://ycpdapi.hotgz.com',
    picc: 'http://picc.hotgz.com',

    /**
     * 用户信息 (openid)
     * @param {methods} POST
     * @param {contentType} json application/json; charset=utf-8
     * @param {string} OpenID openid
     */
    getUserInfor: 'http://ycpdapi.hotgz.com/Customer/GetCustomerInfoByOpenID',

    /**
     * 用户 头像 (openid)
     * @param {methods} GET
     * @param {contentType} text text/html; charset=utf-8
     * @param {string} Type 1
     * @param {string} OpenID openid
     */
    getHeadImageUrl: 'http://picc.hotgz.com/GetOpenID.aspx',
    
    /**
     * 交换 openid 的 code
     * @param {methods} GET
     * @param {contentType} json application/json; charset=utf-8
     */
    getOpenidCode: `http://${window.location.host}/wx/Handler.ashx`,

    /**
     * 预约记录
     * @param {methods} POST
     * @param {contentType} json application/json; charset=utf-8
     */
    getApointment: 'http://ycpdapi.hotgz.com/Apointment/GetDatas',

    /**
     * 获取城市
     * @param {methods} GET
     * @param {contentType} json application/json; charset=utf-8
     */
    getCity: 'http://picc.hotgz.com/wx/apiHandler.ashx',

    /**
     * 获取权限验证配置信息
     * @param {methods} GET
     * @param {contentType} json application/json; charset=utf-8
     */
    getWxConfig: 'http://picc.hotgz.com/wx/apiHandler.ashx',

    /**
     * 通过 openid 与位置信息 获取 优惠加油链接
     * @param {methods} GET
     * @param {contentType} json application/json; charset=utf-8
     */
    getStationHandler: `http://${window.location.host}/wx/Handler.ashx`,

    //卡券延期
    getStationHandler1 : `http://${window.location.host}/store/Handler.ashx`,
    
    /**
     * 停车场
     */
    stopCar: 'http://picc.hotgz.com/wx20',

    // 预约服务
    appointment:'http://ycpdapi.hotgz.com',

    // 预约列表
    reservationList:'http://ycpdapi.hotgz.com',

    // 修改预约记录
    upDataReservation:'http://ycpdapi.hotgz.com',

    // 获取商家列表服务项目id
    getStoreProductId:'http://ycpdapi.hotgz.com',
}

/**
 * 测试环境 重写 RequestedURL
 * 考虑到会有人将正式环境上传到测试环境 测试环境新增判断
 * 测试环境有时候需要重写方法, 方便测试, 生产环境不会执行下面方法
 * 此方法可以随意改动，
 */
if (window.location.host === 'store.demo.icheboayang.com' || process.env.NODE_ENV === 'development') {
    RequestedURL.getUserInfor = 'http://api.demo.hotgz.com/Customer/GetCustomerInfoByOpenID';
    RequestedURL.getHeadImageUrl = 'http://store.demo.ichebaoyang.com/GetOpenID.aspx';
    RequestedURL.getOpenidCode = 'http://store.demo.ichebaoyang.com/wx/Handler.ashx';
    RequestedURL.getApointment = 'http://api.demo.hotgz.com/Apointment/GetDatas';
    RequestedURL.getCity = 'http://store.demo.ichebaoyang.com/wx/apiHandler.ashx';
    RequestedURL.getWxConfig = 'http://store.demo.ichebaoyang.com/wx/apiHandler.ashx';
    RequestedURL.getStationHandler = 'http://store.demo.ichebaoyang.com/wx/Handler.ashx';
    RequestedURL.getStationHandler1 = 'http://store.demo.ichebaoyang.com/store/Handler.ashx'; //卡券延期
    RequestedURL.stopCar = 'http://front.demo.hotgz.com'; // 停车场
    RequestedURL.appointment = 'http://store.demo.ichebaoyang.com'; // 预约服务
    RequestedURL.reservationList = 'http://api.demo.hotgz.com'; // 预约列表
    RequestedURL.upDataReservation = 'http://api.demo.hotgz.com'; // 修改预约记录
    RequestedURL.getStoreProductId = 'http://api.demo.hotgz.com'; // 获取商家列表服务项目id
}

export default RequestedURL
