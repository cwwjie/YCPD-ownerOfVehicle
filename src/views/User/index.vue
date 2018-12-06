<template>
    <div >
        <div id="main">
            <div id="header">
                <!-- 已登录 -->
                <div v-if="loginIofor">
                    <img :src="loginIofor.headImageUrl" alt="用户头像">
                    <p>{{loginIofor.ContactName}}</p>
                    <p>{{loginIofor.Mobile}}</p>
                </div>
                <!-- 未登录 -->
                <div v-else  @click="jumpToLogin()">
                    <img src="../../assets/img/默认头像@2x.png" alt="">
                    <p class="noLogin">注册会员</p>
                </div>
              
            </div>
            <!-- 积分 卡券 -->
            <div id="twoBox">
                <div class="left">
                    <p>{{userRelated.points?userRelated.points:'0'}}</p>
                    <p>
                        <img src="../../assets/img/icon_integral02@2x.png" alt="">
                        <span>我的积分</span>
                    </p>
                </div>
                <div class="right">
                    <p>{{loginIofor.Coupons?loginIofor.Coupons:'0'}}</p>
                    <p @click="goCardListPage()">
                        <img src="../../assets/img/icon_卡券@2x.png" alt="">
                        <span>我的卡券</span>
                    </p>
                </div>
            </div>
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
    </div>
</template>
<script>
// 底部tab栏
import tabbar from '@/components/TabBar.vue';
    export default {
        //导入底部切换栏组件
        components:{
            tabbar
        },
        data(){
            return {
                myOrder:false
            }
        },
        computed: {
            loginIofor() { // 用户信息 
                return this.$store.getters.getLoginIofor
            },

            openid() {
                // 为什么不能通过 getters getLoginIofor 带出 openid?
                // 因为 即使未登录 openid 也是存在的 
                return this.$store.state.user.openid
            },
            userRelated() { // 用户积分 优惠券 会员
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

            // 跳转到登录页面
            jumpToLogin() {
                let openid = this.$store.state.user.openid;
                // 判断顶部是否存在 openid
                if (!openid) {
                    openid = window.localStorage.openid;
                }
                window.location.href = `http://${window.location.host}/wx20/register/index.html#/index/${openid}/`;
            },

            // 底部tabBar 切换
            tabbarClick(selectIndex) { // 底部 tabbar 点击触发
                if (selectIndex === 'home') { // 如果 标识为 home 则跳转到 主页
                    this.$router.push({path:'/home'});
                }
            },

            //前往积分页面
            goIntegralPage(){
               if (this.loginIofor){
                    this.$router.push({
                        path:'/user/integral'
                    })
               }else {
                   this.jumpToLogin()
               }  
            },

            //前往卡券列表页面
            goCardListPage(){
                if (this.loginIofor){
                    // this.$router.push({
                    //     path:'/card/cardList'
                    // })
                    window.location.href = `http://${window.location.host}/wx/Coupons.aspx`
                }else {
                    this.jumpToLogin()
                } 
            },

            //前往我的车辆
            jumpToMyCar() {
                if (this.loginIofor){
                    window.location.href = `http://${window.location.host}/wx20/register/index.html#/mycar/${this.loginIofor.CustomerID}/2/3/4`;
                }else {
                    this.jumpToLogin()
                }
               
            },

            // 联系客服
            callService() { // 呼叫客服
                window.location.href = 'tel://4001106558';
            },

            // 防伪查询
            securityCheck(){
                window.location.href = 'http://mall.ichebaoyang.com/lc.html'
            },

            // 前往预约记录页面
            goReservationList(){
                // this.$router.push({
                //        path:'/reservationList',query:{CustomerID:'181031010002069799'}
                //    })
                if (this.loginIofor){
                   this.$router.push({
                       path:'/reservationList',query:{CustomerID:this.loginIofor.CustomerID}
                   })
                }else {
                    this.jumpToLogin()
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

