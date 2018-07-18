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
                        <input type="text" v-model="searchInput" placeholder="城市名、拼音首字母..." />
                    </div>
                </div>
                <div class="search-submit">
                    <span>搜索</span>
                </div>
            </div>
        </div>

        <!-- 侧边栏 -->
        <div class="side-bar" v-if="searchInput === ''">
            <div class="side-bar-list">
                <div class="side-bar-item" 
                    v-for="(item, key) in sideBarList" 
                    :style="`height: ${getsideBarHeight}px; line-height: ${getsideBarHeight}px;`"
                    :key="key"
                    @touchstart="jumpToBy(item.name)"
                >{{item.name}}</div>
            </div>
        </div>

        <!-- 内容 -->
        <div class="main" ref="main" id="main">
            <div class="main-content">
                <div class="main-location">
                    <div class="main-location-content" 
                        v-if="position.state"
                    >
                        {{position.cityname}}<span>GPS定位</span>
                    </div>
                    <div class="main-location-content" 
                        v-else
                        @click="initLocation"
                    >
                        <span>正在GPS定位</span>
                    </div>
                </div>
                <div class="main-recommend" v-if="searchInput === ''">
                    <div class="main-recommend-lable"
                        ref="hot"
                    >国内热门城市</div>
                    <div class="main-recommend-list">
                        <div class="main-recommend-item"
                            v-for="(hotCity, key) in hotCityList" 
                            :key="key"
                            @click="selectCityName(hotCity.Name)"
                        >
                            <div class="recommend-item-content">
                                {{hotCity.Name}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-others" v-if="searchInput === ''">
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
                                @click="selectCityName(item.Name)"
                            >{{item.Name}}</div>
                        </div>
                    </div>
                </div>
                <div class="main-searchResult" v-if="searchInput !== ''">
                    <div v-if="searchFilter.length > 0">
                        <div class="searchResult-title">搜索结果</div>
                        <div class="searchResult-list">
                            <div class="searchResult-item"
                                v-for="(item, key) in searchFilter" 
                                :key="key"
                                @click="selectCityName(item.Name)"
                            >{{item.Name}}</div>
                        </div>
                    </div>
                    <div class="searchResult-unavailable" v-else>暂无匹配信息</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { Toast, Indicator } from 'mint-ui';
import 'mint-ui/lib/style.min.css';

import initLocation from './../../components/initLocation';
import ajaxs from './ajaxs.js';

export default {
    name: 'city',

    components: { Toast, Indicator },

    data () {
        return {
            searchInput: '', // 搜索框
            
            searchFilter: [ // 搜索过滤
                // {
                //     ID: '180613010000526126',
                //     Name: '安庆'
                // }
            ],

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
            ),

            mainHeight: ( // 内容高度
                document.body.offsetHeight || 
                document.documentElement.clientHeight || 
                window.innerHeight
            )
        }
    },

    created: function () {
        const _this = this;

        // this.initLocation();   // 位置定位

        Promise.all([ajaxs.getCity(), ajaxs.getCity(true)]) // 获取城市
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
        },

        position() { // 定位
            // {
            //   state: false,
            //   latitude: 114,
            //   longitude: 22.7,
            //   cityname: '深圳',
            // }
            return this.$store.state.user.position
        }
    },

    methods: {
        /**
         * 初始化位置定位
         */
        initLocation() {
            return initLocation(this);
            const _this = this;

            /**
             * H5 定位
             * @return {Promise} resolve({
             *   longitude: longitude,
             *   latitude: latitude,
             * }) reject(error)
             */
            let getHtml5Location = () => new Promise((resolve, reject) => {
                window.navigator.geolocation.getCurrentPosition(

                    succeed => resolve({
                        longitude: succeed.coords.longitude,
                        latitude: succeed.coords.latitude,
                    }), 

                    error => reject("H5获取定位信息异常, 原因：" + JSON.stringify(error)), 

                    {
                        enableHighAccuracy: false,
                        timeout: 5000,
                        maximumAge: 60000
                    }
                );
            });

            /**
             * 微信 定位
             * @return {Promise} resolve({
             *   longitude: longitude,
             *   latitude: latitude,
             * }) reject(error)
             */
            let getWxLocation = () => new Promise((resolve, reject) => {
                ajaxs.initJSSDK(['getLocation', 'openLocation'])
                .then(
                    succeed => wx.getLocation({
                        type: 'wgs84',
                
                        success(res) {
                            resolve({
                                longitude: res.longitude,
                                latitude: res.latitude,
                            });
                        },
    
                        fail(res) {
                            reject("获取地理位置信息失败：" + res.errMsg);
                        },
    
                        cancel() {
                            reject("获取地理位置信息被取消");
                        }
                    }), 
                    error => reject(error)
                )
            });

            /**
             * 微信定位转换为百度定位
             * @param {Object} position longitude latitude
             * @return {Promise} resolve({
             *   longitude: longitude,
             *   latitude: latitude,
             * }) reject(error)
             */
            let wxToBMapConver = position => new Promise((resolve, reject) => {
                let ggPoint = new BMap.Point(position.longitude, position.latitude);
                let convertor = new BMap.Convertor();
                let pointArr = [];

                pointArr.push(ggPoint);
                convertor.translate(pointArr, 1, 5, result => {
                    if (result.status === 0) {
                        resolve({
                            longitude: result.points[0].lng,
                            latitude: result.points[0].lat,
                        });
                    }
                    else {
                        reject('微信定位坐标转换为百度定位坐标失败, 原因: ' + JSON.stringify(result));
                    }
                });
            });

            /**
             * H5 定位 并且储存
             */
            let getSaveH5Handle = () => {
                getHtml5Location() // H5 定位
                .then(
                    position => saveLocation(position), 
                    error => {
                        Indicator.close();
                        console.error(error)
                        Toast({
                            message: error,
                            duration: 5000
                        });
                    }
                );
            };

            /**
             * 存储定位
             * @param {Object} position longitude latitude
             */
            let saveLocation = position => {
                ajaxs.getCityName(position) // 获取城市名称
                .then(cityName => { // 成功
                    Indicator.close();
                    _this.$store.commit('initLocation', { // 存储到 vuex
                        state: true,
                        latitude: position.latitude,
                        longitude: position.longitude,
                        cityname: cityName
                    });
                }, error => {
                    Indicator.close();
                    Toast({
                        message: error,
                        duration: 5000
                    });
                    _this.$store.commit('initLocation', {
                        state: true,
                        latitude: position.latitude,
                        longitude: position.longitude,
                        cityname: '深圳', // 失败默认深圳
                    });
                })
            };

            Indicator.open('正在获取定位...');
            if (window.location.hostname === 'localhost') { // 本地环境
                getSaveH5Handle() // H5 定位
                
            } else { // 线上环境
                getWxLocation() // 微信定位
                .then( // 微信成功
                    wxPosition => {
                        wxToBMapConver(wxPosition) // 微信定位转换为百度定位
                        .then(
                            position => saveLocation(position), // 转换成功
                            error => getSaveH5Handle() // 转换失败
                        )
                    },  
                    error => getSaveH5Handle() // 微信失败
                );
            }
        },

        jumpToBy(ref) {
            // 滚动距离 转换
            let offsetTop = 0;
            if (ref === '热门') {
                let dom = this.$refs.hot;
                offsetTop = dom.offsetTop - 52;
            } else {
                let dom = this.$refs[ref];
                if (this.$refs[ref] && dom[0]) { // 兼容写法
                    offsetTop = dom[0].offsetTop - 52;
                }
            }

            this.mainHeight = this.$refs.main.childNodes[0].clientHeight;
            this.$refs.main.scrollTop = offsetTop; // 设置 滚动距离

            window.addEventListener('touchmove', this.handleTouchMove);
            window.addEventListener('touchend', this.handleTouchEnd);
        },

        handleTouchMove(e) {
            e.preventDefault();
            this.$refs.main.scrollTop = (e.changedTouches[0].clientY - 52) / (this.equipmentHeight - 52) * (this.mainHeight - 52);
        },

        handleTouchEnd() {
            window.removeEventListener('touchmove', this.handleTouchMove);
            window.removeEventListener('touchend', this.handleTouchEnd);
        },

        /**
         * 更新城市定位到 vuex
         * @param {String} cityname 城市名称
         */
        selectCityName(cityname) {
            this.$store.commit('updateCityname', cityname);
            this.$router.push('/index');
        }
    },

    watch: {
        searchInput: function (newSearchInput, oldSearchInput) {
            let searchFilter = [];
            this.cityList.map(group => group.List.map(
                item => {
                    if (item.Name.search(newSearchInput) !== -1) {
                        searchFilter.push(item);
                    }
                    return item
                }
            ));
            this.searchFilter = searchFilter;
        },
    },
}

</script>

<style scoped lang="less">
@black1: #303133;
@black2: #606266;
@black3: #909399;
@black4: #C0C4CC;

.city {
    height: 100%;
    background: #efefef;
}

// 顶部搜索栏
.city .search-bar {
    position: fixed;
    top: 0px;
    width: 100%;
    left: 0px;
    z-index: 3;
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
    width: 8%;
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
    position: fixed;
    top: 0px;
    padding-top: 52px;
    width: 92%;
    height: 100%;
    overflow-y: scroll;
    
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
        padding: 15px 0px 0px 15px;

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

    .main-searchResult {
        .searchResult-title {
            background: #f0f0f0;
            padding: 10px 15px;
            line-height: 26px;
        }

        .searchResult-list {
            border-top: 1px solid #ddd;
            background: #fff;

            .searchResult-item {
                border-bottom: 1px solid #ddd;
                line-height: 50px;
                padding: 0px 15px;
                font-size: 16px;
                color: @black1;
            }
        }

        .searchResult-unavailable {
            background: #f0f0f0;
            padding: 15px;
        }
    }
}

</style>
