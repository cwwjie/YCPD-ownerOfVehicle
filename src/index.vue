<template>
  <router-view/>
</template>

<script>

import RequestedURL from './config/RequestedURL.js';
import loadPageVar from './utils/loadPageVar.js';

export default {
  name: 'Index',

  // Vue 成功加载
  mounted() {
    this.destroyBackups(); // 删除备份策略
    
    if (process.env.NODE_ENV === 'development') { // 测试环境

      this.initDevOpenid();
    } else { // 生产环境
    
      this.initProOpenid();
    }
  },

  methods: {
    /**
     * 删除备份策略, 防止 Vue 加载失败导致
     */
    destroyBackups() {
      document.getElementById('backups').innerHTML = '';
      window.clearInterval(window.vueLoadTime);
    },

    /**
     * 测试环境
     */
    initDevOpenid() {
      const _this = this;
      let loadPageOpenid = loadPageVar('openid');      // url 解析 openid
      let loadPageCode = loadPageVar('code');          // url 解析 code

      /**
       * 获取 用户信息
       */
      let initOpenid = openid => {

        _this.$store.dispatch('getUserInfor', openid)
        .then(val => {
          
          _this.saveOpenid(openid);    // 存储
          _this.initHeadImage(openid); // 获取 用户头像
        }, 
          error => console.error(error)
        );
      }

      if (loadPageOpenid) { // 解析 openid 存在 (权限最大)

        this.$store.commit('initOpenid', loadPageOpenid); // 存储 vuex  因为getuserinfo 会失败, 可能不会被 commit 进去 所以在此初始化 openid
        initOpenid(loadPageOpenid);
      } else { // 无解析 openid
        
        if (window.localStorage && window.localStorage.openid) { // 本地openid

          // localStorage 的 openid 是正确可用
          _this.$store.commit('initOpenid', window.localStorage.openid); // 存储 vuex
          initOpenid(window.localStorage.openid);
        } else { // 无本地openid

          if (loadPageCode) { // code 解析存在

            this.$store.dispatch('getOpenidCode', loadPageCode) // 交换 openid 
            .then(openid => {

              _this.saveOpenid(openid);    // 存储
              initOpenid(openid);
            }, error => {
              console.error(error);
            });

          } else { // code 解析不存在

            console.error('无法获取 code 以及 对应用户的openid');
          }          
        }        
      }
    },

    /**
     * 生产环境
     */
    initProOpenid() {
      const _this = this;
      let loadPageCode = loadPageVar('code');     // url 解析 code
      /**
       * 获取 用户信息
       */
      let initOpenid = openid => {

        _this.$store.dispatch('getUserInfor', openid)
        .then(val => {

          _this.saveOpenid(openid);    // 存储
          _this.initHeadImage(openid); // 获取 用户头像
        }, 
          error => console.error(error)
        );
      }

      if (window.localStorage && window.localStorage.openid) { // 本地openid

        _this.$store.commit('initOpenid', window.localStorage.openid); // 存储 vuex
        initOpenid(window.localStorage.openid);
      } else {

        if (loadPageCode) { // code 存在 

          this.$store.dispatch('getOpenidCode', loadPageCode) // 交换 openid
          .then(openid => {

            _this.saveOpenid(openid);    // 存储
            initOpenid(openid);
          }, error => {
            console.error(error);
          });

        } else {  // code 不存在
        
          console.error('无法获取 code 以及 对应用户的openid');
        }
      }
    },

    /**
     * 本地存储 openid vuex
     * @param {string} openid openid
     */
    saveOpenid(openid) {
      this.$store.commit('initOpenid', openid); // 存储 vuex
      if (window.localStorage) { // 兼容
        window.localStorage.setItem('openid', openid);
      }
    },

    /**
     * 获取 用户 头像
     * @param {string} openid 传值 区分 测试 生产
     */
    initHeadImage(openid) {
      this.$store.dispatch('getHeadImageUrl', openid) // 通过 openid 获取 用户头像
      .then(
        {},                           // 成功 不操作
        error => console.error('获取 用户 头像失败, 原因:' + error) // 失败 打印错误信息
      );
    }
  },
}

</script>

<style lang="less">

// 这里是存放全局样式的地方
@import '~vux/src/styles/reset.less'; // vux 初始化样式

// 禁止使用 iframe 防止广告弹出
iframe { display: none !important; }

</style>
