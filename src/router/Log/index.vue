<!-- 
  - 初始化 vconsole 页面 
  -->
<template>
  <div class="log">
    <div class="log-content" v-if="isInit">
      <h1>初始化控制台成功!</h1>
      <router-link to="/" slot="left">
        <mt-button type="primary">返回首页</mt-button>
      </router-link>
    </div>
    <div class="log-content" v-else>
    </div>
  </div>
</template>

<script>

import Vue from 'vue';
import { MessageBox, Toast, Button } from 'mint-ui';
Vue.component('mt-button', Button);
import 'mint-ui/lib/button/style.css';
import 'mint-ui/lib/message-box/style.css';
import 'mint-ui/lib/toast/style.css';
import 'mint-ui/lib/font/style.css';

import VConsole from 'vconsole';
import { setTimeout } from 'timers';

export default {
  name: 'log',

  data () {
    return {
      isInit: false
    }
  },
  
  methods: {
    showMessageBox() {
      let _this = this;
      MessageBox.prompt('请输入密码', '初始化控制台', {
        closeOnClickModal: false
      }).then(({ value, action }) => {
        if (value === '123456' && action === 'confirm') {
          _this.initvconsole(true);
        } else {
          _this.initvconsole(false);
        }
      }, rejected => {
        _this.$router.push('/');
      });
    },

    initvconsole(isSucceed) {
      let _this = this;
      if (isSucceed) {
        _this.isInit = true;
        var vConsole = new VConsole();
      } else {
        Toast({
          message: '密码错误',
          duration: 1000
        });
        setTimeout(() => {
          _this.showMessageBox();
        }, 1000);
      }
    }
  },

  mounted() {
    this.showMessageBox();
  }
}

</script>

<style scoped lang="less">

// 初始化样式
.log {
  width: 100%;
  min-height: 100%;
  background: #efefef;
  overflow: hidden;
}

.log .log-content {
  padding: 15px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;

  h1 {
    font-size: 20px;
    color: #303133;
    margin-bottom: 15px;
  }

  button {
    font-size: 14px;
  }
}

</style>
