<!-- 建行优惠加油 导航页面 -->
<template>
    <div class="redirect-gas">
        
        <div class="redirect-gas-background" :style="`min-height: ${clientWidth * 1573 / 1491}px;`">
            <img alt="navigation-page" src="https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/home/navigation-page.png" />
        </div>

        <div class="redirect-gas-leftover flex-column-center" :style="`height: ${clientHeight - (clientWidth * 1573 / 1491)}px;`">
            
            <div class="gas-leftover-btn">
                <div class="leftover-btn-content flex-column-center" @click="jumpToRefuelGas(1)">
                    <span>加油优惠</span>
                    <label>加油优惠高达1.2元/升</label>
                </div>
            </div>

            <div class="gas-leftover-btn">
                <div class="leftover-btn-content flex-column-center" @click="jumpToEngineGas()" >
                    <span>机油优惠</span>
                    <label>机油保养5折优惠</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 框架类
import { Loading } from 'element-ui';
// 配置类
import RequestedURL from '@/config/RequestedURL.js'; //导入链接
// 组件类
import html5WxBMapLocation from "@/components/html5WxBMapLocation";

export default {
    name: "redirect-gasstation",

    data() {
        return {
            clientWidth: document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth,
            clientHeight: document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight,

            // 经纬度
            latitude: '',
            longitude: '',
        }
    },

    methods: {
        // 加油优惠
        jumpToRefuelGas(ret) {
            const _this = this;
            let openid = window.localStorage.openid; // 从本地获取openid
            let info = this.$store.state.user.info; // 获取 Vuex 顶层组件 用户信息

            // 如果未注册 跳转到注册页面
            if (info === false) {
                return this.jumpToregister();
            }

            /**
             * 【已注册-第二步】 获取优惠加油的链接
             */
            let getStationHandler = position => {
                $.ajax({
                    url: RequestedURL.getStationHandler,
                    type: "post",
                    data: {
                        action: "GetMembercards",
                        lattude: position.latitude,
                        lontude: position.longitude,
                        openid: openid
                    },
                    success: function success(datas) {
                        window.location.href = datas.Url;
                    }, 
                    error: function error() {
                        alert('获取优惠加油的链接失败');
                    }, 
                });
            }

            /**
             * 【第一步】 获取定位
             */
            html5WxBMapLocation(this, true)
            .then(position => {
                getStationHandler(position);
            }, error => {
                // 使用缓存的位置信息
                getStationHandler({
                    lattude: window.localStorage.latitude ? window.localStorage.latitude : 114,
                    lontude: window.localStorage.longitude ? window.localStorage.longitude : 22.7,
                });
            });
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
                return this.jumpToregister();
            }

            // 判断是否测试环境
            if ( window.location.host === "store.demo.ichebaoyang.com" || process.env.NODE_ENV === "development" ) {
                window.location.href =  "http://store.demo.ichebaoyang.com/Merchant/Merchanthome.html?id=180727010001925946";
            } else {
                window.location.href =  "http://picc.hotgz.com/Merchant/Merchanthome.html?id=180724010002017319";
            }
        },

        // 跳转到注册页面
        jumpToregister() {
            window.location.href = `http://${ window.location.host }/wx20/register/index.html#/index/${ window.localStorage.openid }/`;
        },
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
