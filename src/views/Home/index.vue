<!-- 主页 首屏页面 -->
<template>
<div class="home">
    
    <!-- 轮播图 -->
    <div class="home-swiper">
        <div class="home-swiper-content">
            <mt-swipe :auto="4000" :style="`height: ${clientWidth / 375 * 160 /** 设置轮播图高度 按照 375: 160 比例 */ }px; width: 100%`">
                <mt-swipe-item v-for="(value, key) in swiperlist" :key="key">
                    <img :alt="value.alt" :src="value.src" @click="value.click"/>
                </mt-swipe-item>
            </mt-swipe>
        </div>
    </div>

    <!-- 登陆框  -->
    <div class="home-login" @click="jumpToLogin" v-if="!loginIofor"> <!-- 如果未登录则不显示 -->
        <div class="login-content">

            <div class="login-img">
                <img src="./../../assets/YCPD.png" />
            </div>
            
            <div class="login-description">
                <div class="login-description-content">
                <div class="description-main">注册会员</div>
                </div>
            </div>

        </div>
    </div>

    <!-- 入口合集 -->
    <div class="home-entry-list">
        <div class="entry-list-content">

            <!-- 洗车美容 优惠加油 停车服务 快速充电 -->
            <div class="entry-item" @click="goStoreList">
                <div class="entry-svg-content" >
                    <img src="../../assets/img/洗车美容 copy@2x.png"/>
                </div>
                <div class="item-name">洗车美容</div>
            </div>

            <div class="entry-item" @click="jumpToGasStation()">
                <div class="entry-svg-content">
                <img src="../../assets/img/优惠加油 copy@2x.png"/>
                </div>
                <div class="item-name">优惠加油</div>
            </div>

            <div class="entry-item" @click="parkService">
                <div class="entry-svg-content" >
                <img src="../../assets/img/停车服务 copy@2x.png"/>
                </div>
                <div class="item-name">停车服务</div>
            </div>

            <div class="entry-item" @click="jumpToCharge">
                <div class="entry-svg-content">
                <img src="../../assets/img/快速充电 copy@2x.png"/>
                </div>
                <div class="item-name">快速充电</div>
            </div>


            <!-- 放心保养 维修养护 紧急救援 违章查询 -->
            <div class="entry-item" @click="goStoreList">
                <div class="entry-svg-content" >
                <img src="../../assets/img/放心保养 copy@2x.png"/>
                </div>
                <div class="item-name">放心保养</div>
            </div>

            <div class="entry-item" @click="goStoreList">
                <div class="entry-svg-content" >
                <img src="../../assets/img/维修养护 copy@2x.png"/>
                </div>
                <div class="item-name">维修养护</div>
            </div>

            <div class="entry-item" @click="showNotCompleted">
                <div class="entry-svg-content" >
                <img src="../../assets/img/紧急救援 copy@2x.png"/>
                </div>
                <div class="item-name">紧急救援</div>
            </div>
            
            <div class="entry-item" @click="jumpToUrlWhetherLogin(`http://${locationhost}/wx/weizhangfiner.html`)">
                <div class="entry-svg-content">
                    <img src="../../assets/img/违章查询 copy@2x.png"/>
                </div>
                <div class="item-name">违章查询</div>
            </div>

        </div>
    </div>

    <!-- 保险预约 入口 -->
    <div id="home-twoPlate">
        <div @click="appointment('人保')">
            <img class="img" src="../../assets/img/PICC_logo@2x.png">

            <p>
                <span>服务预约</span>
                <img src="../../assets/img/icon_arrow@2x.png" alt="">
            </p>
        </div>

        <div @click="appointment('平安')">
            <img class="img" src="../../assets/img/pingan_logo@2x.png">

            <p>
                <span>服务预约</span>
                <img src="../../assets/img/icon_arrow@2x.png" alt="">
            </p>
        </div>
    </div>

    <!-- 底部 TabBar -->
    <tabbar :selectIndex="0" />
</div>
</template>

<script>
// 框架类
import Vue from "vue";
import { Swipe, SwipeItem, Toast } from "mint-ui";

// 请求类
import ajaxs from "./ajaxs.js";

// 配置文件类
import config from '@/config';
import RequestedURL from "@/config/RequestedURL.js";

// 自定义组件类
import tabbar from "@/components/TabBar.vue";
import html5WxBMapLocation from "@/components/html5WxBMapLocation";
import convertDate from "@/utils/convertDate";

// 初始化类
Vue.component("mt-swipe", Swipe);
Vue.component("mt-swipe-item", SwipeItem);

export default {
    name: "home",

    components: { tabbar },

    data() {
        return {
            clientWidth: document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth, // 设备的宽度
            clientHeight: document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight, // 设备高度

            swiperlist: [
                {
                    // 轮播图 每隔一个小时强制刷新一次
                    alt: "养车频道-banner",
                    src: `https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/home/banner01.jpg?${convertDate.dateToYYYYmmDDhhMM00(new Date())}`, // 放置在阿里云储存里, 方便替换
                    click: this.jumpToGasStation
                }, {
                    alt: "养车频道-banner",
                    src: `https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/home/banner02.jpg?${convertDate.dateToYYYYmmDDhhMM00(new Date())}`,
                    click: () => this.jumpToUrlWhetherLogin("http://picc.hotgz.com/Merchant/Merchanthome.html?id=180724010002017319")
                }
            ],

            locationhost: window.location.host,
        };  
    },

    computed: {
        /**
         * 用户信息
         * 用于判断是否注册
         */
        loginIofor: function loginIofor() {
            return this.$store.getters.getLoginIofor; // 如果未登录 返回 false
        },

    },

    mounted() { },

    methods: {
        /**
         * 跳转到注册页
         */
        jumpToLogin: function jumpToLogin() {
            // 判断是否存在openid 并且 校验 openid 的合法性
            if (window.localStorage.openid && window.localStorage.openid.length > 15) {
                // 只有 openid 正确的情况下才可以跳转到注册页面
                window.location.href = `http://${window.location.host}/wx20/register/index.html#/index/${window.localStorage.openid}/`;

            } else {
                // 判断是否出现过 获取openid错误
                if (window.localStorage.haveOpenidError) {
                    // 表示第二次出现 获取openid错误
                    alert('无法获取微信openid, 请联系客服人员');

                // 未出现过获取openid错误
                } else {
                    // 缓存 获取openid出现错误 的状态
                    window.localStorage.setItem('haveOpenidError', 'true'); 
                    // 并且弹出提示
                    if (confirm('获取微信用户信息失败, 是否重新获取?')) {
                        window.location.href = config.YcpdUrlWidthWxCode(); // 重新获取 code
                    }
                }
            }
        },

        /**
         * 根据是否登录 跳转Url 复用方法
         */
        jumpToUrlWhetherLogin: function jumpToUrlWhetherLogin(url) {
            // 判断是否 存在 用户信息
            if (this.loginIofor) {
                // 存在 用户信息 表示已注册 跳转到 指定链接
                window.location.href = url;

            } else {
                // 不存在 用户信息 注册页面
                this.jumpToLogin();
            }
        },

        /**
         * 跳转到 商家列表
         */
        goStoreList: function goStoreList() {
            // 判断是否 存在 用户信息
            if (this.loginIofor) {
                // 存在 用户信息 表示已注册 跳转到 商家列表
                window.location.href = `http://${window.location.host}/wx20/storeList/index.html#/?productTypeId=''&openId=${window.localStorage.openid}`;

            } else {
                // 不存在 用户信息 注册页面
                this.jumpToLogin();
            }
        },

        /**
         * 跳转到 服务预约 的函数
         * @param {appoinType} 表示预约类型 例如： 人保 平安 预约
         */
        appointment: function appointment(appoinType) {
            // 判断是否 存在 用户信息
            if (this.loginIofor) {
                // 存在 用户信息 表示已注册 跳转到 服务预约的页面
                window.location.href = `http://${window.location.host}/wx20/carReservation/index.html#/?name=${appoinType}&openId=${window.localStorage.openid}`;
                
            } else {
                // 不存在 用户信息 注册页面
                this.jumpToLogin();
            }
        },
    
        /**
         * 跳转到 优惠加油
         */
        jumpToGasStation: function jumpToGasStation() {
            const _this = this;
            let openid = window.localStorage.openid;

            // 判断是否 存在 用户信息
            if (!this.loginIofor) {
                // 不存在 用户信息 注册页面
                return this.jumpToLogin();
            }

            /**
             * 【第二步】 获取优惠加油的链接
             */
            let getStationHandler = position => {
                $.ajax({
                    url: RequestedURL.getStationHandler,
                    type: "post",
                    data: {
                        action: "GetStation",
                        lattude: position.latitude,
                        lontude: position.longitude,
                        openid: openid
                    },
                    success: function success(datas) {
                        window.location.href = datas.Url;
                    }, 
                    error: function error() {
                        alert('获取优惠加油的链接失败, 请联系客服人员.');
                    }, 
                });
            }

            /**
             * 【第一步】 获取定位
             */
            html5WxBMapLocation(_this, true)
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

        /**
         * 跳转到 充电桩项目
         */
        jumpToCharge: function jumpToCharge() {
            // 判断是否 存在 用户信息
            if (this.loginIofor) {
                // 存在 用户信息 表示已注册 跳转到 充电桩
                window.location.href = `http://${window.location.host}/wx20/Web_Charge/index.html#/index?openid=${window.localStorage.openid}&CarNo=${this.loginIofor.CarNo}&CustomerID=${this.loginIofor.CustomerID}`;

            } else {
                // 不存在 用户信息 注册页面
                this.jumpToLogin();
            }
        },
    
        /**
         * 跳转到 停车服务
         */
        parkService: function parkService() {
            const _this = this;

            /**
             * 通过经纬度 跳转到停车服务 的方法
             */
            let jumpByLocation = position => {
                window.location.href = `http://${window.location.host}/wx20/stopCar/index.html#/?tel=${_this.loginIofor.Mobile}&lat=${position.latitude}&lng=${position.longitude}&CustomerID=${_this.loginIofor.CustomerID}`;
            }

            // 【第一步】判断是否 存在 用户信息
            if (this.loginIofor) {

                // 存在 用户信息 表示 已注册 
                // 【第二步】已注册 的情况下 先获取最新的定位 
                html5WxBMapLocation(this, true)
                .then(position => {
                    
                    // 【第三步】成功获取 最新的定位 
                    jumpByLocation(position); // 通过经纬度 跳转到 停车服务

                }, error => {
                    
                    // 【第三步】获取 最新的定位 失败， 使用缓存的定位数据 
                    jumpByLocation({ // 通过经纬度 跳转到 停车服务
                        lattude: window.localStorage.latitude ? window.localStorage.latitude : 114,
                        lontude: window.localStorage.longitude ? window.localStorage.longitude : 22.7,
                    });
                });

            } else {
                // 不存在 用户信息 注册页面
                this.jumpToLogin();
            }
        },

        /**
         * 弹出 升级中 提示
         */
        showNotCompleted: function showNotCompleted() {
            Toast({ message: "升级中", duration: 1000 });
        },
    }
};
</script>

<style scoped lang="less">

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

    .mint-swipe-items-wrap img {
        width: 100%;
        height: 100%;
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
                width: 48px;
                height: 48px;
                border-radius: 20px;
                background: #fff;

                img {
                    width: 46px;
                    height: 46px;
                    border: none;
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
    width: 100%;
    height: 100px;
    margin-top: 10px;

    div {
        width: 49.5%;
        height: 100%;
        background-color: #fff;
        text-align: center;
        padding: 10px 0px 16px 0px;
        box-sizing: border-box;
        font-size: 14px;
        color: #666;

        .img {
            width: 100px;
            height: 50px;
        }

        p {
            height: 20px;
            line-height: 20px;
            position: relative;

            img {
                width: 12px;
                height: 12px;
                position: absolute;
                top: 4px;
            }
        }
    }

    div:nth-child(1) {
        float: left;
    }

    div:nth-child(2) {
        float: right;
    }
}

</style>
