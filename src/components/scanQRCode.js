import RequestedURL from './../config/RequestedURL.js';
import { Toast, Indicator } from 'mint-ui';

const ajaxs = {
    /**
     * 获取权限验证配置信息
     * @param {methods} GET
     * @param {contentType} json application/json; charset=utf-8
     * @return {Promise} resolve({) reject(error)
     */
    getWxConfig: () => new Promise((resolve, reject) => {
        let createURL = () => {
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isIOS) {
                return encodeURIComponent(window.location.href.split('#')[0]) //hash后面的部分如果带上ios中config会不对
            } else {
                return encodeURIComponent(window.location.href)
            }
        }

        $.ajax({
            url: `${RequestedURL.getWxConfig}?action=WxConfig&url=${createURL()}`,
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
                        jsApiList: jsApiList
                    });
                    wx.checkJsApi({
                        jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                        success: function(res) {
                        // 以键值对的形式返回，可用的api值true，不可用为false
                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                        }
                    });

                    // 5秒超时
                    setTimeout(function () {
                        reject('获取权限验证配置信息超时!');
                    }, 5000);
                }, 
                error => reject(error)
            );
        })
    },
}

/**
 * 初始化扫一扫
    * @return {Promise} resolve({
    *    res:res.resultStr
    * }) reject(error)
 */
let scanQRCode = function () {
    return new Promise(function (resolve, reject) {

        ajaxs.initJSSDK(['scanQRCode'])
        .then(
            succeed => {
                wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            
                    success(res) {
                        resolve({
                            res:res.resultStr
                        });
                    },
    
                    cancel() {
                        reject("获取信息失败");
                    }
                });
                
            }, 
            error => reject(error)
        )

    });
}

export default scanQRCode;
