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
        <div class="order-list">
          <div class="order-item" v-for="(record, key) in apointment.record" :key="key">
            <div class="item-key">{{key + 1}}</div>
            <div class="item-describe">
              <div class="describe-content">
                <div class="describe-main">（平安）购车险送保养预约（矿物油）</div>
                <div class="describe-subs">深南汽车服务中心 | 未扫码 | 已预约</div>
              </div>
            </div>
            <div class="item-time">2018-06-02</div>
          </div>
        </div>
        <!-- <div class="order-none">暂无消费记录</div> -->
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

import ajaxs from './ajaxs';

export default {
  name: 'userOrder',

  data () {
    return {
      // 顶部选项卡
      navbarSelected: "record", // 消费记录:record 已预约:reserved 待付款:paying 待服务:forService 待评价:beEvaluated

      // 预约记录
      apointment: {
        record: [],      // 消费记录
        reserved: [],    // 已预约
        paying: [],      // 待付款
        forService: [],  // 待服务
        beEvaluated: [], // 待评价
      }
    }
  },

  mounted() {
    this.getApointment('record');
  },
  
  methods: {
    /**
     * 预约记录
     * @param {string} status 必填 全部:-1, 待支付:0, 已预约:1 已评价:2, 已结算:3
     * @return {Promise} resolve(apointment) reject(error)
     */
    getApointment(status) {
      let openid = this.$store.state.user.openid;
      let newApointment = JSON.parse(JSON.stringify(this.apointment));
      let keyValueState = {
        record: -1,
        reserved: 1,
        paying: 0,
        forService: 2,
        beEvaluated: 3,
      }
      const _this = this;

      if (openid) {
        ajaxs.getApointment(openid, keyValueState[status])
        .then(val => {
          if (status === 'record') {

            newApointment.record = val.List;
            _this.apointment = newApointment;
          } else if (status === 'reserved') {
            
            newApointment.reserved = val.List;
            _this.apointment = newApointment;
          } else if (status === 'paying') {
            
            newApointment.paying = val.List;
            _this.apointment = newApointment;
          } else if (status === 'forService') {
            
            newApointment.forService = val.List;
            _this.apointment = newApointment;
          } else if (status === 'beEvaluated') {
            
            newApointment.beEvaluated = val.List;
            _this.apointment = newApointment;
          }
        }, error => {
          console.error(error);
          alert(error);
        });
      }
    }
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
.user-order .mint-tab-container {
  position: relative;
  top: 1px;

  .order-list {
    background: #fff;

    .order-item {
      display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
      display: -moz-box;     /* 老版本语法: Firefox (buggy) */
      display: -ms-flexbox;  /* 混合版本语法: IE 10 */
      display: -webkit-flex; /* 新版本语法: Chrome 21+ */
      display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */
      justify-content: start;
      align-items: center;
      border-bottom: 1px solid #ddd;

      .item-key {
        width: 50px;
        text-align: center;
        line-height: 70px;
        font-size: 18px;
        color: #303133;
      }

      .item-describe {
        display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
        display: -moz-box;     /* 老版本语法: Firefox (buggy) */
        display: -ms-flexbox;  /* 混合版本语法: IE 10 */
        display: -webkit-flex; /* 新版本语法: Chrome 21+ */
        align-items: center;
        flex: 1;
        padding: 12.5px 0px;

        .describe-main {
          font-size: 14px;
          padding-bottom: 2.5px;
          color: #606266;
        }

        .describe-subs {
          font-size: 12px;
          color: #909399;
        }
      }

      .item-time {
        padding-right: 15px;
        padding-bottom: 20px;
        font-size: 12px;
        color: #909399;
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
