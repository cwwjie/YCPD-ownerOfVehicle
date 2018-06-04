<!-- 
  - 购买券列表 
  -->
<template>
  <div class="ticket-list">
    <!-- 头部导航栏 -->
    <mt-header title="我的优惠券">
      <router-link to="/user/index" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <!-- 顶部选项卡 -->
    <mt-navbar v-model="navbarSelected">
      <mt-tab-item id="unused">未使用</mt-tab-item>
      <mt-tab-item id="used">已使用</mt-tab-item>
      <mt-tab-item id="expired">已过期</mt-tab-item>
    </mt-navbar>

    <!-- 显示面板 -->
    <mt-tab-container v-model="navbarSelected">

      <!-- 未使用 -->
      <mt-tab-container-item id="unused">
        <div class="order-list">

            <div class="order-item">
                <div class="item-content">
                    <div class="item-backgroud">
                        <img src="https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/ticket/car_service.png" />
                    </div>
                    <div class="item-top">
                        <div class="item-title">
                            <div class="title-left">上门保养券</div>
                            <div class="title-right">详情 ></div>
                        </div>
                        <div class="item-describe">服务内容在线预约，技师上门，足不出户、享受VIP级别服务</div>
                    </div>
                    <div class="item-bottom">
                        <div class="bottom-content">
                            <div class="bottom-price">价格: 12￥</div>
                            <div class="bottom-submit">立即购买 ></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </mt-tab-container-item>

      <!-- 已使用 -->
      <mt-tab-container-item id="used">
        <div class="order-none">暂无券</div>
      </mt-tab-container-item>

      <!-- 已过期 -->
      <mt-tab-container-item id="expired">
        <div class="order-none">暂无券</div>
      </mt-tab-container-item>

  </div>
</template>

<script>

import ajaxs from './ajaxs';

// mint-ui 框架
import Vue from 'vue';
import { 
  Header, Button, Navbar, 
  TabItem, TabContainer, TabContainerItem,
} from 'mint-ui';
import 'mint-ui/lib/font/style.css';
import 'mint-ui/lib/header/style.css';
import 'mint-ui/lib/button/style.css';
import 'mint-ui/lib/navbar/style.css';
import 'mint-ui/lib/tab-item/style.css';
import 'mint-ui/lib/tab-container/style.css';
import 'mint-ui/lib/tab-container-item/style.css';

Vue.component('mt-header', Header);
Vue.component('mt-button', Button);
Vue.component('mt-navbar', Navbar);
Vue.component('mt-tab-item', TabItem);
Vue.component('mt-tab-container', TabContainer);
Vue.component('mt-tab-container-item', TabContainerItem);

export default {
  name: 'ticketList',

  data () {
    return {
      // 顶部选项卡
      navbarSelected: "unused", // 未使用:unused 已使用:used 已过期:expired
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
.ticket-list {
  width: 100%;
  min-height: 100%;
  background: #efefef;
  overflow: hidden;
}

// 头部导航栏
.ticket-list .mint-header {
  background: #d00;
  margin-bottom: 15px;
}

// 顶部选项卡
.ticket-list .mint-navbar {
  position: relative;
  z-index: 2;

  .mint-tab-item-label {
    font-size: 16px;
  }

  .is-selected {
    border-bottom: 3px solid #F56C6C;
    color: #F56C6C;
    text-decoration: none;
  }
}

// 显示面板
.ticket-list .mint-tab-container {
  position: relative;
  top: 1px;

  .order-list {
    background: #fff;
    padding-top: 15px;

    .order-item {
        padding: 0px 15px 15px 15px;
        font-size: 14px;
        color: #fff;

        .item-content {
            position: relative;
        }
        
        .item-backgroud img {
            width: 100%;
            height: 100%;
        }

        .item-top {
            position: absolute;
            top: 0px;
            width: 100%;

            .item-title {
                position: relative;
                display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */
                justify-content: start;
                align-items: center;
                padding: 5px 15px;

                .title-left {
                    font-size: 16px;
                }

                .title-right {
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    text-align: right;
                }
            }
            
            .item-describe {
                padding: 0px 15px;
            }
        }

        .item-bottom {
            position: absolute;
            bottom: 0px;
            width: 100%;

            .bottom-content {
                display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */
                justify-content: start;
                align-items: center;
                padding: 15px 15px;

                .bottom-submit {
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    text-align: right;
                }
            }
        }
    }
  }

  .order-none {
    padding: 15px;
    text-align: center;
    font-size: 14px;
    color: #606266;
  }
}

</style>
