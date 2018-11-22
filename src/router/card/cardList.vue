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
            <ul>
                <li v-for="(item,index) in listData" :key="index" :class="[item.type=='已过期'?'bgcGray':'']">
                    <p  @click="goCardInfoPage(item.type)">
                        <img src="../../assets/img/5.jpg" alt="">
                        <span>{{item.name}}</span>
                        <span>{{item.time}}</span>
                    </p>
                    <p @click="showCode(item.type)">核销码 : <span v-if="item.type=='预约'||item.type=='免预约'||item.type=='评价'||item.type=='已评价'">(点击查看二维码)</span> <span>{{item.code}}</span></p>
                    <p  @click="goCardInfoPage(item.type)" :class="[item.type=='去使用'||item.type=='预约'?'red':item.type=='免预约'||item.type=='评价'?'blue':'gray']">{{item.type}}</p>
                </li>
            </ul>
        </div>
        <!-- 显示二维码模块 -->
        <div v-show="showCodeBox" id="codeBox">
            <div class="content">
                <p>深圳市通用精洗套餐深</p>
                <img src="../../assets/img/5.jpg" alt="">
                <p>6661 2616 3322 1122</p>
            </div>
            <img @click="showCodeBox=false" class="close" src="../../assets/img/icon_close@2x.png" alt="">
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              tabList:[
                  {name:'全部',active:true},
                  {name:'可使用',active:false},
                  {name:'待评价',active:false},
                  {name:'已过期',active:false},
              ],
              listData:[
                  {name:'深圳市通用精洗套餐深 圳市通用精洗深圳市通用精洗套餐深',time:'2018.1.45-2018.4.6',code:'6661 2616 3322 1122',type:'去使用'},
                  {name:'接听车5元停车券哈哈哈',time:'2018.1.45-2018.4.6',code:'6661 2616 3322 1122',type:'已评价'},
                  {name:'接听车5元停车券哈哈哈',time:'2018.1.45-2018.4.6',code:'6661 2616 3322 1122',type:'预约'},
                  {name:'接听车5元停车券哈哈哈',time:'2018.1.45-2018.4.6',code:'6661 2616 3322 1122',type:'免预约'},
                  {name:'深圳市通用精洗套餐深 圳市通用精洗深圳市通用精洗套餐深',time:'2018.1.45-2018.4.6',code:'6661 2616 3322 1122',type:'评价'},
                  {name:'深圳市通用精洗套餐深 圳市通用精洗深圳市通用精洗套餐深',time:'2018.1.45-2018.4.6',code:'6661 2616 3322 1122',type:'评价'},
                  {name:'接听车5元停车券哈哈哈',time:'2018.1.45-2018.4.6',code:'6661 2616 3322 1122',type:'已过期'},
              ],
              showCodeBox:false, 
            }
        },
        methods:{
            showCode(val){
                if(val=='去使用'||val=='已过期'){
                    return
                }else {
                   this.showCodeBox = true
                }
            },
            //头部切换栏
            tab(index){
                let data = this.tabList
                for(let i=0;i<data.length;i++){
                    if(i==index){
                        data[i].active = true
                    }else {
                        data[i].active = false
                    }
                }
            },
            //前往详情页
            goCardInfoPage(type){
                if(type=='已评价'){
                    this.$router.push({
                        path:'/card/cardUsed',query:{type:1}
                    })
                }
                if(type=='评价'){
                    this.$router.push({
                        path:'/card/cardUsed'
                    })
                }
                if(type=='去使用') {
                    this.$router.push({
                        path:'/card/cardInfo',query:{type:1}
                    })
                }
                
                if(type=='预约'||type=='免预约') {
                    this.$router.push({
                        path:'/card/cardInfo'
                    })
                }
                
            }
        }
    }
</script>
<style lang="less" scoped>
    #cardList {
        width:100%;
        // height:100%;
        background-color: #f5f5f5;
        padding-top: 60px;
    }
    #header {
        background-color: #fff;
        width:100%;
        height:40px;
        margin-bottom:10px;
        position:fixed;
        top:0px;
        z-index: 4;
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
        ul {
            width:100%;
            li {
                width:100%;
                height:120px;
                background:url('../../assets/img/box_bg01@2x.png');
                background-size:100% 120px;
                background-repeat:no-repeat;
                box-sizing:border-box;
                padding:15px 15px 0px 15px;
                position:relative;
                margin-bottom:10px;
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
                    height:17px;
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
                  background-size:100% 120px;
                background-repeat:no-repeat;
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
                padding:5px;
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

