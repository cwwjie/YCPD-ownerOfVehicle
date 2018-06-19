<!-- 
  - 选择城市页面 
  -->
<template>
    <div class="city">
        <!-- 顶部搜索栏 -->
        <div class="search-bar">
            <div class="search-content flex-start">
                <div class="search-back" @click="$router.push('/index')">
                    <i><img src="https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/city/search-back.png?x-oss-process=image/resize,m_fill,w_48,h_48,limit_0/auto-orient,0/quality,q_100"></i>
                </div>
                <div class="search-bar flex-start">
                    <i><img src="https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/city/search.png?x-oss-process=image/resize,m_fill,w_48,h_48,limit_0/auto-orient,0/quality,q_100"></i>
                    <div class="search-input">
                        <input type="text" placeholder="城市名、拼音首字母...">
                    </div>
                </div>
                <div class="search-submit">
                    <span>搜索</span>
                </div>
            </div>
        </div>
        
        <!-- 侧边栏 -->
        <div class="side-bar">
            <div class="side-bar-list">
                <div class="side-bar-item" 
                    v-for="(item, key) in sideBarList" 
                    :style="`height: ${getsideBarHeight}px; line-height: ${getsideBarHeight}px;`"
                    :key="key"
                    @click="jumpToBy(item.name)"
                >{{item.name}}</div>
            </div>
        </div>
        <!-- 内容 -->
        <div class="main">
            <div class="main-content">
                <div class="main-location">
                    <div class="main-location-content">
                        深圳<span>GPS定位</span>
                    </div>
                </div>
                <div class="main-recommend">
                    <div class="main-recommend-lable"
                        ref="hot"
                    >国内热门城市</div>
                    <div class="main-recommend-list">
                        <div class="main-recommend-item"
                            v-for="(hotCity, key) in hotCityList" 
                            :key="key"
                        >
                            <div class="recommend-item-content">
                                {{hotCity.Name}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-others">
                    <div class="main-others-group"
                        v-for="(city, cityKey) in cityList" 
                        :key="cityKey"
                        :ref="city.Group"
                    >
                        <div class="others-group-title">{{city.Group}}</div>
                        <div class="others-group-list">
                            <div class="main-others-item"
                                v-for="(item, itemKey) in city.List" 
                                :key="itemKey"
                            >{{item.Name}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import ajaxs from './ajaxs.js';

export default {
    name: 'city',

    data () {
        return {
            cityList: [ // 城市列表
                // {
                //     Group: 'A',
                //     List: [
                //         {
                //             ID: '180613010000526126',
                //             Name: '安庆'
                //         }
                //     ]
                // }
            ],
            hotCityList: [ // 热门城市列表
                // {
                //     ID: '151215010000000015',
                //     Name: '广州',
                // }
            ],
            sideBarList: [ // 侧边栏数据
                {
                    name: '热门',
                }, {
                    name: 'A',
                }, {
                    name: 'B',
                }, {
                    name: 'C',
                }, {
                    name: 'D',
                }, {
                    name: 'E',
                }, {
                    name: 'F',
                }, {
                    name: 'G',
                }, {
                    name: 'H',
                }, {
                    name: 'I',
                }, {
                    name: 'J',
                }, {
                    name: 'K',
                }, {
                    name: 'L',
                }, {
                    name: 'M',
                }, {
                    name: 'N',
                }, {
                    name: 'O',
                }, {
                    name: 'P',
                }, {
                    name: 'Q',
                }, {
                    name: 'R',
                }, {
                    name: 'S',
                }, {
                    name: 'T',
                }, {
                    name: 'U',
                }, {
                    name: 'V',
                }, {
                    name: 'W',
                }, {
                    name: 'X',
                }, {
                    name: 'Y',
                }, {
                    name: 'Z',
                },
            ],

            equipmentHeight: ( // 设备高端
                document.body.offsetHeight || 
                document.documentElement.clientHeight || 
                window.innerHeight
            )
        }
    },

    created: function () {
        const _this = this;

        Promise.all([ajaxs.getCity(), ajaxs.getCity(true)])
        .then(val => {
            _this.cityList = val[0];
            _this.hotCityList = val[1];
        }, error => {
            console.error(error);
            alert(error);
        });
    },
  
    computed: {
        getsideBarHeight() { // 侧边栏 每个item 高度
            return (this.equipmentHeight - 50) / this.sideBarList.length
        }
    },

    methods: {
        jumpToBy(ref) {
            let offsetTop = 0;
            if (ref === '热门') {
                let dom = this.$refs.hot;
                offsetTop = dom.offsetTop;
                console.dir(dom.offsetTop)
            } else {
                let dom = this.$refs[ref];
                offsetTop = dom[0].offsetTop;
            }
            window.scrollTo(0, offsetTop);
        }
    },
}

</script>

<style scoped lang="less">
@black1: #303133;
@black2: #606266;
@black3: #909399;
@black4: #C0C4CC;

.city {
    min-height: 100%;
    background: #efefef;
}

// 顶部搜索栏
.city .search-bar {
    background: #fff;
    border-bottom: 1px solid #ddd;

    .search-content {
        padding: 10px 0px;

        > div {
            height: 30px;
            line-height: 30px;
            font-size: 16px;
        }
    }

    .search-back,
    .search-logo {
        color: #303133;

        i {
            display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
            display: -moz-box;     /* 老版本语法: Firefox (buggy) */
            display: -ms-flexbox;  /* 混合版本语法: IE 10 */
            display: -webkit-flex; /* 新版本语法: Chrome 21+ */
            display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */
            align-items: center;
            height: 30px;
        }
    }

    .search-back {
        padding-right: 15px;
        padding-left: 15px;

        img {
            width: 24px;
            height: 24px;
        }
    }

    .search-bar {
        position: relative;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        background: #e5e5e6;
        border-radius: 15px;

        i {
            display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
            display: -moz-box;     /* 老版本语法: Firefox (buggy) */
            display: -ms-flexbox;  /* 混合版本语法: IE 10 */
            display: -webkit-flex; /* 新版本语法: Chrome 21+ */
            display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */
            align-items: center;
            padding-left: 10px;
            padding-right: 5px;
            height: 30px;

            img {
                width: 24px;
                height: 24px;
            }
        }

        span {
            display: block;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            color: #909399;
        }

        .search-input {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
        }

        input {
            width: 95%;
            padding: 0px 2.5px;
            border: none;
            outline: none;
            font-size: 16px;
            color: #909399;
            background-color: transparent;
        }
        input::-webkit-input-placeholder{
            color: #909399;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color: #909399;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color: #909399;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color: #909399;
        }
    }

    .search-submit {
        padding-right: 15px;
        padding-left: 5px;

        span {
            padding-left: 5px;
        }

        i {
            height: 30px;
        }    

        img {
            width: 24px;
            height: 24px;
        }
    }
}

// 侧边栏
.side-bar {
    position: fixed;
    top: 50px;
    right: 0px;
    padding: 0px 2.5px;
    // background: rgba(255, 255, 255, 0.42);

    .side-bar-list {
        text-align: center;

        .side-bar-item {
            font-size: 12px;
        }
    }
}

// 顶部搜索栏
.city .main {
    padding-bottom: 15px;
    
    .main-content {
        background: #fff;
    }

    .main-location {
        height: 50px;

        .main-location-content {
            line-height: 50px;
            padding: 0px 15px;
            font-size: 16px;
            color: @black1;

            span {
                padding-left: 10px;
                color: @black3;
            }
        }
    }

    .main-recommend {
        background: #f0f0f0;
        padding: 15px 20px 0px 15px;

        .main-recommend-lable {
            padding-bottom: 10px;
            color: @black3;
            font-size: 12px;
        }

        .main-recommend-list {
            overflow: hidden;

            .main-recommend-item {
                float: left;
                width: 33.33%;
                padding-bottom: 15px;
                .recommend-item-content {
                    margin-right: 15px;
                    height: 40px;
                    line-height: 38px;
                    text-align: center;
                    border: 1px solid #ddd;
                    background: #fff;
                }
            }
        }
    }

    .main-others {
        .main-others-group {
            .others-group-title {
                background: #f0f0f0;
                padding-left: 15px;
                line-height: 26px;
            }

            .others-group-list {
                border-top: 1px solid #ddd;
                background: #fff;

                .main-others-item {
                    border-bottom: 1px solid #ddd;
                    line-height: 50px;
                    padding: 0px 15px;
                    font-size: 16px;
                    color: @black1;
                }
            }
        }
    }
}

</style>
