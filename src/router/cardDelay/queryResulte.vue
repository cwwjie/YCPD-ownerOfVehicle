<template>
    <div id="queryResulte">
        <div id="main">
            <!-- 上 -->
            <div id="top">
                <div class="left">
                    <img src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-carDelay/renbaoLOGO.png">
                </div>
                <div class="right">
                    <p>{{renBao.name}}</p>
                    <p>车牌：{{renBao.carNo}}</p>
                    <p>有效期：</p>
                    <p>券码：{{renBao.verificationCode}}</p>
                </div>
                
            </div>

            <!-- 中 -->
            <div id="middle">您的券符合活动要求，可延期为：</div>

            <!-- 下 -->
            <div id="bottom">
                <div class="left">
                    <img src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-carDelay/ycpdLOGO.png">
                </div>
                <div class="right">
                    <p>{{ycpd.name}}</p>
                    <p>车牌：{{renBao.carNo}}</p>
                    <p>有效期：{{ycpd.time}}前</p>
                </div>
            </div>

            <!-- 按钮模块 -->
            <div id="btn">
                <div @click="back">返回查询</div>
                <div @click="confirmDelay()">确认延期</div>
            </div>
        </div>

        <!-- 底部电话号码模块 -->
        <div id="call">
            <span>如有疑问，请咨询：</span>
            <span>
                <a href="tel: 400-110-6558">
                     400-110-6558
                </a>
            </span>
        </div>

        <!-- 延期成功提示框 -->
        <div v-show="isSuccess" id="success">
            <div class="content">
                <P>延期成功</P>
                <P>您可在“我的-优惠券”中使用延期后的优惠券</P>
                <P @click="goMyCard">我的优惠券</P>
                <P @click="goCarQuery">继续延期</P>
            </div>
            <!-- 关闭按钮 -->
            <img @click="close" src="../../assets/img/icon_close1@2x.png" alt="">
        </div>
    </div>
</template>

<script>
import RequestedURL from './../../config/RequestedURL.js'; //导入链接
import { setTimeout } from 'timers';
import { EILSEQ } from 'constants';
import { Toast } from "mint-ui";
export default {
    components: {
        // mint-ui
        Toast
    },
    data () {
        return {
            //控制延期成功的提示框
            isSuccess:false,
            //人保
            renBao:{
                name:'',
                carNo:'',
                time:'',
                verificationCode:'',
            },
            //养车频道
            ycpd:{
                name:'',
                carNo:'',
                time:'',
            },

        }
    },
    created(){
        console.log('id:'+this.$store.state.user.openid)
        //调用获取人保券详情方法
        this.getCarInfo()

        //调用通过人保券服务名获取养车频道券信息
        setTimeout(()=>{
             this.getYcpdCar()
        },300)
    },

    methods: {

        //关闭延期成功的提示框
        close(){
            this.isSuccess = false
        },

        //返回
        back(){
            window.history.go(-1)
        },

        //获取人保卡券详情
        getCarInfo(){
            let _this = this
            $.ajax({
                url: RequestedURL.getStationHandler1,
                type: "post",
                data: {
                    action:"PICC_VerificationFetch",
                    storeID:_this.$route.query.storeID,
                    token: _this.$route.query.token,
                    verificationCode:_this.$route.query.verificationCode,
                },
                dataType:'json',
                success: function (datas) {
                    if(datas.code=='-1'||datas.code=='200'){
                       _this.renBao.name = datas.data.name
                       _this.renBao.carNo = datas.data.plateNumber
                       _this.renBao.verificationCode = datas.data.verificationCode
                    }
                },
            })
            
        },

        //通过人保卡券的服务名获取养车频道的卡券信息
        getYcpdCar(){
            let _this = this
            $.ajax({
                url: RequestedURL.getStationHandler1,
                type: "post",
                data: {
                    action:"PICC_VerificationCoilsExchangeList",
                    productName:_this.renBao.name
                },
                dataType:'json',
                success: function (datas) {
                    console.log(datas)
                   _this.ycpd.name = datas.BaseData.Name
                   _this.ycpd.time = datas.BaseData.Time
                },
            })
        },

        //确认延期
        confirmDelay(){
            let _this = this
            $.ajax({
                url: RequestedURL.getStationHandler1,
                type: "post",
                data: {
                    action:"PICC_VerificationCoilsExchangeSubmit",
                    OpenId:_this.$store.state.user.openid,
                    verificationCode:_this.renBao.verificationCode,
                    storeID:_this.$route.query.storeID,
                },
                dataType:'json',
                success: function (datas) {
                    console.log(datas)
                    if(datas.code=='200'){
                        _this.isSuccess = true
                    }else {
                        Toast({
                            message: "延期出现异常,请重试",
                            duration: 1000
                        });
                    }
                },
            })
        },
        //前往继续延期
        goCarQuery(){
            this.$router.push({path:'/cardDelay/cardQuery'})
        },

        //前往我的卡券
        goMyCard(){
            window.location.href = `http://${window.location.host}/wx/Coupons.aspx`
        }

    }
}
</script>

<style lang='less' scoped>
    #queryResulte {
        width:100%;
        height:100%;
        background-color: #f5f5f5;
    }
    #main {
        width:100%;
        height:100%;
        padding:0px 15px;
        padding-top:15px;
        box-sizing: border-box;
        //上
        #top {
            width:100%;
            height:101px;
            background:url('../../assets/img/box_bg1@2x.png')  no-repeat;
            background-size:100% 100%;
            position:relative;
            padding:15px;
            box-sizing: border-box;
            display:flex;
            .left {
                flex:1;
                line-height: 101px;
                img {
                    width:52px;
                    height:52px;
                    border-radius:50%;
                    position:absolute;
                    top:24px;
                    left:25px;
                    padding:0 3px;
                    box-sizing: border-box;
                    background-color: #fff;
                }
            }
            .right {
                flex:2;
                p:nth-child(1) {
                    color:#666;
                    font-size:14px;
                    // font-weight: bold;
                    margin-top:-4px;
                }
                p:nth-child(2),p:nth-child(3),p:nth-child(4) {
                    color:#aaa;
                    font-size:13px;
                }
            }  
        }
        //中
        #middle {
            font-size:14px;
            color:#e50012;
            margin:15px 0 10px 0;
        }
        //下
        #bottom {
            width:100%;
            height:101px;
            background:url('../../assets/img/box_bg2@2x.png')  no-repeat;
            background-size:100% 100%;
            position:relative;
            padding:15px;
            box-sizing: border-box;
            display:flex;
            .left {
                flex:1;
                img {
                    width:48px;
                    height:48px;
                    border-radius:50%;
                    position:absolute;
                    top:26px;
                    left:27px;
                }
            }
            .right {
                flex:2;
                p:nth-child(1) {
                    color:#333;
                    font-size:14px;
                    margin-top:-4px;
                }
                p:nth-child(2) {
                    color:#999;
                    font-size:13px;
                }
                p:nth-child(3) {
                    color:#F61616;
                    font-size:13px;
                }
            }
           
        }

        //按钮模块
        #btn {
            width:100%;
            height:44px;
            line-height: 44px;
            text-align: center;
            font-size:15px;
            margin-top:30px;
            div:first-child {
                width:35%;
                height:100%;
                background-color: #fff;
                color:#999;
                border-radius:25px;
                float:left;
                box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.05);
            }
            div:nth-child(2) {
                width:60%;
                height:100%;
                background:linear-gradient(207deg,rgba(255,80,37,1) 0%,rgba(246,22,22,1) 100%,rgba(246,22,22,1) 100%);
                color:#fff;
                border-radius:25px;
                float:right;
                box-shadow: 0px 1px 6px 0px rgba(246, 22, 22, 0.3);
            }
        }
    }

    //底部电话号码模块
    #call {
        font-size:13px;
        width:100%;
        height:105px;
        position:absolute;
        bottom:0px;
        text-align: center;
        background:url('../../assets/img/Fill2@2x.png') center center ;
        line-height: 140px;
        box-sizing: border-box;
        span:first-child {
            color:#333;
        }
        span:nth-child(2){
                a {
                    color:#5594FF;
                    text-decoration:none;
                }
        }
    }

    #success {
        width:100%;
        height:100%;
        background-color: rgba(0,0,0,0.5);
        position:absolute;
        top:0px;
        text-align: center;
        .content {
            width:80%;
            height:270px;
            background: url('https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-carDelay/bg_%402x.png') no-repeat;
            background-size: 100% 100%;
            margin:0 auto;
            margin-top:40%;
            border-radius:10px;
            text-align: center;
            padding-top:50px;
            box-sizing: border-box;
            p:first-child {
                color:#FFE210;
                font-size:16px;
            }
            p:nth-child(2) {
                color:#fff;
                font-size:13px;
                margin-top:40px;
            }
            p:nth-child(3) {
                width:70%;
                height:40px;
                color:#E50012;
                font-size:14px;
                background-color: #fff;
                border-radius:20px;
                line-height: 40px;
                margin: 0 auto;
                margin-top:20px;
            }
            p:nth-child(4) {
                width:70%;
                height:38px;
                color:#fff;
                font-size:14px;
                border-radius:20px;
                line-height: 40px;
                margin: 0 auto;
                margin-top:10px;
                border:1px solid #fff;
            }
        }
        img {
            width:28px;
            height:28px;
            margin-top:25px;
        }
    }

</style>
