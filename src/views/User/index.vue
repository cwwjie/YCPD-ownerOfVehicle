<template>
    <div id="main">
        <div id="header">
            
            <!-- 已登录 -->
            <div v-if="loginIofor">
                <img :src="loginIofor.headImageUrl" alt="用户头像">
                <p>{{loginIofor.ContactName}}</p>
                <p>{{loginIofor.Mobile}}</p>
            </div>

            <!-- 未登录 -->
            <div v-else  @click="jumpToLogin">
                <img src="../../assets/img/默认头像@2x.png" alt="">
                <p class="noLogin">注册会员</p>
            </div>
            
        </div>


        <!-- 积分 卡券 -->
        <div id="twoBox">

            <div class="left">
                <p>{{userRelated.points ? userRelated.points : '0'}}</p>

                <p>
                    <img src="../../assets/img/icon_integral02@2x.png" alt="积分">
                    <span>我的积分</span>
                </p>
            </div>
            
            <div class="right">
                <p>{{loginIofor.Coupons ? loginIofor.Coupons : '0'}}</p>

                <p @click="goCardListPage">
                    <img src="../../assets/img/icon_卡券@2x.png" alt="卡券">
                    <span>我的卡券</span>
                </p>
            </div>
        </div>

        <!-- 附加信息 -->
        <div id="info">
            <p v-show="myOrder">
                <!-- <img class="icon" src="../../assets/img/订单@2x.png" alt="">
                <span>我的订单</span>
                <img class="arrow" src="../../assets/img/icon_arrow@2x.png" alt=""> -->
            </p>

            <p @click="jumpToMyCar">
                <img class="icon" src="../../assets/img/icon_car@2x.png" alt="">&nbsp;
                <span>我的车辆</span>
                <img class="arrow" src="../../assets/img/icon_arrow@2x.png" alt="">&nbsp;
                <span style="float:right;">{{loginIofor.CarNo}}</span>
            </p>
            
            <p @click="goReservationList">
                <img class="icon" src="../../assets/img/icon_预约@2x.png" alt="">&nbsp;
                <span>预约记录</span>
                <img class="arrow" src="../../assets/img/icon_arrow@2x.png" alt="">&nbsp;
            </p>

            <p @click="securityCheck">
                <img class="icon" src="../../assets/img/防伪查询@2x.png" alt="">&nbsp;
                <span>机油防伪查询</span>
                <img class="arrow" src="../../assets/img/icon_arrow@2x.png" alt="">&nbsp;
            </p>

            <p @click="callService">
                <img class="icon" src="../../assets/img/icon_call@2x.png" alt="">&nbsp;
                <span>联系我们</span>
                <img class="arrow" src="../../assets/img/icon_arrow@2x.png" alt="">&nbsp;
            </p>
        </div>

        <!-- 底部 TabBar -->
        <tabbar :selectIndex="2" />

    </div>
</template>
<script>

// 配置文件类
import config from '@/config';
// 组件类
import tabbar from '@/components/TabBar.vue';

export default {
    name: "user",

    components: { tabbar },

    data() {
        return {
            myOrder:false
        }
    },

    computed: {
        /**
         * 用户信息
         * 用于判断是否注册
         */
        loginIofor: function loginIofor() {
            return this.$store.getters.getLoginIofor;
        },

        /**
         * 用户积分 优惠券 会员
         */
        userRelated: function userRelated() {
            let VIP = {
                '1': '黄金会员',
                '2': '铂金会员',
                '3': '钻石会员',
                '0': '会员'
            }

            let related = {
                points: this.$store.state.user.points, // 用户积分
                VIP: { // VIP会员
                    grade: this.$store.state.user.VIP.grade,
                    name: VIP[this.$store.state.user.VIP.grade]
                }
            }

            return related
        }
    },

    methods:{
        /**
         * 跳转到 注册页
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
         * 跳转到 积分页面
         */
        goIntegralPage: function goIntegralPage() {
            // 判断是否 存在 用户信息
            if (this.loginIofor) {
                // 存在 用户信息 表示已注册 跳转到 积分页面
                this.$router.push({ path:'/user/integral' });

            } else {
                // 不存在 用户信息 注册页面
                this.jumpToLogin();
            }
        },

        /**
         * 跳转到 卡券列表页面
         */
        goCardListPage: function goCardListPage() {
            // 判断是否 存在 用户信息
            if (this.loginIofor) {
                // 存在 用户信息 表示已注册 跳转到 卡券列表页面
                window.location.href = `http://${window.location.host}/wx/Coupons.aspx`;

            } else {
                // 不存在 用户信息 注册页面
                this.jumpToLogin();
            }
        },

        /**
         * 跳转到 我的车辆
         */
        jumpToMyCar: function jumpToMyCar() {
            // 判断是否 存在 用户信息
            if (this.loginIofor) {
                // 存在 用户信息 表示已注册 跳转到 我的车辆
                window.location.href = `http://${window.location.host}/wx20/register/index.html#/mycar/${this.loginIofor.CustomerID}/2/3/4`;

            } else {
                // 不存在 用户信息 注册页面
                this.jumpToLogin();
            }
        },

        /**
         * 联系呼叫客服 
         */
        callService: function callService() {
            window.location.href = 'tel://4001106558';
        },

        /**
         * 跳转到 防伪查询
         */
        securityCheck: function securityCheck() {
            // 判断是否测试环境
            if (window.location.host === 'store.demo.ichebaoyang.com') {
                window.location.href = 'http://mall.demo.hotgz.com/lc.html';

            } else {
                // 只要不是测试环境，统一跳转到正式环境
                window.location.href = 'http://mall.ichebaoyang.com/lc.html';

            }
        },

        /**
         * 跳转到 预约记录页面
         */
        goReservationList: function goReservationList() {
            // 判断是否 存在 用户信息
            if (this.loginIofor) {
                // 存在 用户信息 表示已注册 跳转到 预约记录页面
                this.$router.push({ 
                    path: '/reservationList', 
                    query: {
                        CustomerID: this.loginIofor.CustomerID
                    }
                });

            } else {
                // 不存在 用户信息 注册页面
                this.jumpToLogin();
            }
        }
    }
}
</script>
<style lang="less" scoped>
    #main {
        width:100%;
        height:100vh;
        background-color:#f5f5f5;

        #header {
            padding:25px 15px;
            box-sizing:border-box;
            color:#fff;
            font-size:15px;
            width:100%;
            height:110px;
            background:url('../../assets/img/Bitmap@2x.png') center bottom no-repeat #E50012;
            .noLogin {
               width:100px;
               height:30px;
               border:1px solid #fff;
               margin-left:70px;
               text-align: center;
               border-radius:5px;
               line-height: 30px;
               position:absolute;
               top:38px;

            }
            img {
                width:60px;
                height:60px;
                float:left;
                margin-right:10px;
                border-radius:50%;
            }
        }
        #twoBox {
            text-align: center;
            width:100%;
            height:92px;
            margin-top:5px;
            background-color: #fff;
            margin-bottom:5px;
            font-size:16px;
            div {
                box-sizing: border-box;
                padding-top:20px;
                width:49%;
                height:100%;
                color:#666;
                float:left;
                border-right:1px solid #ddd;
                img {
                    width:12px;
                    height:12px;
                    vertical-align:middle;
                }
                p:first-child {
                    color:#FF8D18;
                }
                span {
                    font-size:14px;
                   
                }
            }
            .right {
                float:right;
                  border-right:none;
                p:first-child {
                    color:#E50012;
                }
            }
        }
        #info {
            width:100%;
            p {
                background-color: #fff;
                height:48px;
                line-height: 45px;
                font-size:15px;
                padding:0 15px;
                // border-bottom:1px solid #ddd;
                position:relative;
                color:#666;
                .icon {
                    width:16px;
                    height:16px;
                    vertical-align: middle;
                }
                span {
                    vertical-align: middle;
                }
                .arrow {
                    width:12px;
                    height:12px;
                    float:right;
                    margin-top:16px;
                }
            }
            p:nth-child(2) {
                margin-top:5px;
                margin-bottom:1px;
            }
            p:nth-child(3) {
                margin-bottom:5px;
            }
            p:nth-child(4) {
                margin-bottom:1px;
            }
            
        }

        #tabBar {
            height:50px;
            width: 100%;
            position:fixed;
            bottom:0px;
            text-align: center;
            background-color: #fff;
            // line-height: 50px;
            color:#F56C6C;
            font-size:12px;
            padding:4px 0px;
            box-sizing: border-box;
            div {
                margin-top:-4px;
            }
        }
    }
</style>

