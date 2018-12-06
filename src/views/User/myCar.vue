<template>
  <div id="myCar">
    <div id="carList">
        <ul>
            <li v-for="(item,index) in listData" :key="index" @click="goUpdataCarPage">
                <p>{{item.carNo}}</p>
                <p>{{item.carName}}</p>
                <p>
                    <span>{{item.default}}</span>
                    <img src="../../assets/img/icon_arrow@2x.png" alt="">
                </p>
            </li>
        </ul>
    </div>
    <div id="btn">
        <p @click="goUpdataCarPage">添加车辆</p>
    </div>
  </div>
</template>

<script>
export default {
    name: '',

    data () {
        return {
            listData:[
                {carNo: '粤B123456', carName: '兰博基尼全黄金版', default: '默认'}, 
                {carNo: '粤B123456', carName: '兰博基尼全黄金版', defalute: ''}, 
            ]
        }
    },

    methods: {
        goUpdataCarPage(){
            this.$router.push({ path:'/user/updataCar' });
        }
    }
}
</script>

<style lang='less' scoped>
    #myCar {
        width:100%;
        height:100%;
        //车列表页
        #carList {
            width:100%;
            height:100%;
            background-color: #f5f5f5;
            box-sizing: border-box;
            color:#333;
            font-size:14px;
            padding-top:10px;

            ul {
                width:100%;
                height:100%;
                li {
                    width:100%;
                    height:65px;
                    background-color: #fff;
                    position:relative;
                    padding:10px 15px;
                    box-sizing: border-box;
                    margin-bottom:5px;
                    p:nth-child(2){
                        font-size:14px;
                        color:#999;
                    }
                    p:nth-child(3){
                       position:absolute;
                       right:15px;
                       top:18px;
                       color:#666;
                       img {
                           width:15px;
                           height:15px;
                           vertical-align: middle;
                       }
                       span {
                           vertical-align: middle;
                       }
                    }
                }
            }
        }

        //添加车辆按钮
        #btn {
            width:100%;
            position: absolute;
            bottom:50px;
            p {
                width:90%;
                height:44px;
                background:rgba(229,0,18,1);
                border-radius:3px;
                margin:0 auto;
                text-align: center;
                line-height: 44px;
                color:#fff;
                font-size:15px;
            }
            
        }

    }
    
</style>
