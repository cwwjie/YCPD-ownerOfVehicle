<template>
    <div>
        <div id="main">
            <div id="header">
                <p>
                    <img src="../../assets/img/icon_integral03@2x.png">
                    <span>688888</span>
                </p>
                <p>价值4000元 (100积分=1元)</p>
            </div>
            <div id="list">
                <p class="info">积分明细</p>
                <ul>
                    <li v-for="(item,index) in listData" :key="index">
                        <p>{{item.name}}</p>
                        <p>{{item.time}}</p>
                        <p :class="item.number>'0'?'red':'green'"><span v-show="item.number>'0'">+</span>{{item.number}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                listData:[
                    {name:'活动兑换【上门/到店通用保养】',time:'2018-06-29 11:21',number:'10000.00'},
                    {name:'活动兑换【上门/到店通用保养】',time:'2018-06-29 11:21',number:'-10000.00'},
                    {name:'兑换【嘉实多极护保养套餐】',time:'2018-06-29 11:21',number:'10000.00'},
                    {name:'活动兑换【上门/到店通用保养】',time:'2018-06-29 11:21',number:'-10000.00'},
                    {name:'邀请好友奖励积分',time:'2018-06-29 11:21',number:'-10000.00'},
                    {name:'活动兑换【上门/到店通用保养】',time:'2018-06-29 11:21',number:'-10000.00'},
                ]
            }
        }
    }
</script>
<style lang="less" scoped>
    #main {
        width: 100%;
        height:100vh;
        background-color: #f5f5f5;
        #header {
            width:100%;
            height:110px;
            background-color: #E50012;
            text-align: center;
            padding-top:20px;
            box-sizing: border-box;
            margin-bottom:5px;
            p {
                color:#fff;
                font-size:10px;
                img {
                    width:12px;
                    height:12px;
                }
                span {
                    font-size:32px;
                }
            }
        }
        #list {
            background-color: #fff;
            
            .info {
                height:38px;
                font-size:14px;
                color:#666;
                text-align: center;
                line-height: 38px;
                border-bottom:1px solid #ddd; 
            }
            ul {
                box-sizing: border-box;
               padding-left:15px;
                width:100%;
                li {
                    width:100%;
                    height: 55px;
                    padding:7px 0px;
                    box-sizing: border-box;
                    position:relative;
                    border-bottom:1px solid #ddd;
                    p:first-child {
                        font-size:15px;
                        color: #333;
                    }
                    p:nth-child(2){
                        font-size:10px;
                        color:#999;
                    }
                    p:nth-child(3){
                        position:absolute;
                        right:30px;
                        top:12px;
                        
                    }
                    .green {
                        color:#00B90A;
                    }
                    .red {
                        color:#E50012;
                    }
                }
            }
        }
    }
</style>

