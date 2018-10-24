import RequestedURL from './../config/RequestedURL.js';
import stringConver from './../utils/stringConver';
import { Toast, Indicator } from 'mint-ui';

const ajaxs = {
    /**
     * 根据定位获取所在城市名称
     * @param {Object} position longitude latitude
     * @return {Promise} resolve('城市名称') reject(error)
     */
    getCityName: position => new Promise((resolve, reject) => {
        let target = '获取所在城市名称';

        $.ajax({
            url: `http://api.map.baidu.com/geocoder/v2/?ak=enYTT6LMF8UAQGe9xmiOKGsw&callback=renderReverse&location=${position.latitude},${position.longitude}&output=json&pois=1`,
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
     * 获取权限验证配置信息
     * @param {methods} GET
     * @param {contentType} json application/json; charset=utf-8
     * @return {Promise} resolve({) reject(error)
     */
    getWxConfig: () => new Promise((resolve, reject) => {
        $.ajax({
            url: `${RequestedURL.getWxConfig}?action=WxConfig&url=${window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? encodeURIComponent(window.location.href.split('#')[0]) : encodeURIComponent(window.location.href)}`,
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
 * 初始化位置定位
 * @param {boolean} isRefresh 是否刷新定位
 */
let initLocation = function (self, isRefresh) {
    return new Promise(function (resolveLocation, rejectLocation) {
        /**
         * H5 定位
         * @return {Promise} resolve({
         *   longitude: longitude,
         *   latitude: latitude,
         * }) reject(error)
         */
        let getHtml5Location = () => new Promise((resolve, reject) => {
            window.navigator.geolocation.getCurrentPosition(
    
                succeed => resolve({
                    longitude: succeed.coords.longitude,
                    latitude: succeed.coords.latitude,
                }), 
    
                error => reject("H5获取定位信息异常, 原因：" + JSON.stringify(error)), 
    
                {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 60000
                }
            );
        });
    
        /**
         * 微信 定位
         * @return {Promise} resolve({
         *   longitude: longitude,
         *   latitude: latitude,
         * }) reject(error)
         */
        let getWxLocation = () => new Promise((resolve, reject) => {
            ajaxs.initJSSDK(['getLocation', 'openLocation'])
            .then(
                succeed => {
                    wx.getLocation({
                        type: 'wgs84',
                
                        success(res) {
                            resolve({
                                longitude: res.longitude,
                                latitude: res.latitude,
                            });
                        },
        
                        fail(res) {
                            reject("获取地理位置信息失败：" + res.errMsg);
                        },
        
                        cancel() {
                            reject("获取地理位置信息被取消");
                        }
                    });
                    
                    // 5秒超时
                    setTimeout(function () {
                        reject('获取地理位置信息超时!');
                    }, 5000);
                }, 
                error => reject(error)
            )
        });
    
        /**
         * 微信定位转换为百度定位
         * @param {Object} position longitude latitude
         * @return {Promise} resolve({
         *   longitude: longitude,
         *   latitude: latitude,
         * }) reject(error)
         */
        let wxToBMapConver = position => new Promise((resolve, reject) => {
            let ggPoint = new BMap.Point(position.longitude, position.latitude);
            let convertor = new BMap.Convertor();
            let pointArr = [];
    
            pointArr.push(ggPoint);
            convertor.translate(pointArr, 1, 5, result => {
                if (result.status === 0) {
                    resolve({
                        longitude: result.points[0].lng,
                        latitude: result.points[0].lat,
                    });
                }
                else {
                    reject('微信定位坐标转换为百度定位坐标失败, 原因: ' + JSON.stringify(result));
                }
            });
        });

        /**
         * H5 定位 并且储存
         */
        let getSaveH5Handle = () => {
            getHtml5Location() // H5 定位
            .then(
                position => {
                    saveLocation(position);
                    getCityName(position);
                    resolveLocation(position); // 整个项目 返回成功
                }, 
                error => {
                    console.error(error);
                    Toast({
                        message: error,
                        duration: 5000
                    });
                    rejectLocation(error); // 整个项目 返回失败
                }
            );
        };

        /**
         * 根据定位换取城市名称
         * @param {Object} position longitude latitude
         */
        let getCityName = position => {
            ajaxs.getCityName(position) // 获取城市名称
            .then(cityName => { // 成功
                self.$store.commit('initLocation', { // 存储到 vuex
                    state: true,
                    latitude: position.latitude,
                    longitude: position.longitude,
                    cityname: cityName
                });
            }, error => {
                Toast({
                    message: error,
                    duration: 5000
                });
                self.$store.commit('initLocation', {
                    state: true,
                    latitude: position.latitude,
                    longitude: position.longitude,
                    cityname: '深圳', // 失败默认深圳
                });
            });
        }

        /**
         * 存储定位
         * @param {Object} position longitude latitude
         */
        let saveLocation = position => {
            localStorage.setItem('getPositionTime', new Date().getTime());
            localStorage.setItem('longitude', position.longitude);
            localStorage.setItem('latitude', position.latitude);
            self.$store.commit('initLocation', { // 存储到 vuex
                state: true,
                latitude: position.latitude,
                longitude: position.longitude,
                cityname: '深圳' // 默认深圳
            });
        };

        if ( // 如果离线缓存了位置信息
            window.localStorage &&
            window.localStorage.longitude &&
            window.localStorage.latitude
        ) {

            let myposition = { longitude: window.localStorage.longitude, latitude: window.localStorage.latitude }
            self.$store.commit('initLocation', { // 存储到 vuex
                state: true,
                latitude: myposition.latitude,
                longitude: myposition.longitude,
                cityname: '深圳' // 默认深圳
            });
            getCityName(myposition); // 每次都会换取城市信息
            if (parseInt(localStorage.getPositionTime) < (new Date().getTime() + 7200000)) { // 2小时失效
                if (!isRefresh) { // 如果刷新, 则不 resolve
                    return resolveLocation(myposition);
                }
            }
        }

        Indicator.open('正在获取定位...');
        if (window.location.hostname === 'localhost') { // 本地环境
            getHtml5Location() // H5 定位
            .then(
                position => {
                    Indicator.close();
                    saveLocation(position);
                    getCityName(position); // 转换一下城市
                    resolveLocation(position); // 整个项目 返回成功
                }, 
                error => {
                    Indicator.close();
                    console.error(error);
                    Toast({
                        message: error,
                        duration: 5000
                    });
                    rejectLocation(error);
                }
            );
            
        } else { // 线上环境
            getWxLocation() // 微信定位
            .then(
                wxPosition => { // 微信定位成功

                    saveLocation(wxPosition); // 微信定位成功 存储一次
                    getCityName(wxPosition); // 转换一下城市
                    
                    wxToBMapConver(wxPosition) // 微信定位转换为百度定位
                    .then(
                        baiMapPosition => {
                            Indicator.close();
                            
                            saveLocation(baiMapPosition); // 百度定位成功 存储一次
                            getCityName(baiMapPosition); // 转换一下城市
                            resolveLocation(baiMapPosition); // 整个项目 返回成功
                        }, // 转换成功
                        error => {
                            Indicator.close();
                            getSaveH5Handle()
                        } // 转换失败
                    )
                },  
                error => { // 微信定位失败, 使用H5
                    Indicator.close();
                    getSaveH5Handle();
                } // 微信失败
            );
        }
    });
}

export default initLocation;
