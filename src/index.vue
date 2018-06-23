<template>
  <router-view/>
</template>

<script>

import RequestedURL from './config/RequestedURL.js';
import loadPageVar from './utils/loadPageVar.js';

const ajaxs = {
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
            debug: true,
            appId: wxConfig.appId,
            timestamp: wxConfig.timestamp,
            nonceStr: wxConfig.nonceStr,
            signature: wxConfig.signature,
            jsApiList: jsApiList
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

    /**
     * 删除掉市
     * @param {String} cityString 城市名称
     * @return {String} 城市名称
     */
    let cityTransverter = cityString => {
      let indexOfCity = cityString.indexOf('市');
      if (indexOfCity !== -1) { // 判断是否有市
        return cityString.slice(0, indexOfCity);
      } else {
        return cityString
      }
    }

    $.ajax({
      url: `http://api.map.baidu.com/geocoder/v2/?ak=vA8jUBvkDTjv4dMk9u2CeDlw&callback=renderReverse&location=${position.latitude},${position.longitude}&output=json&pois=1`,
      type: "get",
      dataType: "jsonp",
      jsonp: "callback",
      success(data) {
        if (data.status === 0) {
          resolve(cityTransverter(data.result.addressComponent.city));
        } else {
          reject(`成功发起请求${target}, 但是请求数据有误. 原因: ${error}`);
        }
      },
      error(error) {
        reject(`请求${target}失败. 原因: ${error}`);
      }
    });
  })
}

export default {
  name: 'Index',

  // Vue 成功加载
  mounted() {
    this.destroyBackups(); // 删除备份策略
    this.initLocation();   // 位置定位
    
    if (process.env.NODE_ENV === 'development') { // 测试环境

      this.initDevOpenid();
    } else { // 生产环境
    
      this.initProOpenid();
    }
  },

  methods: {
    /**
     * 删除备份策略, 防止 Vue 加载失败导致
     */
    destroyBackups() {
      document.getElementById('backups').innerHTML = '';
      window.clearInterval(window.vueLoadTime);
    },

    /**
     * 初始化位置定位
     */
    initLocation() {
      const _this = this;

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

          error => reject("H5获取定位信息异常：" + JSON.stringify(error)), 

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
          succeed => wx.getLocation({
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
					}), 
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
            reject('微信定位坐标转换为百度定位坐标失败, 原因: ' + JSON.stringify(error));
          }
        });
      });

      /**
       * 存储定位
       * @param {Object} position longitude latitude
       */
      let saveLocation = position => {
        ajaxs.getCityName(position) // 获取城市名称
        .then(cityName => { // 成功
          _this.$store.commit('initLocation', { // 存储到 vuex
            state: true,
            latitude: position.latitude,
            longitude: position.longitude,
            cityname: cityName
          });
        }, error => {
          _this.$store.commit('initLocation', {
            state: true,
            latitude: position.latitude,
            longitude: position.longitude,
            cityname: '深圳', // 失败默认深圳
          });
        })
      };

      /**
       * H5 定位 并且储存
       */
      let getSaveH5Handle = () => {
        getHtml5Location() // H5 定位
        .then(
          position => saveLocation(position), 
          error => console.error(error)
        );
      };

      if (window.location.hostname === 'localhost') { // 本地环境
        getSaveH5Handle() // H5 定位
        
      } else { // 线上环境
        getWxLocation() // 微信定位
        .then( // 微信成功
          wxPosition => {
            wxToBMapConver(wxPosition) // 微信定位转换为百度定位
            .then(
              position => saveLocation(position), // 转换成功
              error => getSaveH5Handle() // 转换失败
            )
          },  
          error => getSaveH5Handle() // 微信失败
        );
      }
    },

    /**
     * 测试环境
     */
    initDevOpenid() {
      const _this = this;
      let loadPageOpenid = loadPageVar('openid');      // url 解析 openid
      let loadPageCode = loadPageVar('code');          // url 解析 code

      /**
       * 获取 用户信息
       */
      let initOpenid = openid => {

        _this.$store.dispatch('getUserInfor', openid)
        .then(val => {
          
          _this.saveOpenid(openid);    // 存储
          _this.initHeadImage(openid); // 获取 用户头像
        }, 
          error => console.error(error)
        );
      }

      if (loadPageOpenid) { // 解析 openid 存在 (权限最大)

        this.$store.commit('initOpenid', loadPageOpenid); // 存储 vuex  因为getuserinfo 会失败, 可能不会被 commit 进去 所以在此初始化 openid
        initOpenid(loadPageOpenid);
      } else { // 无解析 openid
        
        if (window.localStorage && window.localStorage.openid) { // 本地openid

          // localStorage 的 openid 是正确可用
          _this.$store.commit('initOpenid', window.localStorage.openid); // 存储 vuex
          initOpenid(window.localStorage.openid);
        } else { // 无本地openid

          if (loadPageCode) { // code 解析存在

            this.$store.dispatch('getOpenidCode', loadPageCode) // 交换 openid 
            .then(openid => {

              _this.saveOpenid(openid);    // 存储
              initOpenid(openid);
            }, error => {
              console.error(error);
            });

          } else { // code 解析不存在

            console.error('无法获取 code 以及 对应用户的openid');
          }          
        }        
      }
    },

    /**
     * 生产环境
     */
    initProOpenid() {
      const _this = this;
      let loadPageCode = loadPageVar('code');     // url 解析 code
      /**
       * 获取 用户信息
       */
      let initOpenid = openid => {

        _this.$store.dispatch('getUserInfor', openid)
        .then(val => {

          _this.saveOpenid(openid);    // 存储
          _this.initHeadImage(openid); // 获取 用户头像
        }, 
          error => console.error(error)
        );
      }

      if (window.localStorage && window.localStorage.openid) { // 本地openid

        _this.$store.commit('initOpenid', window.localStorage.openid); // 存储 vuex
        initOpenid(window.localStorage.openid);
      } else {

        if (loadPageCode) { // code 存在 

          this.$store.dispatch('getOpenidCode', loadPageCode) // 交换 openid
          .then(openid => {

            _this.saveOpenid(openid);    // 存储
            initOpenid(openid);
          }, error => {
            console.error(error);
          });

        } else {  // code 不存在
        
          console.error('无法获取 code 以及 对应用户的openid');
        }
      }
    },

    /**
     * 本地存储 openid vuex
     * @param {string} openid openid
     */
    saveOpenid(openid) {
      this.$store.commit('initOpenid', openid); // 存储 vuex
      if (window.localStorage) { // 兼容
        window.localStorage.setItem('openid', openid);
      }
    },

    /**
     * 获取 用户 头像
     * @param {string} openid 传值 区分 测试 生产
     */
    initHeadImage(openid) {
      this.$store.dispatch('getHeadImageUrl', openid) // 通过 openid 获取 用户头像
      .then(
        {},                           // 成功 不操作
        error => console.error('获取 用户 头像失败, 原因:' + error) // 失败 打印错误信息
      );
    }
  },
}

</script>

<style lang="less">

// 这里是存放全局样式的地方
@import '~vux/src/styles/reset.less'; // vux 初始化样式

// 禁止使用 iframe 防止广告弹出
iframe { display: none !important; }

</style>
