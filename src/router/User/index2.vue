<template>
    <div >
        <div id="main">
            <div id="header">
                <img src="../../assets/img/快速充电 copy@2x.png" alt="">
                <p>黄大锤</p>
                <p>13616094955</p>
            </div>
            <!-- 积分 卡券 -->
            <div id="twoBox">
                <div class="left" @click="goIntegralPage()">
                    <p>6000</p>
                    <p>
                        <img src="../../assets/img/icon_integral02@2x.png" alt="">
                        <span>我的积分</span>
                    </p>
                </div>
                <div class="right">
                    <p>7000</p>
                    <p @click="goCardListPage()">
                        <img src="../../assets/img/icon_卡券@2x.png" alt="">
                        <span>我的卡券</span>
                    </p>
                </div>
            </div>
            <div id="info">
                <p>
                    <img class="icon" src="../../assets/img/订单@2x.png" alt="">
                    <span>我的订单</span>
                    <img class="arrow" src="../../assets/img/icon_arrow@2x.png" alt="">
                </p>
                <p>
                    <img class="icon" src="../../assets/img/icon_car@2x.png" alt="">
                    <span>我的车辆</span>
                    <img class="arrow" src="../../assets/img/icon_arrow@2x.png" alt="">
                </p>
                <p>
                    <img class="icon" src="../../assets/img/icon_预约@2x.png" alt="">
                    <span>预约记录</span>
                    <img class="arrow" src="../../assets/img/icon_arrow@2x.png" alt="">
                </p>
                <p>
                    <img class="icon" src="../../assets/img/防伪查询@2x.png" alt="">
                    <span>机油防伪查询</span>
                    <img class="arrow" src="../../assets/img/icon_arrow@2x.png" alt="">
                </p>
                <p>
                    <img class="icon" src="../../assets/img/icon_call@2x.png" alt="">
                    <span>联系我们</span>
                    <img class="arrow" src="../../assets/img/icon_arrow@2x.png" alt="">
                </p>
            </div>
            <!-- 底部 TabBar -->
            <tabbar 
            :selectIndex="2"
            :callbackFun="tabbarClick"
            />
        </div>
    </div>
</template>
<script>
// 底部tab栏
import tabbar from './../../components/TabBar.vue';
    export default {
        //导入底部切换栏组件
        components:{
            tabbar
        },
        data(){
            return {

            }
        },
        methods:{
            tabbarClick(selectIndex) { // 底部 tabbar 点击触发
                if (selectIndex === 'home') { // 如果 标识为 home 则跳转到 主页
                    this.$router.push({path:'/home'});
                }
            },
            //前往积分页面
            goIntegralPage(){
                this.$router.push({
                    path:'/user/integral'
                })
            },
            //前往卡券列表页面
            goCardListPage(){
                this.$router.push({
                    path:'/card/cardList'
                })
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
            img {
                width:60px;
                height:60px;
                float:left;
                margin-right:10px;
            }
        }
        #twoBox {
            text-align: center;
            width:100%;
            height:92px;
            margin-top:5px;
            background-color: #fff;
            margin-bottom:5px;
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
                    font-size:13px;
                   
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
                height:44px;
                line-height: 44px;
                font-size:14px;
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
                    margin-top:15px;
                }
            }
            p:nth-child(2) {
                margin-top:5px;
                border-bottom:1px solid #ddd;
            }
            p:nth-child(3) {
                margin-bottom:5px;
            }
            p:nth-child(4) {
                border-bottom:1px solid #ddd;
            }
            
        }
    }
</style>

