<template>
    <div>
        <!-- 搜索框 -->
        <form  id="search_box" action="javascript:return true;">
            <input id="myinput" type="search"  placeholder="输入关键字搜索">
            <img class="icon_search" src="../../assets/img/icon_search@2x.png">
            <img class="mapIcon" src="../../assets/img/icon_map02@2x.png">
        </form>
        <div id="main" >
            <ul>
                <li class="list" v-for="(Item,indexs) in listData" :key="indexs">
                    <img  :src="Item.src">
                    <div class="info">
                        <p class="one">{{Item.name}}</p>
                        <div>
                            <li v-for="(index, key) in Number(Item.count)" :key="key" >
                                <img src="../../assets/img/icon_star01@2x.png" alt="">
                            </li>
                            <li v-for="(index, key) in Number(5-Item.count)" :key="key + '12'">
                                <img src="../../assets/img/icon_star02@2x.png" alt="">
                            </li>
                            
                            <span>{{Item.count}}.0</span>
                        </div>
                        <p class="three">
                            <img src="../../assets/img/icon_position@2x.png">
                            <span>{{Item.address}}</span>
                            <span>{{Item.km}}km</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "",

    data() {
        return {
            //列表数据
            listData:[
                {name:'深圳市坂田坂田福特坂田坂田福特4S店',src:require('../../assets/img/gril/2.jpg'),count:'2',address:'五和地铁站旁',km:'1.55'},
                {name:'深圳市坂田坂田福特4S店',src:require('../../assets/img/gril/3.jpg'),count:'2',address:'五和地铁站旁深圳市坂田坂田福特坂田坂田福特4S店五和',km:'1.55'},
                {name:'深圳市坂田坂田福特4S店',src:require('../../assets/img/gril/4.jpg'),count:'3',address:'五和地铁站旁',km:'1.55'},
                {name:'深圳市坂田坂田福特4S店',src:require('../../assets/img/gril/5.jpg'),count:'3',address:'五和地铁站旁',km:'1.55'},
                {name:'深圳市坂田坂田福特4S店',src:require('../../assets/img/gril/6.jpg'),count:'2',address:'五和地铁站旁',km:'1.55'},
                {name:'深圳市坂田坂田福特4S店',src:require('../../assets/img/gril/6.jpg'),count:'2',address:'五和地铁站旁',km:'1.55'},
                {name:'深圳市坂田坂田福特4S店',src:require('../../assets/img/gril/6.jpg'),count:'2',address:'五和地铁站旁',km:'1.55'},
                {name:'深圳市坂田坂田福特4S店',src:require('../../assets/img/gril/6.jpg'),count:'2',address:'五和地铁站旁',km:'1.55'},
                {name:'深圳市坂田坂田福特4S店',src:require('../../assets/img/gril/6.jpg'),count:'2',address:'五和地铁站旁',km:'1.55'},
                {name:'深圳市坂田坂田福特4S店',src:require('../../assets/img/gril/6.jpg'),count:'2',address:'五和地铁站旁',km:'1.55'},
                {name:'深圳市坂田坂田福特4S店',src:require('../../assets/img/gril/6.jpg'),count:'2',address:'五和地铁站旁',km:'1.55'},
                {name:'深圳市坂田坂田福特4S店',src:require('../../assets/img/gril/6.jpg'),count:'2',address:'五和地铁站旁',km:'1.55'},
            ],
        };
    },

    methods: {}
};
</script>

<style lang="less" scoped>
  // 搜索框
    #search_box {
        width: 100%;
        position: fixed;
        height:50px;
        border-bottom:1px solid #ddd;
        background-color:#fff;
        z-index:3;
        text-align: center;
        padding: 0px 15px;
        box-sizing: border-box;
        input {
            margin-top:8px;
            height: 35px;
            width: 90%;
            border-radius: 5px;
            background-color: #f5f5f5;
            padding-left: 37px;
            box-sizing: border-box;
            font-size: 13px;
            outline:none;
            border:none;
            float:left;
        }
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
            color: #ccc;
        }
        input:-moz-placeholder, textarea:-moz-placeholder {
            color: #ccc;
        }
        input::-moz-placeholder, textarea::-moz-placeholder {
            color: #ccc;
        }
        input:-ms-input-placeholder, textarea:-ms-input-placeholder {
            color: #ccc;
        }
        .icon_search {
            height: 16px;
            width: 16px;
            position: absolute;
            top: 17px;
            left: 30px;
        }
        .mapIcon {
            width:16px;
            height:16px;
            margin-top:15px;
           float:right;
        }
    }
     // 门店列表
    #main {
        width:100%;
        position:absolute;
        top:55px;
        ul {
            width:100%;
            .list {
                width:100%;
                height:110px;
                // background-color:pink;
                padding:15px;
                border-bottom:1px solid #ddd;
                box-sizing: border-box;
                img {
                    width:90px;
                    height:68px;
                    float:left;
                }
                .info {
                    float:left;
                    margin-left:10px;
                    width:65%;
                    
                   .one {
                        color:#333;
                        font-size:15px;
                        font-weight:bold;
                        height:25px;
                        width:100%;
                        overflow: hidden;
                    }
                   div {
                        margin-top:5px;
                        line-height:15px;
                        li {
                            float:left;
                            margin-right:5px;
                        }
                        img {
                            width:16px;
                            height:16px;
                        }
                        span {
                            color:#FF3D35;
                            font-size:14px;
                            margin-left:10px;
                        }
                    }
                   .three {
                        margin-top:8px;
                        text-align:left;
                        font-size:12px;
                        color:#666;
                        line-height:14px;
                        height:26px;
                      
                        img {
                            width:10px;
                            height:13px;
                            margin-right:5px;
                            float: left;
                        }
                        span:last-child {
                            float:right;
                        }
                        span:nth-child(2){
                              display: table-cell;
                        vertical-align: middle;
                            width:69%;
                            overflow: hidden;
                            height:26px;
                            // display: inline-block;
                            float: left;
                        }
                        
                    }
                    
                }
            }
        }
    }
</style>

