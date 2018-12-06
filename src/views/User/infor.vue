<!-- 
  - 个人信息页面 
  -->
<template>
  <div class="user-infor">

    <!-- 头部导航栏 -->
    <mt-header title="个人信息">
      <router-link to="/user" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="infor-main">
      <div class="main-list">

        <div class="main-item main-portrait">
          <div class="item-key">头像</div>
          <div class="item-value">
            <div class="item-portrait" v-if="userinfo.headImageUrl">
              <img alt="用户头像" :src="userinfo.headImageUrl" />
            </div>
            <div class="item-portrait" v-else>
              <svg class="personnel" width="64" height="64" t="1526456513719" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20331" xmlns:xlink="http://www.w3.org/1999/xlink" >
                <path fill="#d8d8d8" d="M512.0181274414062 140.7236328125c-125.93957519531247 0-228.48156738281247 102.50326538085938-228.48156738281247 228.48074340820312 0 125.90167236328126 102.46701049804688 228.44448852539062 228.48156738281247 228.44448852539062 125.97665405273438 0 228.517822265625-102.54199218749999 228.517822265625-228.44448852539062 0-125.97747802734375-102.54116821289061-228.48074340820312-228.517822265625-228.48074340820312z" p-id="20332"></path>
                <path fill="#d8d8d8" d="M688.11962890625 592.4355773925781c-48.68206787109375 38.48208618164063-109.30682373046875 62.32461547851563-176.10150146484375 62.32461547851563-66.79550170898438 0-127.38153076171872-23.915863037109375-176.17565917968753-62.32461547851563C243.4666748046875 651.2484130859374 179.14804077148432 754.5303344726562 170.31338500976562 874.1483764648438c32.343475341796875 4.396728515625001 89.89892578124999 9.127990722656248 172.03436279296875 9.127990722656248h339.1916198730469c82.17333984375 0 139.7650451660156-4.731262207031249 172.14724731445312-9.127990722656248-8.762145996093748-119.69384765625-73.07995605468749-222.89996337890622-165.5669860839844-281.71279907226557z" p-id="20333"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="item-line"></div>
        <div class="main-item">
          <div class="item-key">姓名</div>
          <div class="item-value">{{userinfo.ContactName}}</div>
        </div>

        <div class="item-line"></div>
        <div class="main-item">
          <div class="item-key">手机号码</div>
          <div class="item-value">{{userinfo.Mobile}}</div>
        </div>

        <div class="item-line"></div>
        <div class="main-item">
          <div class="item-key">地区</div>
          <div class="item-value">{{userinfo.City}} {{userinfo.Address}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

// mint-ui 框架
import Vue from 'vue';
import { Header, Button } from 'mint-ui';
import 'mint-ui/lib/font/style.css';
import 'mint-ui/lib/header/style.css';
import 'mint-ui/lib/button/style.css';
Vue.component('mt-header', Header);
Vue.component('mt-button', Button);

export default {
  name: 'userInfor',

  computed: {
    userinfo() { // 用户信息
      return this.$store.getters.getLoginIofor
    }
  },

  methods: {
  }
}

</script>

<style scoped lang="less">

// 初始化样式
.user-infor {
  width: 100%;
  min-height: 100%;
  background: #efefef;
  overflow: hidden;
}

// 头部导航栏
.user-infor .mint-header {
  background: #d00;
}

// 主要内容
.user-infor .infor-main {
  margin-top: 15px;
  padding: 0px 15px;
  border-top: 1px solid #ddd;
  border-top: 1px solid #ddd;
  background: #fff;

  .main-list {
    position: relative;

    .main-item {
      display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
      display: -moz-box;     /* 老版本语法: Firefox (buggy) */
      display: -ms-flexbox;  /* 混合版本语法: IE 10 */
      display: -webkit-flex; /* 新版本语法: Chrome 21+ */
      display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */
      align-items: center;
      justify-content: flex-start;
      padding: 15px 0px;

      .item-key {
        font-size: 14px;
        color: #606266;
      }

      .item-value {
        flex: 1;
        font-size: 14px;
        color: #909399;
        text-align: right;
      }
    }

    .main-portrait {
      height: 80px;
      padding: 10px 0px;

      .item-portrait {
        display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
        display: -moz-box;     /* 老版本语法: Firefox (buggy) */
        display: -ms-flexbox;  /* 混合版本语法: IE 10 */
        display: -webkit-flex; /* 新版本语法: Chrome 21+ */
        display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */
        align-items: center;
        float: right;
        height: 80px;
        width: 80px;
        border: 1px solid #d8d8d8;

        img {
          width: 100%;
          height: 100%;
        }

        .personnel {
          padding: 8px;
        }
      }
    }

    .item-line {
      height: 1px;
      width: 100%;
      background: #ddd;
    }
  }
}

</style>
