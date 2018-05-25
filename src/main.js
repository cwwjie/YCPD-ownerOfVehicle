// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';

import store from './store/index';
import router from './router';
import Index from './index.vue';

import './components/WeUI/weui.min.css'; // weui 样式
import './index.less'; // weui 样式

if (!window.Promise) { // 如果浏览器不支持 Promise
  require('promise');
}
if (!window.fetch) { // 如果浏览器不支持 fetch
  require('whatwg-fetch');
}

Vue.config.productionTip = false;

Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  components: { Index },
  template: '<Index/>',
  router,
});
