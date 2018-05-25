import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/index',
    alias: ['/home', '/'],
    name: 'home',
    component: () => import('@/router/Home/index'), // 主页 首屏
    meta: { title: '车主入口' },
  }, {
    path: '/user/index',
    alias: ['/user/', '/user'],
    name: 'user',
    component: () => import('@/router/User/index'), // 个人中心
    meta: { title: '个人中心' },
  }, {
    path: '/user/infor',
    name: 'userInfor',
    component: () => import('@/router/User/infor'), // 个人信息
    meta: { title: '个人信息' },
  }, {
    path: '/user/order',
    name: 'userOrder',
    component: () => import('@/router/User/order'), // 订单页面
    meta: { title: '订单信息' },
  },
];

let router = new Router({
  // mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) { // 路由发生变化修改页面 title
    document.title = to.meta.title;
  }

  next();
});

export default router;
