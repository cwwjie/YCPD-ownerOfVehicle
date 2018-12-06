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
      <mt-tab-item id="all">全部</mt-tab-item>
      <mt-tab-item id="paying">待支付</mt-tab-item>
      <mt-tab-item id="order">已预约</mt-tab-item>
      <mt-tab-item id="evaluate">已评价</mt-tab-item>
    </mt-navbar>

    <!-- 显示面板 -->
    <mt-tab-container v-model="navbarSelected">

      <!-- 全部记录 -->
      <mt-tab-container-item id="all">
        <div class="order-list" v-if="apointment.all.length !== 0">
          <div class="order-item" v-for="(all, key) in apointment.all" :key="key">
            <div class="item-title">
              <div class="item-title-left">{{all.ServiceName}}</div>
              <div class="item-title-right">{{all.Status}}</div>
            </div>
            <div class="item-content">
              <div class="item-content-left">{{all.CarNo}}</div>
              <div class="item-content-right">{{all.BookDate}} {{all.BookTime}}</div>
            </div>
            <div class="item-address">{{all.StoreAddress}}</div>
          </div>
        </div>
        <div class="order-none" v-else>暂无记录</div>
      </mt-tab-container-item>

      <mt-tab-container-item id="paying">
        <div class="order-list" v-if="apointment.paying.length !== 0">
          <div class="order-item" v-for="(paying, key) in apointment.paying" :key="key">
            <div class="item-title">
              <div class="item-title-left">{{paying.ServiceName}}</div>
              <div class="item-title-right">{{paying.Status}}</div>
            </div>
            <div class="item-content">
              <div class="item-content-left">{{paying.CarNo}}</div>
              <div class="item-content-right">{{paying.BookDate}} {{paying.BookTime}}</div>
            </div>
            <div class="item-address">{{paying.StoreAddress}}</div>
          </div>
        </div>
        <div class="order-none" v-else>暂无待支付项</div>
      </mt-tab-container-item>

      <mt-tab-container-item id="order">
        <div class="order-list" v-if="apointment.order.length !== 0">
          <div class="order-item" v-for="(order, key) in apointment.order" :key="key">
            <div class="item-title">
              <div class="item-title-left">{{order.ServiceName}}</div>
              <div class="item-title-right">{{order.Status}}</div>
            </div>
            <div class="item-content">
              <div class="item-content-left">{{order.CarNo}}</div>
              <div class="item-content-right">{{order.BookDate}} {{order.BookTime}}</div>
            </div>
            <div class="item-address">{{order.StoreAddress}}</div>
          </div>
        </div>
        <div class="order-none" v-else>暂无已预约记录</div>
      </mt-tab-container-item>

      <mt-tab-container-item id="evaluate">
        <div class="order-list" v-if="apointment.evaluate.length !== 0">
          <div class="order-item" v-for="(evaluate, key) in apointment.evaluate" :key="key">
            <div class="item-title">
              <div class="item-title-left">{{evaluate.ServiceName}}</div>
              <div class="item-title-right">{{evaluate.Status}}</div>
            </div>
            <div class="item-content">
              <div class="item-content-left">{{evaluate.CarNo}}</div>
              <div class="item-content-right">{{evaluate.BookDate}} {{evaluate.BookTime}}</div>
            </div>
            <div class="item-address">{{evaluate.StoreAddress}}</div>
          </div>
        </div>
        <div class="order-none" v-else>暂无评价记录</div>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>

// mint-ui 框架
import Vue from 'vue';
import { Header, Button, Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui';

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
      navbarSelected: "all", // 全部:all 待支付:paying 已预约:order 已评价:evaluate

      // 预约记录
      apointment: {
        all: [         // 全部
          // {
          //   BookDate: "2018-06-02",
          //   BookID: "180601010001477692",
          //   BookTime: "0800",
          //   Brand: "别克",
          //   CarNo: "粤BG956A",
          //   IsMatch: "已扫码",
          //   Model: "1.6 自动 LE",
          //   Series: "凯越",
          //   ServiceName: "（平安）购车险送保养预约（全合成）",
          //   Status: "已预约",
          //   StoreAddress: "南山区粤海街道海文花园5栋S38",
          //   StoreName: "快车品味深大学府店",
          //   UserName: "龚俊辉",
          //   Volume: 3.7,
          //   Years: "2011",
          // }
        ],
        paying: [],    // 待支付
        order: [],      // 已预约
        evaluate: [],  // 已评价
      }
    }
  },

  mounted() {
    const _this = this;
    /**
     * 初始化选项卡
     */
    let initNavbarSelected = () => {
      if (localStorage && localStorage.userOrderSelected) {
        let mySel = localStorage.userOrderSelected;

        if (
          mySel === 'all' || 
          mySel === 'paying' || 
          mySel === 'order' || 
          mySel === 'evaluate'
        ) {
          _this.navbarSelected = mySel;
        }

        localStorage.removeItem('userOrderSelected');
      }
    }

    initNavbarSelected(); // 选项卡 选中
    this.getApointment('all');
    this.getApointment('paying');
    this.getApointment('order');
    this.getApointment('evaluate');
  },
  
  methods: {
    /**
     * 预约记录
     * @param {string} status 必填 全部:-1, 待支付:0, 已预约:1 已评价:2 or 3
     * @return {Promise} resolve(apointment) reject(error)
     */
    getApointment(status) {
      let openid = this.$store.state.user.openid;
      let keyValueState = { // status 键值对
        all: '-1',
        paying: '0',
        order: '1',
        evaluate: '2',
      }
      const _this = this;

      if (openid && status && keyValueState[status]) { // 必填

        ajaxs.getApointment(openid, keyValueState[status]) // 请求记录
        .then(val => {
          let newApointment = JSON.parse(JSON.stringify(_this.apointment)); // 深复制
          
          if (status === 'all') {

            newApointment.all = val.List;
            _this.apointment = newApointment;
          } else if (status === 'paying') {
            
            newApointment.paying = val.List;
            _this.apointment = newApointment;
          } else if (status === 'order') {
            
            newApointment.order = val.List;
            _this.apointment = newApointment;
          } else if (status === 'evaluate') {
            
            newApointment.evaluate = val.List;
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
      padding: 15px;
      color: #606266;

      .item-title {
        display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
        display: -moz-box;     /* 老版本语法: Firefox (buggy) */
        display: -ms-flexbox;  /* 混合版本语法: IE 10 */
        display: -webkit-flex; /* 新版本语法: Chrome 21+ */
        display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */
        justify-content: start;
        align-items: center;
        font-size: 12px;

        .item-title-left {
          color: #303133;
        }

        .item-title-right {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          text-align: right;
          color: #409EFF;
        }
      }

      .item-content {
        display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
        display: -moz-box;     /* 老版本语法: Firefox (buggy) */
        display: -ms-flexbox;  /* 混合版本语法: IE 10 */
        display: -webkit-flex; /* 新版本语法: Chrome 21+ */
        display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */
        justify-content: start;
        align-items: center;
        font-size: 12px;

        .item-content-right {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          text-align: right;
        }
      }

      .item-address {
        font-size: 12px;
        color: #606266;
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
