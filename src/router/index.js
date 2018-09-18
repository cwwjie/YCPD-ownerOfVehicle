import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/index',
    alias: ['/home', '/'],
    name: 'home',
    component: () => import('@/router/Home/index'), // 主页 首屏
    meta: { title: '养车频道' },
  }, {
    path: '/city',
    component: () => import('@/router/Home/city'), // 主页 首屏
    name: 'city',
    meta: { title: '选择地区' },
  }, {
    path: '/redirect-gas',
    component: () => import('@/router/Home/redirect-gas'), // 加油优惠 导航页面 
    name: 'redirect-gas',
    meta: { title: '养车频道' },
  },
   {
    path: '/user/index',
    alias: ['/user/', '/user'],
    name: 'user',
    component: () => import('@/router/User/index'), // 个人中心
    meta: { title: '个人中心' },
  }, 
  {
    path: '/user/infor',
    name: 'userInfor',
    component: () => import('@/router/User/infor'), // 个人信息
    meta: { title: '个人信息' },
  }, {
    path: '/user/order',
    name: 'userOrder',
    component: () => import('@/router/User/order'), // 订单页面
    meta: { title: '订单信息' },
  }, {
    path: '/user/ticket/list',
    name: 'myTicketList',
    component: () => import('@/router/Ticket/my-list'), // 我的优惠券
    meta: { title: '我的优惠券' },
  },  {
    path: '/user/ticket/detail',
    name: 'myTicketDetail',
    component: () => import('@/router/Ticket/my-list-detail'), // 我的优惠券详情
    meta: { title: '我的优惠券详情' },
  }, {
    path: '/ticket/list/index',
    alias: ['/ticket/list/', '/ticket/list'],
    name: 'ticketList',
    component: () => import('@/router/Ticket/list'), // 购买券列表
    meta: { title: '购买券列表' },
  }, {
    path: '/ticket/list/detail',
    name: 'ticketListDetail',
    component: () => import('@/router/Ticket/list-detail'), // 购买券详情
    meta: { title: '购买券详情' },
  },{
    path: '/jumpPage',
    name: 'jumpPage',
    component: () => import('@/router/Home/jumpPage'), // 跳转页
    meta: { title: '正在跳转' },
  },

  // 新样式
  {
    path: '/user/integral',
    name: 'integral',
    component: () => import('@/router/User/integral'), // 我的积分
    meta: { title: '我的积分' },  
  },
  {
    path: '/card/cardList',
    name: 'cardList',
    component: () => import('@/router//card/cardList'), // 我的卡券列表
    meta: { title: '我的卡券' },  
  },
  {
    path: '/card/cardInfo',
    name: 'cardInfo',
    component: () => import('@/router//card/cardInfo'), // 卡券详情
    meta: { title: '卡券详情' },  
  },
  {
    path: '/card/cardUsed',
    name: 'cardUsed',
    component: () => import('@/router//card/cardUsed'), // 卡券详情已使用
    meta: { title: '卡券详情' },  
  },
  {
    path: '/card/shopList',
    name: 'shopList',
    component: () => import('@/router//card/shopList'), // 全部门店
    meta: { title: '全部门店' },  
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
