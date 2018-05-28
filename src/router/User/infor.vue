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
              <personnel width="64" height="64" color="#d8d8d8"/>
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

// 自己封装 ICON
import personnel from './../../assets/personnel.vue'; // 登录头像

export default {
  name: 'userInfor',

  components: { personnel },
  
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
