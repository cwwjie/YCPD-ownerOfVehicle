<template>
    <div id="examples">
        <div v-show="this.$route.query.ret" id="pingAn">
            <p>1、下载“平安好车主”APP</p>
            <p>
                <img class="icon" src="../../assets/img/好车主@2x.png">
                <span>各大应用市场搜索“平安好车主”下载</span>
                <span>立即下载</span>
            </p>
            <p>2、点击“我的” - “我的卡券”</p>
            <p>
                <img class="photo" src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-carDelay/Group%402x.png">
            </p>
            <p>3、点击您要使用的卡券</p>
            <p>
                <img class="photo" src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-carDelay/Group%202%402x.png" alt="">
            </p>
            <p>4、查看兑换码 <span>（兑换码就是您的核销码）</span></p>
            <p>
                <img src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-carDelay/IMG_7471%402x.png" alt="">
            </p>
        </div>


        <div v-show="!this.$route.query.ret" id="pingAn">
            <p>1、关注“深圳人保财险”微信公众号</p>
            <p>
                <img class="icon" src="../../assets/img/人保@2x.png">
                <span>搜索关注“深圳人保财险”微信公众号</span>
                <span class="code" @click="showCode">识别二维码关注</span>
            </p>
            <p>2、进入公众号，点击下方菜单“我” </p>
            <p>
                <img class="photo" src="../../assets/img/Group@2x.png">
            </p>
            <p>3、点击“我的礼品” </p>
            <p>
                <img class="photo" src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-carDelay/Group%205%402x.png" alt="">
            </p>
            <p>4、点击“车辆保养”</p>
            <p>
                <img src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-carDelay/Group%203%402x.png" alt="">
            </p>
            <p>5、红框内查看您的核销码</p>
            <p>
                <img src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-carDelay/Group%204%402x.png" alt="">
            </p>
        </div>

        <div v-show="showCodebox" class="codeBox">
            <div class="content">
                <img src="../../assets/img/piccCode.jpg" alt="">
                <p>长按识别二维码</p>
            </div>
            <img class="close" @click="showCodebox=false" src="../../assets/img/icon_close1@2x.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: '',

    data () {
        return {
            showCodebox:false
        }
    },

    methods: {
        showCode(){
            this.showCodebox = true
        }
    }
}
</script>

<style lang='less' scoped>
    #examples {
        // height: 100%;
        width:100%;
        background-color: #f5f5f5;
        padding:15px 15px 0px 15px;
        box-sizing:border-box;
        color:#333;
        font-size:13px;
        font-family:PingFangSC-Medium;
        font-weight:500;
    }
    #pingAn {
        // background-color: #f5f5f5;
        p:nth-child(2){
            margin-top:20px;
            height:80px;
            .icon {
                height:64px;
                width:18%;
                float: left;
                margin-left:20px;
            }
            span {
                width:70%;
                display: block;
                float:left;
                text-align: center;
            }
            span:nth-child(2){
                color:#666666;
                height:17px;
                overflow: hidden;
            }
            span:nth-child(3){
                color:#fff;
                height:32px;
                width:40%;
                background-color: #5594FF;
                border-radius:3px;
                line-height: 32px;
                margin:0 auto;
                margin-top:10px;
                margin-left:40px;
            }
            .code {
                border:1px solid #e50012;
                color:#e50012 !important;
                background-color: #f5f5f5 !important;
            }
        }
        p:nth-child(3) {
            width:100%;
            height:17px;
        }
        p:nth-child(4), p:nth-child(6),p:nth-child(8),p:nth-child(10) {
            text-align: center;
           img {
               width:258px;
               margin-top:12px;
               margin-bottom:20px;
           }
        }
        p:nth-child(7){
            span {
                color:#e50012;
            }
        }
    }

    .codeBox {
        width: 100%;
        height:100%;
        background:rgba(0,0,0,0.5);
        position:fixed;
        top:0px;
        left:0px;
        text-align:center;
        .content {
            margin:0 auto;
            margin-top:40%;
            width:300px;
            height:300px;
            background-color: #fff;
            border-radius:20px;
            padding-top:50px;
            box-sizing: border-box;
            img {
                width:200px;
                height:200px;
            }
        }
        .close {
           width:30px;
           height:30px;
           margin-top:15px;
        }
    }
</style>
