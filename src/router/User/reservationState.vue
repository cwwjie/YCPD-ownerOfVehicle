<template>
    <div id="reservationState">
        <div id="header">
            <div class="loding">
                <p v-if="status=='6'||status=='4'||status=='7'" class="yellow">等待商家确认</p>
                <p v-if="status=='6'||status=='4'||status=='7'" class="yellow size">商家将在{{date}} 18:00 前为您确认</p>
                <p v-if="status=='1'&&IsMatch=='0'" class="blue">预约成功</p>
                <p v-if="status=='1'&&IsMatch=='0'" class="blue size">商家已确认,请准时前往门店服务~</p>
                <p v-if="status=='2'||status=='3'" class="blue">服务完成</p>
                <p v-if="status=='2'" class="blue size">{{LastUpdatedDate}} 服务完成</p>
                <P v-if="status=='1'&&IsMatch=='1'" class="blue1">服务完成</P>
                <p v-if="status=='1'&&IsMatch=='1'" @click="goComment" class="red">评价</p>
                <p v-if="status=='5'||status=='-1'" class="gray">预约已取消</p>
                <p v-if="status=='5'||status=='-1'" class="gray size">{{date}}取消预约</p>
            </div>
        </div>
        <div id="info">
            <div class="top">
                <img class="icon" :src="img" alt="">
                <p>{{storeName}}</p>
                <p>
                    <img v-for="star in 4" :key="star" src="../../assets/img/icon_star01@2x.png" alt=""><img v-for="star in 5-4" src="../../assets/img/icon_star02@2x.png" alt="">
                    <span>4.0</span>
                </p>
                <p>
                    <img src="../../assets/img/icon_position@2x.png">
                    <span>{{address}}</span>
                    <!-- <span>{{juli}}km</span> -->
                </p>
            </div>
            <div class="bottom">
                <a @click="call()">
                      <img src="../../assets/img/icon_call@2x.png" alt="">
                      <span>联系门店</span>
                  </a>
                  <p @click="goMap">
                      <img src="../../assets/img/icon_map03@2x.png">
                      <span>地图导航</span>
                  </p>
            </div>
        </div>
        <div id="message">
            <p>
                <span>预约服务 :</span>
                <span>{{serviceName}}</span>
                <!-- <span>服务详情&nbsp;
                     <img src="../assets/img/Path 2@2x.png" alt="">
                </span> -->
               
            </p>
            <p>
                <span>车&nbsp; 牌&nbsp; 号 :</span>
                <span>{{carNo}}</span>
            </p>
            <p>
                <span>预约时间 :</span>
                <span>{{time}}</span>
            </p>
            <p>
                <span>联&nbsp; 系&nbsp; 人 :</span>
                <span>{{userName}}</span>
            </p>
            <p>
                <span>联系电话 :</span>
                <span>{{userTel}}</span>
            </p>
        </div>
        <div v-show="status=='1'&&IsMatch=='0'||status=='6'||status=='4'||status=='7'" @click="cancelApointment" id="btn">
            取消预约
        </div>
        <div v-show="status=='-1'||status=='2'||status=='3'||status=='4'||status=='5'||status=='7'||status=='1'||status=='6'||IsMatch=='1'" @click="goHome" id="btn1">
           返回首页
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import ajaxs from './ajaxs.js';
import RequestedURL from './../../config/RequestedURL.js'; //导入链接

    export default {
        components:{
            Toast,
            MessageBox
        },
        data(){
            return {
                status:'',      //预约状态
                img:'',         //店图片
                storeName:'',   //店名
                score:'',       //评分
                address:'',     //店面地址
                distance:'',    //距离
                storeTel:'',    //店面电话
                log:'',         //店面经度
                lat:'',         //店面纬度
                serviceName:'', //服务项目名
                carNo:'',       //车牌号
                time:'',        //预约时间
                userName:'',    //用户名
                userTel:'',     //用户号码
                date:'',        //客户主动取消预约当天的日期,
                date1:'',       //根据时间判断是否是当天处理 
                juli:'',

                lat:'',
                lng:'',

                IsMatch:'',

                LastUpdatedDate:'',   // 非客户更改预约状态修改的时间


            }
        },
        created(){
            this.getAppointmentList()
            this.getDate()
            this.getDistance()
            
            this.timer = setInterval(()=>{
                this.getAppointmentList()
            },10000)
        },
        mounted() {
              
        },

        //离开页面就销毁计时器
        beforeDestroy() {
             window.clearInterval(this.timer);
        },

        methods:{
            //前往地图导航
            goMap(){
                window.location.href = `http://kf.szpiccxxjsb.cn/wxapi/map/map.html?lat=${this.lng}&lng=${this.lat}&type=bd&name=${this.storeName}&address=${this.address}`
            },

            //获取预约列表
            getAppointmentList() {
                let _this = this
                let data ={
                    CustomerID:_this.$route.query.CustomerID,
                    BookID:_this.$route.query.BookID
                }
                 $.ajax({
                    url:`${RequestedURL.reservationList}/Apointment/GetApointmentList`,
                    type:'post',
                    data:data,
                    success:function(data){
                        console.log(data)
                        if(data.Code===200){
                             if(data.Data.List[0].Status_=='-1'||data.Data.List[0].Status_=='2'||data.Data.List[0].Status_=='3'||data.Data.List[0].Status_=='5'||data.Data.List[0].IsMatch_=='1'){
                                document.getElementById('btn1').style.width = '92%'
                            }else {
                                document.getElementById('btn1').style.width = '44%'
                            }
                            _this.status = data.Data.List[0].Status_
                            _this.img = data.Data.List[0].StoreImage
                            _this.storeName = data.Data.List[0].StoreName
                            _this.score = data.Data.List[0].score
                            _this.address = data.Data.List[0].StoreAddress
                            _this.distance = data.Data.List[0].distance
                            _this.storeTel = data.Data.List[0].StoreTel
                            _this.lng = data.Data.List[0].lng
                            _this.lat = data.Data.List[0].lat
                            _this.serviceName = data.Data.List[0].ServiceName
                            _this.carNo = data.Data.List[0].CarNo
                            _this.time = data.Data.List[0].BookDate+' '+data.Data.List[0].BookTime
                            _this.userName = data.Data.List[0].UserName
                            _this.userTel = data.Data.List[0].Mobile
                            _this.LastUpdatedDate = data.Data.List[0].LastUpdatedDate
                            _this.lat = data.Data.List[0].Map_X
                            _this.lng = data.Data.List[0].Map_Y
                            _this.IsMatch = data.Data.List[0].IsMatch_
           
                        }
                    }
                })
               
            },

            // 拨打门店电话
            call(){
                window,location.href = `tel:${this.storeTel}`
            },

            // 获取当天的日期
            getDate(){
                if(this.$route.query.hours>17){
                    var date1 = new Date();
                    var date2 = new Date(date1);
                    // 往后1天
                    date2.setDate(date1.getDate()+1);

                    this.date = date2.getFullYear()+'-'+ (date2.getMonth()+1) + "-" + date2.getDate()
                }else {
                    var date = new Date()
                    this.date =date.getFullYear()+'-'+ (date.getMonth()+1) + "-" + date.getDate()
                }
                
               
                // this.date =day.getFullYear()+'-'+ (day.getMonth()+1) + "-" + day.getDate()+' '+ day.getHours()+':'+day.getMinutes()+':'+day.getSeconds();
                
            },


            // 取消预约
            cancelApointment(){
                let _this = this
                MessageBox.confirm('确定取消预约?').then(action => {
                    let data = {
                        Status:'-1',
                        BookID:_this.$route.query.BookID,
                        CustomerID:_this.$route.query.CustomerID
                    }
                    $.ajax({
                        url:`${RequestedURL.upDataReservation}/Apointment/UpdateABYApointment`,
                        type:'post',
                        data:data,
                        success:function(data){
                            if(data.Code===200){
                                _this.status = '-1'
                                document.getElementById('btn1').style.width = '92%'
                                Toast({
                                    message:'取消预约成功',
                                    duration:1000
                                })
                                window.clearInterval(_this.timer);
                            }else {
                            Toast({
                                    message:'取消预约失败',
                                    duration:1000
                                }) 
                            }
                        }
                    })
                });
            },

            //回到首页
            goHome(){
                window.location.href = `http://${window.location.host}/wx20/index.html`
            },

            //从本地中获取距离
            getDistance(){
                this.juli = window.sessionStorage.getItem('distance')
            },

            goComment(){
                window.location.href = `http://${window.location.host}/wx20/carReservation/index.html#/comment?CustomerID=${this.$route.query.CustomerID}&BookID=${this.$route.query.BookID}`
            }
        }
    }
</script>
<style lang="less" scoped>
    #reservationState {
        background-color: #f5f5f5;
        width:100%;
        height:100vh;
    }

    #header {
        width:100%;
        height:100px;
        margin-bottom:10px;
       
        .loding {
            width:100%;
            height:76px;
            background-color: #fff;
            padding-top:28px;
            font-size:18px;
            text-align: center;
            p:first-child {
                font-size:18px;
                margin-bottom:5px;
                font-weight:bold;

            }
            .green {
                color:#00B90A;
            }
            .yellow {
                color:#FF8D18;
            }
            .size {
                font-size:14px;
            }
            .blue {
                color:#5594FF;
            }
            .gray {
                 color:#999;
            }
            .red {
                background-color:#5594FF;
                color:#fff;
                width:100px;
                height:32px;
                line-height:32px;
                border-radius:5px;
                margin:0 auto;
                font-weight:normal !important;
                
            }
            .blue1 {
                color:#5594FF;
                margin-top:-10px;
            }
        }
        .loding1 {
            width:100%;
            height:76px;
            background-color: #fff;
            color:#999;
            padding-top:28px;
            font-size:14px;
            p:first-child {
                font-size:16px;
                margin-bottom:5px;
                font-weight:bold;
            }
        }
    }
    #info {
        height: 148px;
        width: 100%;
        background-color: #fff;
        position:relative;
        .top {
            height: 103px;
            width: 100%;
            padding: 15px;
            box-sizing: border-box;
            text-align:left;
            border-bottom:0.5px solid #ddd;
            .icon {
                width:30%;
                height:70px;
                float:left;
                margin-right:10px;
            }
            p:nth-child(2) {
                font-size:16px;
                color:#333;
                margin-top:-6px;
                margin-bottom:4px;
                height:22px;
                overflow :hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width:61%;
            }
            p:nth-child(3) {
                height:20px;
                line-height:20px;
                font-size:14px;
                color:#FF3D35;
                margin-bottom:6px;
                img {
                    width:14px;
                    height:13px;
                    margin-top:4px;
                    margin-right:5px;
                }
            }
            p:nth-child(4) {
                img {
                    width:11px;
                    height:13px;
                    margin-top:1px;
                    vertical-align:middle;
                }
                span {
                    color:#999;
                    vertical-align:middle;
                }
                span:nth-child(2) {
                    display:inline-block;
                    width:50%;
                    font-size:14px;
                    // height:26px;
                    overflow :hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    vertical-align:middle;
                }
            }
            p:nth-child(5) {
                width:55px;
                height:27px;
                border:1px solid #E50012;
                border-radius:5px;
                line-height:27px;
                color:#E50012;
                font-size:14px;
                text-align:center;
                position:absolute;
                top:31px;
                right:15px;
            }
        }
        .bottom {
            width:100%;
            height:44px;
            text-align: center;
            p {
                width:49%;
                height:100%;
                font-size:16px;
                color:#808080;
                line-height:44px;
                img {
                    width:18px;
                    height:18px;
                      vertical-align: middle;
                }
            }
            // p:first-child {
            //     border-right:1px solid #ddd;
            //     float:left;
            // }
            a {
                width:49%;
                height:100%;
                font-size:16px;
                color:#808080;
                line-height:44px; 
                display:inline-block;
                float:left;
                vertical-align: middle;
                img {
                    width:18px;
                    height:18px;
                    vertical-align: middle;
                }
            }
            p:nth-child(2) {
                border-left:0.5px solid #ddd;
                float:right;
            }
        }
    }
    #message {
        width:100%;
        margin-top:5px;
        background-color :#fff;
        padding:0px 15px;
        box-sizing: border-box;
        p {
            width:100%;
            height:44px;
            border-bottom:0.5px solid #ddd;
            line-height:44px;
            text-align:left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            img {
                width:10px;
                height:11px;
                float:right;
                margin-top:15px;
            }
            span:first-child {
              font-size:16px;
              color:#666;
              margin-right:15px;  
            }
            span:nth-child(2){
                color:#333;
                font-size:16px;

            
            }
            span:nth-child(3){
                color:#5594FF;
                font-size:16px;
                float:right;
                line-height:40px;
            
            }
        }
        p:last-child {
            border-bottom:none;
        }
    }
    #btn {
        width: 44%;
        height:46px;
        font-size:16px;
        line-height:46px;
        margin-top:20px;
        background-color: #b3b3b3;
        color: #fff;
        border-radius:7px;
        float:left;
        margin-left:15px;
        text-align: center;

    }
    #btn1 {
        width: 44%;
        height:46px;
        font-size:16px;
        line-height:46px;
        margin:0 auto;
        margin-top:20px;
        background-color: #E50012;
        color: #fff;
        border-radius:7px;
        margin-right:15px;
        text-align: center;
    }
</style>

