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
    
    <!-- 查看网店 -->
    <div class="ticket-service">
        <div class="ticket-service-content">查看网店(任意网店均可, 无需预约)</div>
    </div>

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
        <div class="ticket-list">
            <div class="ticket-item">
                <div class="ticket-item-content">
                    <div class="ticket-item-left">
                        <div class="item-left-title flex-start">
                            <div class="item-left-main flex-rest">
                                上门保养
                            </div>
                            <div class="item-left-sub">
                                详情 >
                            </div>
                        </div>
                        <div class="item-left-details">
                            <div>粵B3H97T</div>
                            <div>在线预约，技师上门，足不出户，享受VIP服务</div>
                        </div>
                        <div class="item-left-bottom">核销码: 201710171YZVNlgYV</div>
                    </div>
                    <div class="ticket-item-right">
                        <div class="item-right-content">
                            <div class="item-right-code">核销码</div>
                            <div class="item-right-time">2018-6-26前有效</div>
                        </div>
                    </div>
                    <div class="ticket-item-background">
                        <img src="https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/user/ticket/arrive_bg.png" />
                    </div>
                </div>
            </div>
        </div>
      </mt-tab-container-item>

      <!-- 已使用 -->
      <mt-tab-container-item id="used">
        <div class="ticket-none">暂无券</div>
      </mt-tab-container-item>

      <!-- 已过期 -->
      <mt-tab-container-item id="expired">
        <div class="ticket-none">暂无券</div>
      </mt-tab-container-item>
    
    </mt-tab-container>

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
  name: 'myTicketList',

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
@black1: #303133;
@black2: #606266;
@black3: #909399;
@black4: #C0C4CC;


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

// 查看网店
.ticket-service {
    padding: 0px 15px 15px 15px;

    .ticket-service-content {
        line-height: 45px;
        text-align: center;
        border-radius: 4px;
        border: 1px solid #ddd;
        color: @black3;
        background: #fff;
    }
}

// 显示面板
.ticket-list .mint-tab-container {
  position: relative;
  top: 1px;

  .ticket-list {
    background: #fff;
    padding-top: 15px;

    .ticket-item {
        padding: 0px 15px 15px 15px;

        .ticket-item-content {
            position: relative;
        }

        .ticket-item-left {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 69%;
            height: 100%;
            z-index: 1;

            .item-left-title {
                padding: 10px 10px 10px 15px;
                color: #fff;
                font-size: 14px;

                .item-left-sub {
                    font-size: 12px;
                    color: @black1;
                }
            }

            .item-left-details {
                font-size: 12px;
                line-height: 16px;
                padding: 0px 10px 0px 15px;
                color: @black1;
            }

            .item-left-bottom {
                position: absolute;
                padding: 10px 10px 10px 15px;
                bottom: 0px;
                left: 0px;
                font-size: 12px;
                color: #fff;
            }
        }

        .ticket-item-right {
            position: absolute;
            top: 0px;
            right: 0px;
            width: 31%;
            height: 100%;
            text-align: center;
            font-size: 12px;
            z-index: 1;

            .item-right-content {
                position: absolute;
                top: 55%;
                width: 100%;
                color: @black1;
            }
        }

        .ticket-item-background {
            width: 100%;
            height: 100%;

            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
  }

  .ticket-none {
    padding: 15px;
    text-align: center;
    font-size: 14px;
    color: #606266;
  }
}

</style>
