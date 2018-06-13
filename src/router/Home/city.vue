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
                <div class="side-bar-item">热门</div>
                <div class="side-bar-item">A</div>
                <div class="side-bar-item">B</div>
                <div class="side-bar-item">C</div>
                <div class="side-bar-item">D</div>
                <div class="side-bar-item">E</div>
                <div class="side-bar-item">F</div>
                <div class="side-bar-item">G</div>
                <div class="side-bar-item">H</div>
                <div class="side-bar-item">I</div>
                <div class="side-bar-item">J</div>
                <div class="side-bar-item">K</div>
                <div class="side-bar-item">L</div>
                <div class="side-bar-item">M</div>
                <div class="side-bar-item">N</div>
                <div class="side-bar-item">O</div>
                <div class="side-bar-item">P</div>
                <div class="side-bar-item">Q</div>
                <div class="side-bar-item">R</div>
                <div class="side-bar-item">S</div>
                <div class="side-bar-item">T</div>
                <div class="side-bar-item">U</div>
                <div class="side-bar-item">V</div>
                <div class="side-bar-item">W</div>
                <div class="side-bar-item">X</div>
                <div class="side-bar-item">Y</div>
                <div class="side-bar-item">Z</div>
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
                    <div class="main-recommend-lable">国内热门城市</div>
                    <div class="main-recommend-list">
                        <div class="main-recommend-item">
                            <div class="recommend-item-content">
                                上海
                            </div>
                        </div>
                        <div class="main-recommend-item">
                            <div class="recommend-item-content">
                                北京
                            </div>
                        </div>
                        <div class="main-recommend-item">
                            <div class="recommend-item-content">
                                杭州
                            </div>
                        </div>
                        <div class="main-recommend-item">
                            <div class="recommend-item-content">
                                广州
                            </div>
                        </div>
                        <div class="main-recommend-item">
                            <div class="recommend-item-content">
                                成都
                            </div>
                        </div>
                        <div class="main-recommend-item">
                            <div class="recommend-item-content">
                                苏州
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-others">
                    <div class="main-others-group">
                        <div class="others-group-title">A</div>
                        <div class="others-group-list">
                            <div class="main-others-item">南京</div>
                            <div class="main-others-item">天津</div>
                        </div>
                    </div>
                    <div class="main-others-group">
                        <div class="others-group-title">B</div>
                        <div class="others-group-list">
                            <div class="main-others-item">重庆</div>
                            <div class="main-others-item">西安</div>
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
    top: 90px;
    right: 5px;
    padding: 5px 2.5px;
    background: rgba(255, 255, 255, 0.42);

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
}

</style>
