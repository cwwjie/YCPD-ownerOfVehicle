<template>
  <router-view/>
</template>

<script>

import loadPageVar from './utils/loadPageVar.js';

export default {
  name: 'Index',

  // 仅执行一次
  mounted() {
    document.getElementById('backups').innerHTML = ''; // 当 Vue 成功加载, 删除备份策略
    
    if (process.env.NODE_ENV === 'development') { // 测试环境

      this.initDevelopment();
    } else { // 生产环境
    
      this.initProduction();
    }
  },

  methods: {
    /**
     * 测试环境 模拟请求
     */
    initDevelopment() {
      const _this = this;
      let loadPageOpenid = loadPageVar('openid');      // url 解析 openid
      let loadPageCode = loadPageVar('code');          // url 解析 code
      let testOpenid = 'oI0FV0pK5sqCnE_LBBXb6sxdROwg'; //测试 openid

      let initOpenid = openid => { // 获取 用户信息

        _this.$store.dispatch('getUserInfor', openid)
        .then(val => {

          console.log('成功通过 openid 获取用户信息: ', val);
          _this.initHeadImage(openid); // 获取 用户头像
        }, 
          error => console.error(error)
        );
      }

      if (loadPageCode) { // code 存在
        this.$store.dispatch('getGetOpenidCode', loadPageCode) // 交换 openid 
        .then(openid => {

          _this.$store.commit('initOpenid', openid); // 存储 vuex
          initOpenid(openid);
        }, error => {
          console.error(error);
        });
      } else {
        if (loadPageOpenid) { // 解析openid
          testOpenid = loadPageOpenid; // 优先
        }
        
        this.$store.commit('initOpenid', testOpenid); // 存储 vuex
        initOpenid(testOpenid);
      }
    },

    /**
     * 生产环境
     */
    initProduction() {
      const _this = this;
      let loadPageCode = loadPageVar('code');     // url 解析 code

      if (loadPageCode) { // code 存在 

        this.$store.dispatch('getGetOpenidCode', loadPageCode) // 交换 openid
        .then(openid => {

          _this.$store.commit('initOpenid', openid);     // 存储 vuex
          _this.$store.dispatch('getUserInfor', openid)  // 获取 用户信息
          .then(() => { // 成功
            _this.initHeadImage(openid); // 用户头像

            }, error => console.error(error) // 失败
          );
        }, error => {
          console.error(error);
        });

      } else {  // code 不存在
        console.error('无法获取 code 以及 对应用户的openid');
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

// 禁止使用 iframe 放置广告弹出
iframe { display: none !important; }

</style>
