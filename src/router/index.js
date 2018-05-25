import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('@/router/Home/index'); // 主页 首屏
const User = () => import('@/router/User/index'); // 个人中心
const userInfor = () => import('@/router/User/infor'); // 个人信息
const userOrder = () => import('@/router/User/order'); // 订单页面
const log = () => import('@/router/Log/index'); // 初始化控制台页面

Vue.use(Router);

const routes = [
  {
    path: '/index',
    alias: ['/home', '/'],
    name: 'home',
    component: Home,
    meta: { title: '车主入口' },
  }, {
    path: '/user/index',
    alias: ['/user/', '/user'],
    name: 'user',
    component: User,
    meta: { title: '个人中心' },
  }, {
    path: '/user/infor',
    name: 'userInfor',
    component: userInfor,
    meta: { title: '个人信息' },
  }, {
    path: '/user/order',
    name: 'userOrder',
    component: userOrder,
    meta: { title: '订单信息' },
  }, {
    path: '/log',
    name: 'log',
    component: log,
    meta: { title: '控制台页面' },
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
