<!-- 
  - 购买券列表详情 
  -->
<template>
<div class="ticket-list-detail">
    <!-- 头部 -->
    <div class="header">
        <div class="header-left" v-on:click="$router.push('/ticket/list/index')">
            <svg width="24" height="24" t="1527728206155" class="left-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1930" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path fill="#ffffff" d="M481.233 904c8.189 0 16.379-3.124 22.628-9.372 12.496-12.497 12.496-32.759 0-45.256L166.488 512l337.373-337.373c12.496-12.497 12.496-32.758 0-45.255-12.498-12.497-32.758-12.497-45.256 0l-360 360c-12.496 12.497-12.496 32.758 0 45.255l360 360c6.249 6.249 14.439 9.373 22.628 9.373z" p-id="1931"></path>
            </svg>
            <span>购买服务</span>
        </div>
        <div class="header-right">
            分享
        </div>
    </div>

    <!-- 券 -->
    <div class="main">
        <div class="main-header">
            <img src="https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/ticket/list-detail-header.png">
        </div>
        <div class="main-content">
            <div class="main-top-block">
                <div class="main-top-title">标准洗车券</div>
                <div class="main-top-price">40元</div>
                <div class="main-top-describe">券基本信息标准洗车</div>
                <div class="main-top-submit">马上购买</div>
            </div>
            <div class="main-line-block">
                <div class="line-block-radius-left"></div>
                <div class="line-block-radius-right"></div>
                <div class="line-block-dotted"></div>
            </div>
            <div class="main-bottom-block">
                <div class="main-bottom-title">基础信息</div>
                <div class="main-bottom-subhead">券介绍</div>
                <div class="main-bottom-describe">标准洗车服务: ；<br/>
                    1. 清洁脚垫；<br/>
                    2. 蜡水清洁车身；；<br/> 
                    3. 轮胎、轮毂清洁；；<br/> 
                    4. 边框、玻璃清洁；；<br/> 
                    5. 吸尘、擦拭内饰；；<br/> 
                    6. 擦拭轮毂；；<br/> 
                    7. 质检交车。
                </div>
                <div class="main-bottom-subhead">有效期</div>
                <div class="main-bottom-describe">车主有效天数90天 </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>

import ajaxs from './ajaxs';

export default {
    name: 'ticketListDetail',

    data () {
        return {
        }
    },

    mounted() {
    },

    methods: {
    }
}

</script>

<style scoped lang="less">

// 初始化样式
.ticket-list-detail {
    width: 100%;
    min-height: 100%;
    background: #db1a26;
}

// 头部栏
.ticket-list-detail .header {
    display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box;     /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox;  /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */
    justify-content: start;
    align-items: center;
    padding: 0px 15px;
    line-height: 50px;
    color: #fff;
    font-size: 18px;

    .header-left svg {
        position: relative;
        top: 6px;
    }

    .header-right {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: right;

    }
}

// 券
.ticket-list-detail .main {
    position: relative;
    padding: 45px 15px 15px 15px;

    .main-header {
        position: absolute;
        top: 15px;
        left: 50%;
        margin-left: -30px;
        width: 60px;
        height: 60px;
        background: #fff;
        border-radius: 30px;
        border: 1px solid #ddd;

        img {
            margin: 3px;
            width: 54px;
            height: 54px;
        }
    }

    .main-content {
        width: 100%;
        border-radius: 5px;
        padding-top: 25px;
        background: #fff;
        min-height: 120px;

        .main-top-block {
            padding: 15px;
            text-align: center;

            .main-top-title {
                padding-bottom: 5px;
                font-size: 20px;
                line-height: 28px;
                color: #606266;
            }

            .main-top-price {
                padding-bottom: 5px;
                font-size: 24px;
                line-height: 32px;
                color: #d00;
            }

            .main-top-describe {
                padding-bottom: 15px;
                font-size: 14px;
                line-height: 24px;
                color: #909399;
            }

            .main-top-submit {
                width: 200px;
                height: 35px;
                line-height: 35px;
                margin: 0 auto;
                color: #fff;
                background: #409eff;
                border-radius: 5px;
            }
        }

        .main-line-block {
            position: relative;
            padding: 15px 0px;

            .line-block-dotted {
                width: 100%;
                height: 1px;
                background-image: url(https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/ticket/dotted-repeat.png);
                background-repeat: repeat-x;
            }
            .line-block-radius-left,
            .line-block-radius-right {
                position: absolute;
                top: 9px;
                background: #db1a26;
                width: 14px;
                height: 14px;
                border-radius: 7px;
            }

            .line-block-radius-left {
                left: -7px;
            }

            .line-block-radius-right {
                right: -7px;
            }
        }

        .main-bottom-block {
            padding: 15px;

            .main-bottom-title {
                padding-bottom: 10px;
                font-size: 18px;
                color: #606266;
            }

            .main-bottom-subhead {
                font-size: 12px;
                padding-bottom: 5px;
                color: #909399;
            }
            .main-bottom-describe {
                font-size: 12px;
                padding-bottom: 15px;
                color: #606266;
            }
        }
    }

}

</style>
