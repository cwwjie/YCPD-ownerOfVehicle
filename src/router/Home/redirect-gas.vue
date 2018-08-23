<!-- 
  - 加油优惠 导航页面 
  -->
<template>
    <div class="redirect-gas">
        <div class="redirect-gas-background"
            :style="`min-height: ${clientWidth * 1573 / 1491}px;`"
        >
            <img alt="navigation-page" src="https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/home/navigation-page.png" />
        </div>
        <div class="redirect-gas-leftover flex-column-center"
            :style="`height: ${clientHeight - (clientWidth * 1573 / 1491)}px;`"
        >
            <div class="gas-leftover-btn">
                <div class="leftover-btn-content flex-column-center"
                    @click="jumpToRefuelGas(1)"
                >
                    <span>加油优惠</span>
                    <label>加油优惠高达1.2元/升</label>
                </div>
            </div>
            <div class="gas-leftover-btn">
                <div class="leftover-btn-content flex-column-center"
                    @click="jumpToEngineGas(2)"
                >
                    <span>机油优惠</span>
                    <label>机油保养5折优惠</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import initLocation from "./../../components/initLocation";
import ajaxs from "./ajaxs.js";
import { ifError } from "assert";
import { Loading } from 'element-ui';
import RequestedURL from './../../config/RequestedURL.js'; //导入链接


export default {
  name: "redirect-gas",

  data() {
    return {
      // 屏幕宽高
      clientWidth:
        document.body.offsetWidth ||
        document.documentElement.clientWidth ||
        window.innerWidth,
      clientHeight:
        document.body.offsetHeight ||
        document.documentElement.clientHeight ||
        window.innerHeight,
        latitude:'',
        longitude:'',

    }
  },

  created(
     
  ){
       
    },
    mounted(){
        // let myCity = new BMap.LocalCity();
        // myCity.get(result => {
        // console.log(result)
        // this.latitude = result.center.lat;
        // this.longitude = result.center.lng;
        // console.log(this.latitude+','+this.longitude)
        // });
        
      
    },
  

  methods: {
     
    // 加油优惠
    jumpToRefuelGas(ret) {
        const _this = this;
        let openid = window.localStorage.openid; // 从本地获取openid
        let info = this.$store.state.user.info; // 获取 Vuex 顶层组件 用户信息

        // 判断Vuex 顶层组件 是否存在 openid
        // if (!openid) {// Vuex 顶层组件 不存在 openid
        //     // 将本地缓存的openid赋值进去
        //     openid = window.localStorage.openid;
        // }

        // 判断Vuex 顶层组件 是否存在 用户信息
        if (ret ==1) { // 表示没有用户信息 请先注册
        
            // console.log(longitude)
            // 跳转到组成页面
            let openid = window.localStorage.openid
            if(this.$store.getters.getLoginIofor == false){

              //初始化位置信息
              initLocation(this, true)
              .then(
                  position => { // 成功获取位置信息
                       $.ajax({
                          url: RequestedURL.getStationHandler,
                          type: "post",
                          data: {
                              action:"GetMembercard",
                              lattude: position.latitude,
                              lontude: position.longitude,
                              openid:openid
                          },
                          success: function (datas) {
                               console.log("没有信息");
                              console.log(datas)
                              window.location.href = datas.Url
                          },
                      })
                  },
                  error => { // 获取失败的情况下
                      // 判断Vuex 顶层组件 是否存在 position
                      if (
                          _this.$store.state.user.position &&
                          _this.$store.state.user.position.state === true
                      ) {
                          // Vuex 顶层组件 存在 position 直接使用 Vuex 顶层组件 的位置信息
                          
                           $.ajax({
                              url: RequestedURL.getStationHandler,
                              type: "post",
                              data: {
                                  action:"GetMembercard",
                                  lattude: _this.$store.state.user.position.latitude,
                                  lontude: _this.$store.state.user.position.longitude,
                                  openid:openid
                              },
                              success: function (datas) {
                                   console.log("没有信息");
                                  console.log(datas)
                                  window.location.href = datas.Url
                              },
                          })
                      } else { // Vuex 顶层组件 不存在 position
                          //  判断有没有本地缓存 position
                          if (
                              window.localStorage &&
                              window.localStorage.longitude &&
                              window.localStorage.latitude
                          ) {
                              // 使用本地缓存 position
                          
                               $.ajax({
                                  url: RequestedURL.getStationHandler,
                                  type: "post",
                                  data: {
                                      action:"GetMembercard",
                                      lattude: window.localStorage.latitude,
                                      lontude: window.localStorage.longitude,
                                      openid:openid
                                  },
                                  success: function (datas) {
                                       console.log("没有信息");
                                      console.log(datas)
                                      window.location.href = datas.Url
                                  },
                              })
                          } else { // 都没有的情况下 弹出提示
                              alert("请打开养车频道公众号-设置-提供定位信息.");
                          }
                      }
                  }
              );
            }else {
              
              //初始化位置信息
              initLocation(this, true)
              .then(
                  position => { // 成功获取位置信息
                    
                       $.ajax({
                          url: RequestedURL.getStationHandler,
                          type: "post",
                          data: {
                              action:"GetStation",
                                    lattude: position.latitude,
                                    lontude: position.longitude,
                              openid:openid
                          },
                          success: function (datas) {
                               console.log("有信息");
                              console.log(datas)
                              window.location.href = datas.Url
                          },
                      })
                  },
                  error => { // 获取失败的情况下
                      // 判断Vuex 顶层组件 是否存在 position
                      if (
                          _this.$store.state.user.position &&
                          _this.$store.state.user.position.state === true
                      ) {
                          // Vuex 顶层组件 存在 position 直接使用 Vuex 顶层组件 的位置信息
                          
                    
                         $.ajax({
                              url: RequestedURL.getStationHandler,
                              type: "post",
                              data: {
                                  action:"GetStation",
                                  lattude: _this.$store.state.user.position.latitude,
                                  lontude: _this.$store.state.user.position.longitude,
                                  openid:openid
                              },
                              success: function (datas) {
                                   console.log("有信息");
                                  console.log(datas)
                                  window.location.href = datas.Url
                              },
                          })
                      } else { // Vuex 顶层组件 不存在 position
                          //  判断有没有本地缓存 position
                          if (
                              window.localStorage &&
                              window.localStorage.longitude &&
                              window.localStorage.latitude
                          ) {
                              // 使用本地缓存 position
                             $.ajax({
                                  url: RequestedURL.getStationHandler,
                                  type: "post",
                                  data: {
                                      action:"GetStation",
                                          lattude: window.localStorage.latitude,
                                          lontude: window.localStorage.longitude,
                                      openid:openid
                                  },
                                  success: function (datas) {
                                       console.log("有信息");
                                      console.log(datas)
                                      window.location.href = datas.Url
                                  },
                              })
                          } else { // 都没有的情况下 弹出提示
                              alert("请打开养车频道公众号-设置-提供定位信息.");
                          }
                      }
                  }
              );
            }
          
        }else {
             return (window.location.href = `http://${
                window.location.host
            }/wx/selectmobile.aspx?openid=${openid}&history=http://${window.encodeURIComponent(
                window.location.host + "/wx20/#/redirect-gas"
            )}`);
        }

        // if (ret == 1) { // 上面按钮
                  
        //     /**
        //      * 请求 getStationHandler 的函数
        //      * @param {object} position 位置信息
        //      */
        //     let gasStationHandler = position => {
        //         let loadingInstance = Loading.service(); // 显示 loading 提示框

        //         ajaxs.getStationHandler({ // 开始请求
        //             openid: openid,
        //             latitude: position.latitude,
        //             longitude: position.longitude
        //         }).then(
        //             res => { // 请求成功
        //                 loadingInstance.close(); // 关闭 loading 提示框
        //                 // window.location.href = res.Url; // 跳转
        //             },
        //             error => { // 请求失败
        //                 loadingInstance.close(); // 关闭 loading 提示框
        //                 alert(error);
        //             }
        //         );
        //     };

        //     //初始化位置信息
        //     initLocation(this, true)
        //     .then(
        //         position => { // 成功获取位置信息
        //             gasStationHandler({ // 开始请求
        //                 latitude: position.latitude,
        //                 longitude: position.longitude
        //             });
        //         },
        //         error => { // 获取失败的情况下
        //             // 判断Vuex 顶层组件 是否存在 position
        //             if (
        //                 _this.$store.state.user.position &&
        //                 _this.$store.state.user.position.state === true
        //             ) {
        //                 // Vuex 顶层组件 存在 position 直接使用 Vuex 顶层组件 的位置信息
        //                 gasStationHandler({ // 开始请求
        //                     latitude: _this.$store.state.user.position.latitude,
        //                     longitude: _this.$store.state.user.position.longitude
        //                 });
        //             } else { // Vuex 顶层组件 不存在 position
        //                 //  判断有没有本地缓存 position
        //                 if (
        //                     window.localStorage &&
        //                     window.localStorage.longitude &&
        //                     window.localStorage.latitude
        //                 ) {
        //                     // 使用本地缓存 position
        //                     gasStationHandler({ // 开始请求
        //                         latitude: window.localStorage.latitude,
        //                         longitude: window.localStorage.longitude
        //                     });
        //                 } else { // 都没有的情况下 弹出提示
        //                     alert("请打开养车频道公众号-设置-提供定位信息.");
        //                 }
        //             }
        //         }
        //     );
        // } else { // 下面按钮
        //     return (window.location.href = `http://${
        //         window.location.host
        //     }/wx/selectmobile.aspx?openid=${openid}&history=http://${window.encodeURIComponent(
        //         window.location.host + "/wx20/#/redirect-gas"
        //     )}`);
        // }
    },

    // 机油优惠
    jumpToEngineGas() {
      let openid = this.$store.state.user.openid;
      let info = this.$store.state.user.info;

      // 判断顶部是否存在 openid
      if (!openid) {
        openid = window.localStorage.openid;
      }

      if (!info) {
        // 表示没有用户信息 请先注册
        return (window.location.href = `http://${
          window.location.host
        }/wx/selectmobile.aspx?openid=${openid}&history=http://${window.encodeURIComponent(
          window.location.host + "/wx20/#/redirect-gas"
        )}`);
      }

      // 判断是否正式环境
      if (
        window.location.host === "store.demo.ichebaoyang.com" ||
        process.env.NODE_ENV === "development"
      ) {
        // 测试
        window.location.href =
          "http://store.demo.ichebaoyang.com/Merchant/Merchanthome.html?id=180727010001925946";
      } else {
        // 正式
        window.location.href =
          "http://picc.hotgz.com/Merchant/Merchanthome.html?id=180724010002017319";
      }
    }
  }
};
</script>

<style scoped lang="less">
@black1: #303133;
@black2: #606266;
@black3: #909399;
@black4: #c0c4cc;

.redirect-gas {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .redirect-gas-background {
    width: 100%;
    background: #fcecd5;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .redirect-gas-leftover {
    width: 100%;
    background: #fcecd5;

    .gas-leftover-btn {
      width: 80%;
      height: 55px;
      padding-top: 25px;

      .leftover-btn-content {
        height: 55px;
        width: 100%;
        border-radius: 55px;
        color: #fff;
        background: -webkit-linear-gradient(
          #2abcff,
          #0096f6
        ); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(
          #2abcff,
          #0096f6
        ); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(
          #2abcff,
          #0096f6
        ); /* Firefox 3.6 - 15 */
        background: linear-gradient(#2abcff, #0096f6); /* 标准的语法 */

        span {
          padding-top: 5px;
          font-size: 16px;
        }

        label {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
