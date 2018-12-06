<template>

<div id="cardInfo">
    <div id="main">
        <div id="header">
            <div class="top">
                <img class="icon" src="../../assets/img/5.jpg">
                <span>深圳百店通用精致洗车券深圳</span>
                <span>有效期 : 2018.07.01-2018.12.31</span>
                <img class="arrow" src="../../assets/img/icon_arrow@2x.png">
            </div>
            <div class="bottom">
                <p>核销码：6661 2616 3322 2112</p>
                <p v-if="!this.$route.query.type">
                    <img src="../../assets/img/5.jpg">
                </p>
                <p v-if="!this.$route.query.type">
                    <span>立即预约</span> 
                </p>
                <div v-if="this.$route.query.type" class="goPlay">
                    <img src="../../assets/img/icon_Payment02@2x.png">
                    <span>缴费出场</span>
                </div>
            </div>
        </div>
        <!-- 门店信息 -->
        <div id="shopInfo">
            <p class="allShop">
                <span>适用商家</span>
                <span @click="goShopList()">查看全部99家门店<img src="../../assets/img/Path 2@2x.png">
                </span>
            </p>
            <div class="address">
                <P>中国和谐控股豪华汽车维修中心（清龙路店）</P>
                <P>6.10km 离我最近</P>
                <P>
                    <img src="../../assets/img/icon_position02@2x.png" alt="">
                    <a>
                        <span>深圳市龙华新区清龙路原</span>
                    </a>
                    
                </P>
                <img class="call" src="../../assets/img/icon_call@3x.png">
                <p class="solid"></p>
            </div>
        </div>
        <!-- 服务介绍 -->
        <div id="introduce">
            <p>服务内容</p>
            <p>
                <a>消费介绍</a>
                <span> • 仅限XXXXXXXX消费</span>
                <span> • 仅限XXXXXXXX消费</span>
                <span> • 仅限XXXXXXXX消费</span>
                <span> • 仅限XXXXXXXX消费</span>
                
            </p>
        </div>
        <!-- 订单信息 -->
        <div id="order">
            <p>订单信息</p>
            <p>
                领取渠道 : <span>积分兑换</span>
            </p>
            <p>
                消耗积分：<span>2555555</span>
            </p>
            <p>
                购买时间：<span>2018-07-01 15:30:59</span>
            </p>
        </div>
        <div class="space"></div>
    </div>
</div>

</template>

<script>

export default {
    data(){
        return {

        }
    },
    created(){

    },
    methods:{
        goShopList(){
            this.$router.push({
                path:'/card/shopList'
            })
        }
    }
}

</script>

<style lang="less" scoped>

#cardInfo {
    background-color: #f5f5f5;
}

#main {
    width:100%;
    height:100%;
    box-sizing: border-box;
    padding-top:10px;
    #header {
        width:95%;
        height:auto;
        margin:0 auto;
        // background-color: #fff;
        //  padding-bottom:30px;
        border-radius:5px;
        .top {
            background-color: #fff;
            width:100%;
            height:113px;
            padding:20px 15px 0px 15px;
            box-sizing: border-box;
            border-bottom:1px dotted #ddd;
            border-radius:5px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            position:relative;
            .icon {
                width:90px;
                height:62px;
                width:80px;
                height:60px;
                float:left;
                margin-right:10px; 
            } 
            .arrow {
                position:absolute;
                width:14px;
                height:12px;
                top:40px;
                right:15px;
            }                 
            span {
                display: block;
                float:left;
                color:#333;
                font-size:14px;
                width:50%;
            }
            span:nth-child(2) {
                font-weight: bold;
                height:45px;
                overflow: hidden;
            }
            span:nth-child(3) {
                color:#E50012;
                font-size:12px;
                width:64%;
            }
        }
        .bottom {
            width:100%;
            background-color: #fff;
            padding-top:20px;
            padding-bottom:30px;
            border-radius:5px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            p:nth-child(1) {
                width:80%;
                background-color: #F0F0F0;
                height:40px;
                line-height: 40px;
                margin:0 auto;
                text-align: center;
                border-radius: 5px;

            }
            p:nth-child(2) {
                width:150px;
                height:150px;
                border-radius: 5px;
                border:1px solid #ddd;
                margin:0 auto;
                margin-top:20px;
                img {
                    width:100%;
                    height:100%;
                    padding:6px;
                    box-sizing: border-box;
                }
            }
            p:nth-child(3) {
                width:160px;
                height:40px;
                color:#fff;
                background-color: #E50012;
                line-height: 40px;
                text-align: center;
                font-size:15px;
                margin:0 auto;
                border-radius:5px;
                margin-top:20px;
            }
            .goPlay {
                width:200px;
                height:45px;
                background-color: #E50012;
                color:#fff;
                text-align: center;
                line-height: 45px;
                border-radius:25px;
                margin:0 auto;
                margin-top:30px;
                img {
                    width:20px;
                    height:20px;
                    vertical-align: middle;
                }
            }
        }
        
    }
    #shopInfo {
        width:100%;
        margin-top:10px;
        background-color: #fff;
        padding:0px 15px;
        box-sizing: border-box;
        .allShop{
            height:40px;
            line-height: 40px;
            font-size:14px;
            border-bottom:1px solid #ddd;
            span:first-child {
                color:#666;                  
            }
            span:nth-child(2) {
                color:#FF8D18;    
                float:right;  
                        
            }
            img {
                width:10px;
                height:10px;
                // float:right;
                    vertical-align: middle;
                    margin-top:-1px;      
            }
        }
        .address {
            position:relative;
            width:100%;
            padding:10px 0px;
            P:nth-child(1) {
                height:25px;
                font-size:14px;
                width:77%;
                overflow: hidden;
            }
            P:nth-child(2) {
                color:#808080;
                font-size:12px;
            }
            P:nth-child(3) {
                img {
                    width:16px;
                    height:16px;
                    float: left;
                    margin-top:10px;
                    margin-right:10px;
                }
                a {
                    display: inline-block;
                    width:70%;
                }
                span {
                    display: table-cell;
                    vertical-align: middle;
                    width:250px;
                    height:35px;
                    overflow: hidden;
                    color:#808080;
                    font-size:12px;
                }
            }
            .call {
                width:25px;
                height:25px;
                position:absolute;
                right:10px;
                top:30%;
            }
            .solid {
                width:1px;
                height:70%;
                background-color: #ddd;
                position: absolute;
                right:65px;
                top:15px;
            }
        }
    }
    #introduce {
        width:100%;
        background-color: #fff;
        margin-top:5px;
        padding:0px 15px 15px 15px;
            box-sizing: border-box;
        p:first-child {
            height:40px;
            line-height: 40px;
            color:#666666;
            font-size:14px;
            border-bottom:1px solid #ddd;
        }
        p:nth-child(2) {
            padding-top:10px;
            span {
                display: block;
                font-size:13px;
                color:#333;
                margin-left:10px;
            }
            a{
                color:#666;
                font-size:14px;

            }
        }
    }
    #order {
        width:100%;
        margin-top:5px;
        background-color: #fff;
        padding:0px 15px;
        padding-bottom:10px;
        box-sizing: border-box;
        p {
            font-size:13px;
            margin-left:10px;
        }
        p:first-child {
            height:40px;
            line-height: 40px;
            color:#666;
            font-size:14px;
            border-bottom:1px solid #ddd;
            margin-bottom:10px;
            margin-left:0px;
        }
        
    }
    .space {
        height:40px;
    }
}

</style>
