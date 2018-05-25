<template>
  <router-view/>
</template>

<script>

import loadPageVar from './utils/loadPageVar.js';
let loadPageOpenid = loadPageVar('openid'); // url 解析 openid

export default {
  name: 'Index',

  data () {
    return {
      openid: loadPageOpenid ? loadPageOpenid : false // openid 不存在为 false
    }
  },

  // 仅执行一次
  mounted() {
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
      let testOpenid = 'oI0FV0pK5sqCnE_LBBXb6sxdROwg'; //测试 openid

      if (this.openid) { // 优先使用 解析openid
        testOpenid = this.openid;
      }

      this.$store.commit('initOpenid', testOpenid); // 存储到vuex
      // 可注释掉
      this.$store.dispatch('getUserInfor', testOpenid) // 通过 openid 获取 用户信息
      .then(val => {
        console.log('成功通过 openid 获取用户信息: ', val);
        _this.initHeadImage(testOpenid); // 通过 openid 获取 用户头像
      }, error => {
        console.error(error);
      });
    },

    /**
     * 生产环境
     */
    initProduction() {
      const _this = this;
      const openid = this.openid;

      if (openid) { // openid 存在

        this.$store.commit('initOpenid', openid);    // 存储到vuex
        this.$store.dispatch('getUserInfor', openid) // 通过 openid 获取 用户信息
        .then(() => { // 成功后再请求 用户头像
            _this.initHeadImage(openid);

          },error => console.error(error) // 失败则打印错误信息
        );
      } else {  // openid 不存在
        console.error('无法获取 openid');
      }
    },

    /**
     * 获取 用户 头像
     * @param {string} openid 区分测试和生产环境 所以 传值
     */
    initHeadImage(openid) {
      this.$store.dispatch('getHeadImageUrl', openid) // 通过 openid 获取 用户头像
      .then(
        {},                           // 成功 不操作
        error => console.error(error) // 失败 打印错误信息
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
