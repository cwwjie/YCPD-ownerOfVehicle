<!-- 
  - 主页 首屏页面 
  -->
<template>
  <div class="home">
    <!-- 轮播图 -->
    <div class="home-swiper">
      <!-- 城市部分 如果已登录 则显示 -->
      <!-- <div class="home-swiper-operation"
        v-if="loginIofor"
      >
        <div class="swiper-operation-content flex-start-center">
          <div class="home-swiper-area flex-start-center"
            @click="$router.push('/city');"
          >
            <span>{{cityname}}</span>
            <i><img src="https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/home/dowm.png?x-oss-process=image/resize,m_fill,w_48,h_48,limit_0/auto-orient,0/quality,q_100" /></i>
          </div>
          <div class="home-swiper-title flex-rest">
            &nbsp;
          </div>
          <div class="home-swiper-customer">
            <a href="tel://4001106558">
              <headphones color="#fff" width="24" height="24"/>
            </a>
          </div>
        </div>
      </div> -->
      <div class="home-swiper-content">
        <mt-swipe :auto="4000" :style="`height: ${bannerHeight}px; width: 100%`">
          <mt-swipe-item v-for="(value, key) in swiperlist" :key="key">
            <img @click="value.click" :alt="value.alt" :src="value.src"/>
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>

    <!-- 登陆框 目前暂时 如果已登录时 则不显示 -->
    <div  
      v-if="!loginIofor"
      class="home-login" 
      v-on:click="jumpToLogin()"
    >
      <div class="login-content">
        <div class="login-img">
          <img :src="pictures.logo" />
        </div>
        <div class="login-description">
          <div class="login-description-content">
            <div class="description-main">注册会员</div>
            <div class="description-span">会员立享加油98折</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 入口合集 -->
    <div class="home-entry-list">
      <div class="entry-list-content">

        <div class="entry-item" v-on:click="jumpToUrlWhetherLogin(`http://${locationhost}/wx/selectWashcar.html`)">
          <div class="entry-svg-content" style="background-color: #3eb7fc">
            <!-- <CARWASH color="#fff"/> -->
             <img src="../../assets/img/洗车美容 copy@2x.png"/>
          </div>
          <div class="item-name">洗车美容</div>
        </div>
        <div class="entry-item" v-on:click="jumpToGasStation()">
          <div class="entry-svg-content" style="background-color: #41b287">
            <!-- <GAS2 color="#fff"/> -->
            <img src="../../assets/img/优惠加油 copy@2x.png"/>
          </div>
          <div class="item-name">优惠加油</div>
        </div>
        <div class="entry-item" v-on:click="showNotCompleted(1)">
          <div class="entry-svg-content" style="background-color: #ff6540">
            <!-- <park color="#fff"/> -->
            <img src="../../assets/img/停车服务 copy@2x.png"/>
          </div>
          <div class="item-name">停车服务</div>
        </div>
        <div class="entry-item" v-on:click="showNotCompleted">
          <div class="entry-svg-content" style="background-color: #f9a825">
            <!-- <charge color="#fff"/> -->
            <img src="../../assets/img/快速充电 copy@2x.png"/>
          </div>
          <div class="item-name">快速充电</div>
        </div>

        <div class="entry-item" v-on:click="jumpToUrl(`http://${locationhost}/wx/piccin.aspx?type=baoyang`)">
          <div class="entry-svg-content" style="background-color: #fadb14">
            <!-- <Vehiclemaintenance color="#fff"/> -->
            <img src="../../assets/img/放心保养 copy@2x.png"/>
          </div>
          <div class="item-name">放心保养</div>
        </div>
        <div class="entry-item" v-on:click="jumpToUrlWhetherLogin(`http://${locationhost}/wx/selectMaintenance.html`)">
          <div class="entry-svg-content" style="background-color: #ec499c">
            <!-- <nurse color="#fff"/> -->
            <img src="../../assets/img/维修养护 copy@2x.png"/>
          </div>
          <div class="item-name">维修养护</div>
        </div>
        <div class="entry-item" v-on:click="showNotCompleted">
          <div class="entry-svg-content" style="background-color: #3eb6fc">
            <!-- <rescue color="#fff"/> -->
            <img src="../../assets/img/紧急救援 copy@2x.png"/>
          </div>
          <div class="item-name">紧急救援</div>
        </div>
        <div class="entry-item"  v-on:click="jumpToUrlWhetherLogin(`http://${locationhost}/wx/weizhangfiner.html`)">
          <div class="entry-svg-content" style="background-color: #0ccaca">
            <!-- <violation color="#fff"/> -->
             <img src="../../assets/img/违章查询 copy@2x.png"/>
          </div>
          <div class="item-name">违章查询</div>
        </div>

      </div>
    </div>

    <!-- 新增四个板块入口 -->
    <!-- <div class="home-fourPlate">
      <div class="fourPlate-top main-flex-start">
        <div class="fourPlate-item" v-on:click="jumpToUrl(`http://${locationhost}/wx/piccin.aspx?type=pay`)">
          <div class="fourPlate-left">
            <div class="item-depict">
              <img alt="门店支付" :src="pictures.fourPlate[0]" />
            </div>
          </div>
        </div>
        <div class="fourPlate-item" v-on:click="jumpToUrl(`http://${locationhost}/wx/approveapoint.aspx`)">
          <div class="item-depict">
            <img alt="车主评价" :src="pictures.fourPlate[1]" />
          </div>
        </div>
      </div>
      <div class="fourPlate-bottom main-flex-start">
        <div class="fourPlate-item" v-on:click="jumpToUrl(`http://${locationhost}/wx/index.aspx?StoreType_Name=4S店&booking=false`)">
          <div class="fourPlate-left">
            <div class="item-depict">
              <img alt="4S店入口" :src="pictures.fourPlate[2]" />
            </div>
          </div>
        </div>
        <div class="fourPlate-item" v-on:click="jumpToUrl('http://mall.ichebaoyang.com/lc.html')">
          <div class="item-depict">
            <img alt="物流追溯" :src="pictures.fourPlate[3]" />
          </div>
        </div>
      </div>
    </div> -->
    <!-- 新增的两个保险入口 -->
    <div id="home-twoPlate">
      <div @click="tips">
        <img class="img" src="../../assets/img/PICC_logo@2x.png">
        <p>
            <span>服务预约</span>
            <img src="../../assets/img/icon_arrow@2x.png" alt="">
        </p>
      </div>
      <div @click="tips">
        <img class="img" src="../../assets/img/pingan_logo@2x.png">
        <p>
           <span>服务预约</span>
           <img src="../../assets/img/icon_arrow@2x.png" alt="">
        </p>
      </div>
    </div>

    <div @click="tips" id="msg">
      <img class="img1" src="../../assets/img/icon_info@2x.png">
      <span>您有1个订单未评价</span>
      <img class="img2" src="../../assets/img/Path 2@2x.png" alt="">
    </div>

    <!-- 服务流程 -->
    <!-- <div class="home-process">
      <div class="process-title">
        <div class="title-main">服务流程</div>
        <div class="title-subtitle" v-on:click="jumpToUrl('http://picc.hotgz.com/wx/piccin.aspx?type=baoyang')">
          <span>马上预约</span>
          <icon
            width="8"
            height="20"
            name="angle-right"
          />
        </div>
      </div>
      
      <div class="process-main">

        <div class="main-description">
          <div>在线预约</div>
          <div>确认需求</div>
          <div>到店服务</div>
          <div>评价分享</div>
        </div>

        <div class="main-dot-line">
          <div class="dot-content"><div class="dot"></div></div>
          <div class="dot-content"><div class="dot"></div></div>
          <div class="dot-content"><div class="dot"></div></div>
          <div class="dot-content"><div class="dot"></div></div>
          <div class="line"></div>
        </div>

        <div class="process-points">
          <div class="points-item main-flex-start">
            <icon style="width:16px;height:16px;">
              <icon name="exclamation" style="fill:#f44336;"/>
              <icon name="circle-o" scale="2" style="fill:#f44336;"/>
            </icon>
            <div>在线预约至到店服务可撤销，成功后不可撤销</div>
          </div>
          <div class="points-item main-flex-start">
            <icon style="width: 16px; height: 16px;">
              <icon name="exclamation" style="fill: #f44336;"/>
              <icon name="circle-o" scale="2" style="fill: #f44336;"/>
            </icon>
            <div>如在到店服务中有疑问, 可咨询服务热线: <a href="tel://4001106558">400-110-6558</a></div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- 底部 TabBar -->
    <tabbar 
      :selectIndex="0"
      :callbackFun="tabbarClick"
    />
  </div>
</template>

<script>
// mint-ui 框架
import Vue from "vue";
import { Swipe, SwipeItem, Toast } from "mint-ui";
import "mint-ui/lib/style.min.css";
Vue.component("mt-swipe", Swipe);
Vue.component("mt-swipe-item", SwipeItem);

// vue-awesome
import icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/angle-right";
import "vue-awesome/icons/exclamation";
import "vue-awesome/icons/circle-o";

// 自己封装 ICON
import CARWASH from "./../../assets/CAR-WASH.vue"; // 洗车
import GAS2 from "./../../assets/GAS2.vue"; // 加油
import park from "./../../assets/park.vue"; // 停车
import charge from "./../../assets/charge.vue"; // 充电
import Vehiclemaintenance from "./../../assets/Vehicle-maintenance.vue"; // 保养
import nurse from "./../../assets/nurse.vue"; // 养护
import rescue from "./../../assets/rescue.vue"; // 紧急救援
import violation from "./../../assets/violation.vue"; // 违章查询
import headphones from "./../../assets/headphones.vue"; // 耳机

// 自己封装的组件
import tabbar from "./../../components/TabBar.vue";
import initLocation from "./../../components/initLocation";

import convertDate from "./../../utils/convertDate";
import stringConver from "./../../utils/stringConver";
import ajaxs from "./ajaxs.js";
import RequestedURL from "./../../config/RequestedURL.js"; //导入链接

export default {
  name: "home",

  components: {
    // SVG组件
    CARWASH,
    GAS2,
    park,
    charge,
    Vehiclemaintenance,
    nurse,
    rescue,
    violation,
    headphones,
    // 自写组件
    tabbar,
    // vue-awesome
    icon,
    // mint-ui
    Toast
  },

  data() {
    return {
      pictures: {
        // 图片
        logo: require("./../../assets/YCPD.png"),
        fourPlate: [
          // 四板块入口 一个小时强制刷新一次
          `https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/home/fourPlate1.png?${convertDate.dateToYYYYmmDDhhMM00(
            new Date()
          )}`,
          `https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/home/fourPlate2.png?${convertDate.dateToYYYYmmDDhhMM00(
            new Date()
          )}`,
          `https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/home/fourPlate3.png?${convertDate.dateToYYYYmmDDhhMM00(
            new Date()
          )}`,
          `https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/home/fourPlate4.png?${convertDate.dateToYYYYmmDDhhMM00(
            new Date()
          )}`
        ]
      },

      bannerHeight:
        // 设置轮播图高度 按照 375: 160 比例
        (document.body.offsetWidth ||
          document.documentElement.clientWidth ||
          window.innerWidth) /
        375 *
        160,

      swiperlist: [
        {
          // 轮播图 每隔一个小时强制刷新一次
          alt: "养车频道-banner",
          src: `https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/home/banner01.jpg?${convertDate.dateToYYYYmmDDhhMM00(
            new Date()
          )}`, // 放置在阿里云储存里, 方便替换
          click: this.jumpToGasStation
        },
        {
          // 轮播图 每隔一个小时强制刷新一次
          alt: "养车频道-banner",
          src: `https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/home/banner02.jpg?${convertDate.dateToYYYYmmDDhhMM00(
            new Date()
          )}`, // 放置在阿里云储存里, 方便替换
          click: () =>
            this.jumpToUrlWhetherLogin(
              "http://picc.hotgz.com/Merchant/Merchanthome.html?id=180724010002017319"
            )
        }
      ],

      locationhost: window.location.host,
      latitude: "",
      longitude: ""
    };
  },
  mounted() {
    let myCity = new BMap.LocalCity();
    myCity.get(result => {
      console.log(result);
      this.latitude = result.center.lat;
      this.longitude = result.center.lng;
      console.log(this.latitude + "," + this.longitude);
    });
    //获取坐标点
  },
  created() {
    // console.log(window.location.href)
    $.ajax({
      url: `${
        RequestedURL.getWxConfig
      }?action=WxConfig&url=${encodeURIComponent(window.location.href)}`,
      type: "get",
      success: function(datas) {
        console.log(datas);
      }
      // error(error) {
      //     reject(`向服务器获取权限验证配置信息发生错误!, 原因: ${error}`);
      // }
    });
  },

  computed: {
    loginIofor() {
      // 用户信息
      return this.$store.getters.getLoginIofor; // 如果未登录 返回 false
    },

    cityname() {
      // 获取城市
      if (
        this.$store.getters.getLoginIofor &&
        this.$store.getters.getLoginIofor.City
      ) {
        // 如果存在则显示, 并且去掉市
        return stringConver.sliceLastIndexOfBy(
          this.$store.getters.getLoginIofor.City,
          "市"
        );
      } else {
        return "深圳";
      }
    },

    openid() {
      // 分开获取 (因为默认是false 传值容易出问题)
      return this.$store.state.user.openid;
    }
  },

  methods: {
    //新增功能的点击提示升级中
    tips(){
       Toast({
        message: "升级中",
        duration: 1000
      });
    },
    /**
     * 跳转到登录页面
     */
    jumpToLogin() {
      let openid = this.$store.state.user.openid;

      // 判断顶部是否存在 openid
      if (!openid) {
        openid = window.localStorage.openid;
      }

      window.location.href = `http://${
        window.location.host
      }/wx/selectmobile.aspx?openid=${openid}&history=http://${
        window.location.host
      }/wx20/index.html`;
    },
    /**
     * 跳转到优惠加油
     */
    jumpToGasStation() {
      let info = this.$store.state.user.info;
      var openid = window.localStorage.openid;

      if (this.loginIofor == false) {
        console.log(this.loginIofor);
        initLocation(this, true).then(position => {
          $.ajax({
            url: RequestedURL.getStationHandler,
            type: "post",
            data: {
              action: "GetMembercard",
              lattude: position.latitude,
              lontude: position.longitude,
              openid: openid
            },
            success: function(datas) {
              console.log("没有信息");
              console.log(datas);

              window.location.href = datas.Url;
            }
          });
        }),
          error => {
            // 获取失败的情况下
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
                  action: "GetMembercard",
                  lattude: _this.$store.state.user.position.latitude,
                  lontude: _this.$store.state.user.position.longitude,
                  openid: openid
                },
                success: function(datas) {
                  console.log("没有信息");
                  console.log(datas);
                  window.location.href = datas.Url;
                }
              });
            } else {
              // Vuex 顶层组件 不存在 position
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
                    action: "GetMembercard",
                    lattude: window.localStorage.latitude,
                    lontude: window.localStorage.longitude,
                    openid: openid
                  },
                  success: function(datas) {
                    console.log("没有信息");
                    console.log(datas);
                    window.location.href = datas.Url;
                  }
                });
              } else {
                // 都没有的情况下 弹出提示
                alert("请打开养车频道公众号-设置-提供定位信息.");
              }
            }
          };
      } else {
        console.log(this.loginIofor);
        initLocation(this, true).then(position => {
          $.ajax({
            url: RequestedURL.getStationHandler,
            type: "post",
            data: {
              action: "GetStation",
              lattude: position.latitude,
              lontude: position.longitude,
              openid: openid
            },
            success: function(datas) {
              console.log("有信息");
              console.log(datas);

              window.location.href = datas.Url;
            }
          });
        }),
          error => {
            // 获取失败的情况下
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
                  action: "GetStation",
                  lattude: _this.$store.state.user.position.latitude,
                  lontude: _this.$store.state.user.position.longitude,
                  openid: openid
                },
                success: function(datas) {
                  console.log("没有信息");
                  console.log(datas);
                  window.location.href = datas.Url;
                }
              });
            } else {
              // Vuex 顶层组件 不存在 position
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
                    action: "GetStation",
                    lattude: window.localStorage.latitude,
                    lontude: window.localStorage.longitude,
                    openid: openid
                  },
                  success: function(datas) {
                    console.log("没有信息");
                    console.log(datas);
                    window.location.href = datas.Url;
                  }
                });
              } else {
                // 都没有的情况下 弹出提示
                alert("请打开养车频道公众号-设置-提供定位信息.");
              }
            }
          };
      }
    },

    tabbarClick(selectIndex) {
      // 底部 tabbar 点击触发
      if (selectIndex === "my") {
        // 如果 标识为 my 则跳转到个人中心
        this.$router.push({
          path:'/user'
        });
      }
    },

    jumpToUrl(url) {
      // 页面的跳转 根据 url 进行跳转
      window.location.href = url;
    },

    showNotCompleted() {
      // 弹出没有完成的提示
      // let info = this.$store.state.user.info;
      //   let openid = this.$store.state.user.openid;
      //   if(ret ==1){
      //        $.ajax({
      //             url:'http://store.demo.ichebaoyang.com/wx/Handler.ashx',
      //             type: "post",
      //             data: {
      //                 action:"GetMembercard",
      //                 lattude: this.latitude,
      //                 lontude: this.longitude,
      //                 openid:openid
      //             },
      //             success: function (datas) {
      //               if(datas.bot == true){
      //                   window.location.href = datas.url
      //               }
      //             },
      //        })
      //   }else  {
      Toast({
        message: "升级中",
        duration: 1000
      });
      // }
    },

    jumpToUrlWhetherLogin(url) {
      // 页面行跳转 判断登录
      if (this.loginIofor) {
        window.location.href = url;
      } else {
        // 登录页面
        this.jumpToLogin();
      }
    }
  }
};
</script>

<style scoped lang="less">
.main-flex-start {
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
  justify-content: flex-start;
}

.home {
  min-height: 100%;
  background: #efefef;
}

// 轮播图
.home .home-swiper {
  position: relative;
  border-bottom: 1px solid #ddd;

  .home-swiper-operation {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 1;

    .swiper-operation-content {
      height: 24px;
      padding: 15px;
    }

    .home-swiper-area {
      color: #fff;

      span {
        display: block;
        padding-right: 5px;
      }

      i {
        display: block;
        width: 24px;
        height: 24px;

        img {
          display: block;
          width: 24px;
          height: 24px;
        }
      }

      .home-swiper-customer {
        text-align: right;
      }
    }
  }

  .mint-swipe-items-wrap {
    img {
      width: 100%;
      height: 100%;
    }
  }
}

// 登录框
.home-login {
  position: relative;
  padding: 0px 15px;
  margin-top: 15px;

  .login-content {
    position: relative;
    background: #fff;
    height: 60px;
    border-radius: 5px;
    border: 1px solid #ddd;

    .login-img {
      position: absolute;
      left: 7.5px;
      top: 7.5px;
      width: 45px;
      height: 45px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .login-description {
      display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
      display: -moz-box; /* 老版本语法: Firefox (buggy) */
      display: -ms-flexbox; /* 混合版本语法: IE 10 */
      display: -webkit-flex; /* 新版本语法: Chrome 21+ */
      display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
      align-items: center;
      justify-content: flex-start;
      height: 60px;
      padding-left: 62px;

      .login-description-content {
        .description-main {
          font-size: 14px;
          line-height: 18px;
          color: #303133;
        }
        .description-span {
          font-size: 12px;
          line-height: 18px;
          color: #606266;
        }
      }
    }
  }
}

// 入口合集
.home-entry-list {
  margin-top: 15px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background: #fff;

  .entry-list-content {
    padding-top: 15px;
    position: relative;
    overflow: hidden;

    .entry-item {
      padding-bottom: 15px;
      width: 25%;
      float: left;
      text-align: center;

      .entry-svg-content {
        display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
        display: -moz-box; /* 老版本语法: Firefox (buggy) */
        display: -ms-flexbox; /* 混合版本语法: IE 10 */
        display: -webkit-flex; /* 新版本语法: Chrome 21+ */
        display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        width: 44px;
        height: 44px;
        border-radius: 20px;
         background: #fff;
        
        img {
          width:46px;
          height:46px;
          border:none;
        }
      }

      .item-name {
        padding-top: 10px;
        font-size: 14px;
        line-height: 22px;
        color: #606266;
      }
    }
  }
}
//预约模块
#home-twoPlate {
  width:100%;
  height:100px;
  margin-top:15px;
  div {
     width:49%;
     height:100%;
     background-color: #fff;
     text-align: center;
     padding:10px 0px 16px 0px;
     box-sizing: border-box;
     font-size:14px;
     color:#666;
     .img {
       width:100px;
       height:50px;
     }
     p {
       height:20px;
       line-height: 20px;
       position:relative;
       span {
       }
       img {
         width:12px;
         height:12px;
         position:absolute;
         top:4px;
       }
     }
  }
  div:nth-child(1) {
    float:left;
  }
  div:nth-child(2) {
    float:right;
  }

}
#msg {
  height:36px;
  width:96%;
  background-color: #FFEAAE;
  border-radius:10px;
  border:1px solid rgba(255,234,174,1);
  margin:0 auto;
  margin-top:30px;
  text-align: left;
  line-height: 36px;
  font-size:14px;
  position:relative;
  img {
    width:20px;
    height:20px;
  }
  .img1 {
    position:absolute;
    top:8px;
    left:40px;
  }
  span {
    margin-left:80px;
    color:#FF1616;
  }
  .img2 {
     position:absolute;
     right:20px;
     top:8px;
  }
}

// 新增四个板块入口
// .home-fourPlate {
//   margin-top: 15px;
//   border-top: 1px solid #ddd;
//   border-bottom: 1px solid #ddd;
//   background: #fff;

//   .fourPlate-top,
//   .fourPlate-bottom {
//     .fourPlate-item {
//       position: relative;
//       width: 50%;

//       .item-depict {
//         padding: 10px;

//         img {
//           display: block;
//           margin: 0px;
//           padding: 0px;
//           width: 100%;
//           height: 100%;
//           border-radius: 2px;
//           // 这个加上去也挺好看
//           // box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
//           // transition: all 0.3s cubic-bezier(.25,.8,.25,1);
//         }
//       }
//     }
//   }

//   .fourPlate-top {
//     border-bottom: 1px solid #ddd;
//   }

//   .fourPlate-left {
//     width: 100%;
//     height: 100%;
//     border-right: 1px solid #ddd;
//   }
// }

// 服务流程
// .home-process {
//   margin-top: 15px;
//   border-top: 1px solid #ddd;
//   border-bottom: 1px solid #ddd;
//   background: #fff;

//   .process-title {
//     position: relative;
//     height: 40px;
//     line-height: 40px;
//     border-bottom: 1px solid #ddd;

//     .title-main {
//       padding-left: 15px;
//     }

//     .title-subtitle {
//       position: absolute;
//       top: 0px;
//       right: 15px;

//       span {
//         font-size: 14px;
//         color: #606266;
//         padding-right: 5px;
//       }

//       svg {
//         position: relative;
//         top: 4.5px;
//         color: #606266;
//       }
//     }
//   }

//   .process-main {
//     position: relative;

//     .main-description {
//       overflow: hidden;
//       padding-top: 15px;

//       > div {
//         float: left;
//         width: 25%;
//         font-size: 12px;
//         text-align: center;
//       }
//     }

//     .main-dot-line {
//       position: relative;
//       padding-top: 15px;
//       padding-bottom: 25px;
//       border-bottom: 1px solid #ddd;

//       .dot-content {
//         position: relative;
//         top: -4px;
//         float: left;
//         width: 25%;
//         z-index: 1;

//         .dot {
//           margin: auto;
//           width: 6px;
//           height: 6px;
//           border-radius: 6px;
//           background: #fff;
//           border: 2px solid #f44336;
//         }
//       }

//       .line {
//         position: absolute;
//         width: 95%;
//         left: 50%;
//         margin-left: -47.5%;
//         height: 2px;
//         background: #f44336;
//       }
//     }

//     .process-points {
//       padding: 15px;

//       .points-item {
//         padding-bottom: 5px;
//         font-size: 12px;
//         line-height: 20px;
//         color: #909399;

//         > svg {
//           position: relative;
//           top: 1.5px;
//           padding-right: 5px;
//         }

//         a {
//           color: #409eff;
//         }
//       }
//     }
//   }
// }
</style>
