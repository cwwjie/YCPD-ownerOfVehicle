<template>
    <div id="piccPage">
         <img class="one" src="../../assets/img/top@2x.png" alt=""> 
         <img class="two" src="../../assets/img/服务流程@2x.png" alt=""> 
         <img class="three" src="../../assets/img/服务产品@2x.png" alt=""> 
         <img class="four" src="../../assets/img/服务须知title@2x.png" alt=""> 
         <div class="text">
             <div class="content">
                <p class="black">预约方式： </p>
                <p>客服人员会在您点选服务后即刻联系您，为您确认预约</p>
                <p class="black">服务时间： </p>
                <p>60分钟左右(视车型而定，请以现场服务时间为准)</p>
                <p class="black">服务有效期： </p>
                <p>预约之日起7日内有效</p>
                <p class="black">服务内容： </p>
                <p>三大品牌机油，机滤，保养工时费，</p>
                <p class="black">注意事项： </p>
                <p>我们无法保证所有车型的配件都有充足库存，请先咨询网点是否有库存；提前通知网点备货，为您节约时间，提高服务效率。</p>
             </div>
             
         </div>
         <p></p>
         <div class="btn">
             <div class="left" @click="service">
                 <img src="../../assets/img/Rectangle 18@2x (2).png" alt="">
                 <span>咨询投诉</span>
             </div>
             <div class="right" @click="goAppointment">
                立即预约
             </div>
         </div>
    </div>
</template>

<script>

import RequestedURL from "@/config/RequestedURL.js"; // 导入链接

export default {
    name: '',

    data () {
        return {
            openID: ''
        }
    },

    created() {
        this.getCode()
    },

    methods: {
        service() {
            window.location.href = `tel:400-110-6558`
        },

        jumpToLogin() {
            window.location.href = `http://${window.location.host}/wx20/register/index.html#/index/${window.localStorage.openid}/`;
        },

        goAppointment() {
            let _this = this
            console.log(this.openID)
      
            $.ajax({
                url: `${RequestedURL.getUserInfor}?OpenID=`+window.localStorage.getItem('openid'),
                type: "post",
                success: function(datas) {
                    if (datas.Code === 200 && datas.Data) {
                        window.location.href = `http://${window.location.host}/wx20/carReservation/index.html#/?openId=${window.localStorage.getItem("openid")}&name=人保`;
                    } else {
                        _this.jumpToLogin();
                    }
                }
            })
        },

        getCode() {
            let _this = this
            // console.log(window.location.search)  
            function loadPageVar (sVar) {
                return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
            }

            var code =loadPageVar("code")
            if(code==''){
                  let url = `http://${window.location.host}/wx20/index.html#/piccPage`
                $.ajax({
                    url:`${RequestedURL.getOpenID}/Customer/GetOpenId`,
                    type:'post',
                    data:{
                        url:url,
                        code:''
                    },
                    success:function(datas){
                        console.log(datas)
                       window.location.href =datas.Data.url
                    }
                })
            } else {
                $.ajax({
                    url:`${RequestedURL.getOpenID}/Customer/GetOpenId`,
                    type:'post',
                    data:JSON.stringify({
                        code:code
                    }),
                    contentType: "application/json; charset=utf-8",  
                    success: function (datas) {
                        if ( datas.Code === 200 ) {
                            console.log(datas.Data.openid)
                            _this.openID = datas.Data.openid
                            window.localStorage.setItem('openid',datas.Data.openid)
                        }
                    }
                })
            }
        }

    }
}
</script>

<style lang='less' scoped>
#piccPage {
    height:160%;
    width:100%;
    text-align:center;
    background-color: #f5f5f5;
    box-sizing: border-box;
  
}
    img {
        width:95%;
    }
    .one {
        width:98%;
        margin-top:10px;
    }
    .two {
        margin-bottom:5px;
    }
    .three {
        margin-bottom:5px;
    }
    // p {
    //     height:70px;
    //     width:100%;
    //     background-color:#f5f5f5;
    // }
    .btn {
        height:52px;
        width:100%;
        padding:7px 15px 0px 15px;
        background:rgba(0,0,0,0.39);
        box-sizing: border-box;
        position:fixed;
        bottom:0px;
        .left {
            width:40%;
            height:40px;
            background-color:#469AFF;
            border-radius:22px;
            float:left;
            line-height: 34px;

            span {
                color:#fff;
                font-size:14px;
                vertical-align: middle;
            }
            img {
                width:20px;
                height:20px;
                vertical-align: middle;
                
            }

        }
        .right{
            width:55%;
            height:40px;
            border-radius:22px;
            line-height: 38px;
            color:#fff;
            font-size:14px;
            float:right;
            background:linear-gradient(135deg,rgba(255,98,54,1) 0%,rgba(229,0,18,1) 100%);
        }
    }
    .text {
        width:100%;
        height:auto;
        background-color: #f5f5f5;
        font-size:12px;
        text-align:left;
        box-sizing: border-box;
        margin-top:-11px;
        padding:0 10px;
        .content {
            background-color: #fff;
            padding:10px 10px;
            color:#666;
            border-radius:0px 0px 8px 8px;
            .black {
                font-weight: bold;
            }
        }
    }
</style>
