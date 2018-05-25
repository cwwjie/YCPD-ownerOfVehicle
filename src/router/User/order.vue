<!-- 
  - 订单信息页面 
  -->
<template>
  <div class="user-order">

    <!-- 头部导航栏 -->
    <mt-header title="订单信息">
      <router-link to="/user" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <!-- 顶部选项卡 -->
    <mt-navbar v-model="navbarSelected">
      <mt-tab-item id="record">消费记录</mt-tab-item>
      <mt-tab-item id="reserved">已预约</mt-tab-item>
      <mt-tab-item id="paying">待付款</mt-tab-item>
      <mt-tab-item id="forService">待服务</mt-tab-item>
      <mt-tab-item id="beEvaluated">待评价</mt-tab-item>
    </mt-navbar>

    <!-- 显示面板 -->
    <mt-tab-container v-model="navbarSelected">

      <!-- 消费记录 -->
      <mt-tab-container-item id="record">
        <div class="order-none">暂无消费记录</div>
      </mt-tab-container-item>

      <!-- 已预约 -->
      <mt-tab-container-item id="reserved">
        <div class="order-none">暂无已预约项</div>
      </mt-tab-container-item>

      <!-- 待付款 -->
      <mt-tab-container-item id="paying">
        <div class="order-none">暂无待付款项</div>
      </mt-tab-container-item>

      <!-- 待服务 -->
      <mt-tab-container-item id="forService">
        <div class="order-none">暂无待服务项</div>
      </mt-tab-container-item>

      <!-- 待评价 -->
      <mt-tab-container-item id="beEvaluated">
        <div class="order-none">暂无待评价项</div>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>

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
  name: 'userOrder',

  data () {
    return {
      // 顶部选项卡
      navbarSelected: "record", // 消费记录:record 已预约:reserved 待付款:paying 待服务:forService 待评价:beEvaluated
    }
  },
  
  methods: {
  }
}

</script>

<style scoped lang="less">

// 初始化样式
.user-order {
  width: 100%;
  min-height: 100%;
  background: #efefef;
  overflow: hidden;
}

// 头部导航栏
.user-order .mint-header {
  background: #d00;
  margin-bottom: 15px;
}

// 顶部选项卡
.user-order .mint-navbar {
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
.user-order .mint-tab-container {
  .order-none {
    padding: 15px;
    text-align: center;
    font-size: 14px;
    color: #606266;
  }
}

</style>
