<template>
    <div id="cardQuery">
        <div id="query">
            <!-- 核销码输入框 -->
            <p>
                <span>核销码 :</span>
                <input v-model="verificationCode" type="text">
                <img @click="goCode()" src="../../assets/img/icon_scan_qr01@2x.png" alt="">
            </p>

            <!-- 查询按钮 -->
            <p @click="goQueryResulte">查询</p>

            <!-- 如何查看我的核销码模块 -->
            <p>如何查看我的核销码？</p>
                <!-- 平安 -->
            <!-- <p @click="goExamples(1)">
                <img src="../../assets/img/好车主@2x.png">
                <span>平安好车主 APP</span>
                <span>我的-我的卡券-卡券详情</span> 
                <span>示例
                     <img class="arrow" src="../../assets/img/icon_arrow@2x.png">
                </span>
               
            </p> -->
            <p></p>
                <!-- 人保 -->
            <p @click="goExamples()">
                <img src="../../assets/img/人保@2x.png">
                <span>深圳人保财险 微信公众号</span>
                <span>我-我的礼品-服务礼品-卡券详情</span> 
                <span>示例
                     <img class="arrow" src="../../assets/img/icon_arrow@2x.png">
                </span>
               
            </p>
          
            <!-- 提示框 -->
            <p v-show="showMsg">{{msg}}</p>

            <!-- 底部电话号码模块 -->
            <p class="footer">
                <span>如有疑问，请咨询：</span>
                <span> 
                    <a href="tel:400-110-6558">
                        400-110-6558
                    </a>
                </span>
            </p>
        </div>
    </div>
</template>

<script>
import scanQRCode from "../../components/scanQRCode"; 
import RequestedURL from './../../config/RequestedURL.js'; //导入链接
import Vue from "vue";
import { Swipe, SwipeItem, Toast } from "mint-ui";
import "mint-ui/lib/style.min.css";
import { setTimeout } from 'timers';
    export default {
        components: {
            // mint-ui
            Toast
        },
        data () {
            return {
                tokens:'',  //token值
                verificationCode:'',
                showMsg:false,
                msg:'',
            }
        },

        created(){
            this.getToken()
        },

        methods: {
            //获取token
            getToken() {
                let _this = this
                $.ajax({
                    url: RequestedURL.getStationHandler1,
                    type: "post",
                    data: {
                        action:"PICC_GetToekn",
                        phoneNumber :_this.$route.query.phoneName,
                        storeID:_this.$route.query.storeID
                    },
                    dataType:'json',
                    success: function (datas) {
                        console.log(datas)
                        if(datas.message=='请求成功'){
                            _this.tokens = datas.data.token
                        }else {
                             Toast({
                                message: "请求出现未知异常",
                                duration: 1000
                            });
                        }
                    
                    },
                })
            },
            //前往卡券查询结果
            goQueryResulte(){
                let _this = this
                if(_this.verificationCode==''){
                    Toast({
                        message: "请输入核销码",
                        duration: 1000
                    });
                } else {
                      $.ajax({
                        url: RequestedURL.getStationHandler1,
                        type: "post",
                        data: {
                            action:"PICC_VerificationFetch",
                            storeID:_this.$route.query.storeID,
                            token: _this.tokens,
                            verificationCode:_this.verificationCode,
                        },
                        dataType:'json',
                        success: function (datas) {
                            if(datas.code=='-1'||datas.code=='200'){
                                // console.log(datas)
                                _this.$router.push({
                                    path:'/cardDelay/queryResulte',query:{
                                        storeID:_this.$route.query.storeID,
                                        token: _this.tokens,
                                        verificationCode:_this.verificationCode,
                                    }
                                })
                            }
                            if(datas.code=='208'){
                                _this.showMsg = true
                                _this.msg = '无效的核销码'
                                setTimeout(()=>{
                                    _this.showMsg = false
                                },1500)
                            }
                        
                        },
                    })
                }
              
                
            },
            //前往示例
            goExamples(ret){
                if(ret==1){
                    this.$router.push({
                        path:'/cardDelay/examples',query:{ret:1}
                    })
                }else {
                    this.$router.push({
                        path:'/cardDelay/examples'
                    })
                }
            },
            goCode() {
            
                scanQRCode().then(
                    res=>{
                        console.log(res.res)
                        this.$router.push({
                            path:'/cardDelay/queryResulte',query:{
                                storeID:this.$route.query.storeID,
                                token: this.tokens,
                                verificationCode:res.res,
                            }
                        })
                    },
                    err=>{
                       alert('出现未知错误')
                    }
                )
            }
        }
    }
</script>

<style lang='less' scoped>
    #cardQuery {
        height:100%;
        width:100%;
        background-color: #f5f5f5;
    }
    #query {
        width:100%;
        height:100%;
        background-color: #f5f5f5;
        padding-top:50px;
        box-sizing: border-box;
        p:first-child {
            width:90%;
            height:44px;
            margin:0 auto;
            position:relative;
            span {
                position:absolute;
                left:10px;
                top:11px;
                font-size:#333;
                font-size:14px;
            }
            input {
                width:100%;
                height:44px;
                border:none;
                padding-left:70px;
                font-size:13px;
                box-sizing: border-box;
                color:#666;
                outline: none;
                border-radius:4px;
            }
            img {
                width:18px;
                height:18px;
                position:absolute;
                right:10px;
                top:13px;
            }
        }
        p:nth-child(2){
            width:90%;
            height:44px;
            background:linear-gradient(207deg,rgba(255,80,37,1) 0%,rgba(246,22,22,1) 100%,rgba(246,22,22,1) 100%);
            border-radius: 25px;
            margin:0 auto;
            text-align: center;
            line-height: 44px;
            color:#fff;
            margin-top:25px;
            box-shadow: 0px 1px 6px 0px rgba(246, 22, 22, 0.3);
        }
        p:nth-child(3) {
            height:44px;
            color:#5594FF;
            font-size:13px;
            margin-top:80px;
            padding-left:15px;
            background-color: #FCFCFC;
            line-height: 44px;
            box-shadow:0px -1px 3px rgba(0,0,0,0.1);
        }
        p:nth-child(4), p:nth-child(5) {
            padding:15px 15px;
            background-color: #FCFCFC;
            margin-top:1px;
           img {
               width:36px;
               height:36px;
               float:left;
               margin-right:10px;
           }
           span {
                font-size:13px;
                display: block;
                color:#666;
                margin-top:-2px;
            }
            span:nth-child(4) {
                float:right;
                line-height: 14px;
                margin-top:-25px;
                color:#999;
            }
            .arrow {
                float:right;
                width:12px;
                height:12px;
                margin-right:0px;
            }
        }
        p:nth-child(5) {
            border-bottom:0px;
            box-shadow:0px 1px 3px rgba(0,0,0,0.1);
        }

        //隐藏平安实例   如要显示的话直接删除
        p:nth-child(4) {
           padding:0px;
        }
     
        p:nth-child(6) {
            color:#FF3C22;
            font-size:13px;
            text-align: center;
            width:100%;
            height:35px;
            background-color: #FFF3D3;
            line-height: 35px;
            position:absolute;
            top:0px;
        }
       .footer {
            font-size:13px;
            width:100%;
            height:105px;
            position:absolute;
            bottom:0px;
            text-align: center;
            background:url('../../assets/img/Fill2@2x.png') center center ;
            line-height: 140px;
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
    }
</style>
