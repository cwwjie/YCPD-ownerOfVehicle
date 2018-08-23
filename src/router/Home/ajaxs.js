import RequestedURL from './../../config/RequestedURL.js';
import stringConver from './../../utils/stringConver';

const ajaxs = {
    /**
     * 获取城市
     * @param {boolean} isHot 是否热门城市
     * @return {Promise} resolve({ // 城市列表
     *   Group: "A",
     *   List: [
     *     ID: "180613010000526126"
     *     Name: "安庆"
     *   ],
     * }) reject(error)
     * @return {Promise} resolve([ // 热门城市
     *   {
     *     ID: "151215010000000015",
     *     Name: "广州",
     *   }
     * ]) reject(error)
     */
    getCity: isHot => {
        let cityAction = isHot ? 'GetHotCity' : 'GetCity';
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${RequestedURL.getCity}?action=${cityAction}`,
                type: "get",
                success(data) {
                    resolve(data)
                },
                error(error) {
                    reject(`向服务器获取城市发生错误!, 原因: ${error}`);
                }
            });
        });
    },

    /**
     * 获取权限验证配置信息
     * @param {methods} GET
     * @param {contentType} json application/json; charset=utf-8
     * @return {Promise} resolve({) reject(error)
     */
    getWxConfig: () => new Promise((resolve, reject) => {
        $.ajax({
            url: `${RequestedURL.getWxConfig}?action=WxConfig&url=${encodeURIComponent(window.location.href)}`,
            type: "get",
            success(wxConfig) {
                resolve(wxConfig)
            },
            error(error) {
                reject(`向服务器获取权限验证配置信息发生错误!, 原因: ${error}`);
            }
        });
    }),

    /**
     * 初始化微信JS-SDK
     * @param {Array} jsApiList
     * @return {Promise} resolve(ture) reject(error)
     */
    initJSSDK: function (jsApiList) {
        const _this = this;
        return new Promise((resolve, reject) => {
        
            _this.getWxConfig() // 获取权限验证配置信息
            .then(
                wxConfig => {

                    wx.ready(function () { // 注册 配置成功的事件
                        resolve(true);
                    });

                    wx.error(function (res) {	// 注册 配置失败的事件
                        reject('向服务器发起请求获取权限验证配置信息成功, 但是初始化配置信息失败, 原因: ' + JSON.stringify(res));
                    });

                    wx.config({ // 初始化配置信息
                        debug: false,
                        appId: wxConfig.appId,
                        timestamp: wxConfig.timestamp,
                        nonceStr: wxConfig.nonceStr,
                        signature: wxConfig.signature,
                        jsApiList:jsApiList
                    });
                }, 
                error => reject(error)
            );
        })
    },
  
    /**
     * 根据定位获取所在城市名称
     * @param {Object} position longitude latitude
     * @return {Promise} resolve('城市名称') reject(error)
     */
    getCityName: position => new Promise((resolve, reject) => {
        let target = '获取所在城市名称';

        $.ajax({
            url: `http://api.map.baidu.com/geocoder/v2/?ak=vA8jUBvkDTjv4dMk9u2CeDlw&callback=renderReverse&location=${position.latitude},${position.longitude}&output=json&pois=1`,
            type: "get",
            dataType: "jsonp",
            jsonp: "callback",
            success(data) {
                if (data.status === 0) {
                    resolve(stringConver.sliceLastIndexOfBy(data.result.addressComponent.city, '市'));
                } else {
                    reject(`成功发起请求${target}, 但是请求数据有误. 原因: ${error}`);
                }
            },
            error(error) {
                reject(`请求${target}失败. 原因: ${error}`);
            }
        });
    }),

    /**
     * 通过 openid 与位置信息 获取 优惠加油链接
     * @param {Object} param openid longitude latitude
     * @return {Promise} resolve({
     * 
     * }) reject(error)
     */
    getStationHandler: param => new Promise((resolve, reject) => {
        $.ajax({
            url: RequestedURL.getStationHandler,
            type: "post",
            data: {
                action: "GetMembercard",
                lattude: param.lattude,
                lontude: param.lontude,
                openid: param.openid
            },
            success(data) {
                if(data.bot == true){
                    resolve(data.url);
                } else {
                    reject(`通过 openid 与位置信息 获取 优惠加油链接发生错误!, 原因: ${JSON.stringify(data)}`);
                }
            },
            error(error) {
                reject(`通过 openid 与位置信息 获取 优惠加油链接发生错误!, 原因: ${error.statusText}`);
            }
        });
    })
}

export default ajaxs;
