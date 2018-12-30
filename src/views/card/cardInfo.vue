<template>

<div id="cardInfo">
    <div id="main">
        <div id="header">
            <div class="top">
                <img class="icon" :src=Voucher.CouponImgUrl>
                <span>{{Voucher.VoucherName}}</span>
                <span>有效期 : {{BeginTime+'-'+EndTime}}</span>
               <!--  <img class="arrow" src="../../assets/img/icon_arrow@2x.png"> -->
            </div>
            <div class="bottom clearFloat">
                <p>核销码：{{Voucher.VoucherCode}}</p>
                <p >
                    <img :src="src">
                </p>
                <p class="goPlay storList" v-if="!this.$route.query.type" @click="goShopList"
                >
                    <span >查看服务网点</span> 
                </p>
                <p class="goPlay" v-if="!this.$route.query.type" @click="appointment">
                    <span>立即预约</span> 
                </p>

                 <div v-if="this.$route.query.type" class="storList" @click="goShopList">
                    <span>查看服务网点</span>
                </div>
                <div v-if="this.$route.query.type" class="goPlay">
                    <img src="../../assets/img/icon_Payment02@2x.png">
                    <span>缴费出场</span>
                </div>
            </div>
        </div>
        <!-- 服务介绍 -->
        <div id="introduce">
            <p>服务内容</p>
            <p>{{Voucher.Introduce}}</p>
        </div>
        <!-- 订单信息 -->
    <!--     <div id="order">
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
        </div> -->
        <!-- <div class="space"></div> -->
    </div>
</div>

</template>

<script>
import RequestedURL from '@/config/RequestedURL.js';
export default {
    data(){
        return { 
            id:this.$route.query.id,   // 获取券的id

            Voucher:'',         // 券详情

            src:'',            // 二维码路径

            BeginTime:'',      // 券生效时间

            EndTime:'',        // 券失效时间

            openId:this.$route.query.openId,  // 用户openId

            CustomerID:this.$route.query.CustomerID  // 车主id

        }
    },
    created(){
        // 获取券详情
        this.getVoucherInfo()

        
    },
    methods:{
        // 前往商家列表
        goShopList(){
            window.location.href = `http://${window.location.host}/wx20/storeList/index.html#/?productId=${this.Voucher.ProductID}`
        },

        // 获取券的详情
        getVoucherInfo:function(){
            const that = this
            $.ajax({
                url:RequestedURL.getVoucherCarOwnerList,
                type:'post',
                data:{
                    CustomerID:that.CustomerID,
                    CarOwnerID:that.id,
                },
                success:function(res){
                    console.log(res)
                    if(res.Code===200){
                          that.src=`http://ycpd.demo.hotgz.com/WebPages/DataManagePages/StoreHandler/qrcode.aspx?url=${res.Data.List[0].VoucherCode}`

                            that.BeginTime = res.Data.List[0].BeginTime.slice(0,10)
                            that.EndTime = res.Data.List[0].EndTime.slice(0,10)
                            that.Voucher = res.Data.List[0]
                    }else {
                        alert(res.Msg)
                    }
                },
                error:function(){
                    alert('服务器异常')
                }
            })
        },

        // 前往预约
        appointment:function(){
            window.location.href = `http://${window.location.host}/wx20/carReservation/index.html#/?name=公众号&openId=${window.localStorage.openid}&ProductID=${this.Voucher.ProductID}`;
        }
    }
}

</script>

<style lang="less" scoped>
.clearFloat {
    overflow: hidden;
    zoom: 1;
}

#cardInfo {
    background-color: #f5f5f5;
}

#main {
    width:100%;
    height:100vh;
    box-sizing: border-box;
    padding:0px 15px;
    padding-top:10px;
    #header {
        width:100%;
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
                    // padding:6px;
                    box-sizing: border-box;
                }
            }
            // p:nth-child(3) {
            //     width:160px;
            //     height:40px;
            //     color:#fff;
            //     background-color: #E50012;
            //     line-height: 40px;
            //     text-align: center;
            //     font-size:15px;
            //     margin:0 auto;
            //     border-radius:5px;
            //     margin-top:20px;
            // }
            .goPlay {
                width:39%;
                height:40px;
                background-color: #E50012;
                color:#fff;
                text-align: center;
                line-height: 40px;
                border-radius:25px;
                margin:0 auto;
                margin-top:30px;
                img {
                    width:20px;
                    height:20px;
                    vertical-align: middle;
                }
                float:right;
                margin-right:25px;
            }
            .storList {
                background-color: #FFAA00;
                float:left;
                width:39%;
                height:40px;
                color:#fff;
                text-align: center;
                line-height: 40px;
                border-radius:25px;
                margin:0 auto;
                margin-top:30px;
                margin-left: 25px;
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
        margin-top:10px;
        padding:0px 15px 15px 15px;
        box-sizing: border-box;
        border-radius: 5px;

        p:first-child {
            height:40px;
            line-height: 40px;
            color:#666666;
            font-size:14px;
            border-bottom:1px solid #ddd;
        }
        p:nth-child(2) {
            padding-top:10px;
            font-size: 14px;
            // span {
            //     display: block;
            //     font-size:13px;
            //     color:#333;
            //     margin-left:10px;
            // }
            // a{
            //     color:#666;
            //     font-size:14px;

            // }
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
