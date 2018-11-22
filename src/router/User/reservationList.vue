<template>
    <div>
        <div id="list">
            <div v-show="showNoList">暂无预约记录</div>
            <ul>
                <li @click="goInfoPage(item.BookID)" v-for="(item,index) in listData" :key="index">
                    <p>{{item.CarNo}} &nbsp;{{item.ServiceName}}</p>
                    <p>{{item.StoreName}}</p>
                    <p>{{item.BookDate+' '+item.BookTime}}</p>
                    <p>
                        <span :class="[item.Status=='待处理'?'yellow':item.Status=='已预约'?'green':'gray']">{{item.Status}}</span>
                        <img src="../../assets/img/icon_arrow@2x.png" alt="">
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import ajaxs from './ajaxs.js';
import RequestedURL from './../../config/RequestedURL.js'; //导入链接
    export default {
        data(){
            return {
                listData:[
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约成功'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'取消预约'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'已核销'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约成功'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约成功'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                ],
                showNoList:false
            }
        },
        created() {
            this.getAppointmentList()
        },
        methods:{
            goInfoPage(BookID){
                this.$router.push({
                    path:'/reservationState',query:{BookID:BookID,CustomerID:this.$route.query.CustomerID}
                })
            },

            //获取预约列表
            getAppointmentList() {
                let _this = this
                $.ajax({
                    url:`${RequestedURL.reservationList}/Apointment/GetApointmentList`,
                    type:'post',
                    data:{
                        CustomerID:this.$route.query.CustomerID,//'181101010002070826', ,
                        Status:'',
                    },
                    success:function(data){
                        console.log(data)
                        if(data.Code===200){
                            for(let i= 0;i<data.Data.List.length;i++){
                                if(data.Data.List[i].Status_=='7'||data.Data.List[i].Status_=='4'){
                                    data.Data.List[i].Status='待处理'
                                }
                            }
                            if(data.Data.TotalRecord=='0'){
                                 _this.showNoList = true
                            }else {
                                _this.listData = data.Data.List
                            }
                            
                        }
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    #list {
        width:100%;
        height:100vh;
        background-color: #f5f5f5;
        padding-top:5px;
        div {
            text-align: center;
            margin-top:60px;
        }
        ul {
            width:100%;
            height:100vh;
            li {
                width:100%;
                height:88px;
                background-color :#fff;
                padding:9px 15px 15px 15px;
                box-sizing: border-box;
                position:relative;
                margin-bottom:5px;
                p {
                    color:#666;
                    font-size:14px;
                    text-align:left;
                }
                p:first-child {
                    width:74%;
                    height:21px;
                    color:#333;
                    font-size:16px;
                    margin-bottom:5px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                p:nth-child(2) {
                    width:80%;
                    height:18px;
                    margin-bottom:4px;
                    overflow :hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                p:last-child {
                    font-size:16px;
                    position:absolute;
                    right:15px;
                    top:30px;
                    img {
                        width:10px;
                        height:11px;
                    }
                    .yellow {
                        color :#FF8D18;
                    }
                    .green {
                        color:#00B90A;
                    }
                    .gray {
                        color:#999;
                    }
                }
            }
        }
    }
</style>


