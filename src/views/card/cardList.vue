<template>
<div id="cardList">
    <div id="header">
        <ul>
            <li v-for="(item,index) in tabList" :key="index" @click="tab(index)">
                <span  :class="[item.active?'active':'']">{{item.name}}</span>
            </li>
        </ul>
    </div>
    <!-- 数据列表 -->
    <div id="list">
        <ul   v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="10">
            <li v-for="(item,index) in listData" :key="index" :class="[item.VouMsg=='已过期'?'bgcGray':'']">
                <p  @click="goCardInfoPage(item.VouMsg)">
                    <img :src=item.CouponImgUrl alt="">
                    <span :class="[item.VouMsg=='已过期'?'fontColor':'']">{{item.VoucherName}}</span>
                    <span :class="[item.VouMsg=='已过期'?'fontColor1':'']">{{item.BeginTime.slice(0,10)+'-'+item.EndTime.slice(0,10)}}</span>
                </p>
                <p @click="showCode(item.VoucherCode,item.VouMsg)" :class="[item.VouMsg=='已过期'?'fontColor1':'']">核销码 : <span >(点击查看二维码)</span> <span>{{item.VoucherCode}}</span></p>
                <p  @click="goCardInfoPage(item.VouMsg,item.VoucherCarOwnerID)" :class="[item.VouMsg=='可使用'||item.VouMsg=='预约'?'red':'gray']">{{item.VouMsg=='可使用'?'立即使用':item.VouMsg=='已过期'?'已过期':item.VouMsg=='已失效'?'已失效':item.VouMsg=='已使用'?'已使用':''}}</p>
            </li>
            <div style="text-align: center;margin-top: 5px;padding-bottom:10px" v-if="noMore">没有更多数据啦</div>
        </ul>
        <div v-if="noData" style="text-align: center;margin-top: 40px;color:#999;">
            暂无优惠券
        </div>
    </div>
    <!-- 显示二维码模块 -->
    <div v-show="showCodeBox" id="codeBox">
        <div class="content">
            <p>深圳市通用精洗套餐深</p>
            <img :src="codeSrc" alt="">
            <p>6661 2616 3322 1122</p>
        </div>
        <img @click="showCodeBox=false" class="close" src="../../assets/img/icon_close@2x.png" alt="">
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import RequestedURL from '@/config/RequestedURL.js';
import { Indicator,Toast } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
export default {
    components:{
        Indicator,
        Toast
    },
    data() {
        return {
            tabList:[
                {name:'可使用',active:true},
                {name:'未生效',active:false},
                {name:'已使用',active:false},
                {name:'已过期',active:false},
            ],
            listData:[
                // {name:'深圳市通用精洗套餐深 圳市通用精洗深圳市通用精洗套餐深',time:'2018.1.45-2018.4.6',code:'6661 2616 3322 1122',type:'去使用'},
                // {name:'接听车5元停车券哈哈哈',time:'2018.1.45-2018.4.6',code:'6661 2616 3322 1122',type:'已评价'},
                // {name:'接听车5元停车券哈哈哈',time:'2018.1.45-2018.4.6',code:'6661 2616 3322 1122',type:'预约'},
                // {name:'接听车5元停车券哈哈哈',time:'2018.1.45-2018.4.6',code:'6661 2616 3322 1122',type:'免预约'},
                // {name:'深圳市通用精洗套餐深 圳市通用精洗深圳市通用精洗套餐深',time:'2018.1.45-2018.4.6',code:'6661 2616 3322 1122',type:'评价'},
                // {name:'深圳市通用精洗套餐深 圳市通用精洗深圳市通用精洗套餐深',time:'2018.1.45-2018.4.6',code:'6661 2616 3322 1122',type:'评价'},
                // {name:'接听车5元停车券哈哈哈',time:'2018.1.45-2018.4.6',code:'6661 2616 3322 1122',type:'已过期'},
            ],
            showCodeBox:false,    // 控制点击二维码显示

            codeSrc:"",          // 点击查看二维码链接

            VoucherType:'1',    // 获取券列表 1:可使用 2:未生效 3:已过期 4:已使用

            loading:true,   // 是否启用加载更多  true:禁止 false:开启

            PageIndex:1,    // 页码数

            noData:false,  // 没有数据

            noMore:false,  // 没有更多数据

            openId:this.$route.query.openId,  // 获取传递过来的用户openId

            CustomerID:this.$route.query.CustomerID, // 获取用户传递过来的车主id
        }
    },

    created(){
        this.getVoucherCarOwnerList()
    },
    methods:{
        // 点击显示券的二维码
        showCode(val,msg){ 
            if(msg=='已过期'||msg=='未生效') {
                return false
            }else {
                this.codeSrc = `http://ycpd.demo.hotgz.com/WebPages/DataManagePages/StoreHandler/qrcode.aspx?url=${val}`
                this.showCodeBox = true
            }
        },

        // 头部切换栏
        tab(index){
            this.PageIndex = 1
            this.noData = false
            let data = this.tabList
            for(let i=0;i<data.length;i++){
                if(i==index){
                    data[i].active = true
                    if(index===0){
                        this.VoucherType = 1
                    }
                    if(index===1){
                        this.VoucherType = 2
                    }
                    if(index===2){
                        this.VoucherType = 4
                    }
                    if(index===3){
                        this.VoucherType = 3
                    }
                    this.getVoucherCarOwnerList()
                }else {
                    data[i].active = false
                }
            }
        },

        // 前往详情页
        goCardInfoPage(type,VoucherCarOwnerID){
            if(type=='已使用'){
                this.$router.push({
                    path:'/card/cardUsed',query:{id:VoucherCarOwnerID,CustomerID:this.CustomerID}
                })
            }
            if(type=='已过期'||type=='未生效'){
                
            }
            if(type=='可使用') {
                this.$router.push({
                    path:'/card/cardInfo',query:{id:VoucherCarOwnerID,CustomerID:this.CustomerID}
                })
            } 
        },

        // 获取券列表
        getVoucherCarOwnerList:function(flag){
            Indicator.open('加载中...')
            const that = this
            $.ajax({
                url:RequestedURL.getVoucherCarOwnerList,
                type:'post',
                data:{
                    CustomerID: '181127010002152874', //that.CustomerID,
                    VoucherType:that.VoucherType,
                    PageIndex:that.PageIndex,
                    PageSize:6
                },
                    // that.listData = res.Data.List
                    // }else {
                    //     alert(res.Msg)
                success:function(res){
                    Indicator.close()   // 关闭加载提示框
                    console.log(res)
                    if(res.Code===200){
                        console.log(flag)
                        if(res.Data.TotalRecord===0){
                            that.noData = true
                        }else {
                             that.noData = false
                        }
                        if (flag==true) {
                            if (that.listData.length == res.Data.TotalRecord) {
                                that.loading = true;
                                that.noMore = true;
                            } else {
                                that.noMore = false;
                                that.loading = false;
                                that.listData = that.listData.concat(res.Data.List);
                            }
                        } else {
                            that.listData = res.Data.List;
                            if (res.Data.TotalRecord <= 6) {
                                that.loading = true;
                                that.noMore = false;
                            } else {
                                that.loading = false;
                            }
                        }
                    }else {
                        alert(res.Msg)
                    }
                },
                error:function(){
                    Indicator.close()   // 关闭加载提示框
                    alert('服务器异常')
                }
            })
        },

        // 加载更多
        loadMore:function(){
            this.loading = true
            this.PageIndex ++
            this.getVoucherCarOwnerList(true)
            console.log(1111)
        }
    }
}

</script>
<style lang="less" scoped>
    #cardList {
        width:100%;
        height: 100vh;
        background-color: #f5f5f5;
    }
    #header {
        background-color: #fff;
        width:100%;
        height:40px;
        margin-bottom:10px;
        position:fixed;
        top:0px;
        z-index: 4;
        border-bottom: 1px solid #E0E0E0; 
        ul {
            width:100%;
            height:100%;
            display: flex;
            li {
                flex:1;
                line-height: 40px;
                text-align: center;
                width:100%;
                height:40px;
                color:#999999;
                font-size: 14px;
                span {
                    display:inline-block;
                    width:70%;
                    height:100%;
                }
            }
            .active {
                 border-bottom:1.5px solid #E50012;
                 color:#E50012;
            }
        }
    }

    #list {
        width:100%;
        padding:0px 15px;
        box-sizing: border-box;
        padding-top: 46px;
        background-color: #F5F5F5;
        ul {
            width:100%;
            li {
                width:100%;
                height:130px;
                background:url('../../assets/img/box_bg01@2x.png');
                background-size:100% 130px;
                background-repeat:no-repeat;
                box-sizing:border-box;
                padding:15px 15px 0px 15px;
                position:relative;
                margin-top:10px;
                p:nth-child(1) {
                    width:100%;
                    height:78px;
                    img {
                        width:80px;
                        height:60px;
                        float:left;
                        margin-right:10px;
                    }
                    span {
                        display: block;
                        float:left;
                        color:#333;
                        font-size:14px;
                        width:44%;
                    }
                     span:nth-child(2) {
                         font-weight: bold;
                         height:45px;
                         overflow: hidden;
                     }
                    span:nth-child(3) {
                        color:#999;
                        font-size:12px;
                    }
                    
                }
                p:nth-child(2) {
                    width:100%;
                    font-size:13px;
                    color:#999;
                    overflow: hidden;
                    height:32px;
                    line-height: 36px;
                }
                p:nth-child(3) {
                    width:20%;
                    height:28px;
                    border-radius:14px;
                    font-size:12px;
                    line-height: 28px;
                    text-align: center;
                    position:absolute;
                    right:15px;
                    top:30px;
                    color:#fff;
                }
                .red {
                    background-color: #E50012;
                    
                }
                .blue {
                    background-color: #5594FF;
                }
                .gray {
                    background-color: #CCCCCC;
                }
                
            }
            .bgcGray {
                background:url('../../assets/img/box_bg02@2x.png');
                background-size:100% 130px;
                background-repeat:no-repeat;
            }

            .fontColor {
                color:#999 !important;
            }
            .fontColor1 {
                color:#bbb !important;
            }

        }
    }
    #codeBox {
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.5);
        position: fixed;
        top:0px;
        left:0px;
        z-index: 4;
        text-align: center;
        .content {
            width:65%;
            height:260px;
            background-color: #fff;
            margin:0 auto;
            margin-top:50%;
            border-radius: 12px;
            text-align: center;
           
            p:first-child {
                padding-top:20px;
                width:100%;
                height:30px;
                color:#333;
                font-size: 15px;
                font-weight: bold;
                overflow: hidden;
            }
            img {
                width:150px;
                height:150px;
                border:1px solid #ddd;
                box-sizing: border-box;
            }
            
        }
        .close {
            width:24px;
            height:24px;
            margin:0 auto;
            margin-top:15px;
        }
    }
</style>
