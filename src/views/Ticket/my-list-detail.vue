<!-- 
  - 我的券 
  -->
<template>
  <div class="ticket-detail">

    <!-- 头部导航栏 -->
    <div class="header flex-start-center">
      <div class="header-back flex-center">
        <svg t="1529983396814" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2497" xmlns:xlink="http://www.w3.org/1999/xlink" 
          width="32" height="32">
          <path d="M802.909091 487.144727H333.661091l184.762182-170.589091a34.909091 34.909091 0 1 0-47.36-51.269818l-250.391273 231.098182a34.955636 34.955636 0 0 0 0 51.316364l250.391273 231.098181a34.862545 34.862545 0 0 0 49.338182-1.954909 34.909091 34.909091 0 0 0-1.978182-49.338181l-184.762182-170.542546H802.909091a34.909091 34.909091 0 1 0 0-69.818182" 
            fill="#606266" p-id="2498">
          </path>
        </svg>
      </div>
      <div class="header-main flex-rest">
        <div>我的优惠券</div>
      </div>
      <div class="header-back flex-center">
        <a href="tel://4001106558">
          <svg t="1526451067570" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12452" xmlns:xlink="http://www.w3.org/1999/xlink"
            width="23" height="23"
            >
            <path d="M832 762.24 832 768c0 96.64-83.84 176-192 189.44L640 928c0-17.92-14.08-32-32-32l-128 0C462.08 896 448 910.08 448 928l0 64C448 1009.92 462.08 1024 480 1024l128 0c159.36 0 288-114.56 288-256l0-5.76M896 762.24c37.12-13.44 64-48.64 64-90.24l0-128c0-41.6-26.88-76.8-64-90.24L896 448c0-211.84-172.16-384-384-384C300.16 64 128 236.16 128 448l0 5.76C90.88 467.2 64 502.4 64 544l0 128C64 725.12 106.88 768 160 768S256 725.12 256 672l0-128c0-41.6-26.88-76.8-64-90.24L192 448c0-176.64 143.36-320 320-320 176.64 0 320 143.36 320 320l0 5.76c-37.12 13.44-64 48.64-64 90.24l0 128c0 41.6 26.88 76.8 64 90.24M192 672C192 689.92 177.92 704 160 704S128 689.92 128 672l0-128C128 526.08 142.08 512 160 512S192 526.08 192 544L192 672zM896 672c0 17.92-14.08 32-32 32S832 689.92 832 672l0-128C832 526.08 846.08 512 864 512S896 526.08 896 544L896 672z" p-id="12453" 
              fill="#606266"
            ></path>
          </svg>
        </a>
      </div>
    </div>

    <!-- 券详情 -->
    <div class="ticket-item">
      <div class="item-content">
        <div class="item-backgroud">
          <img src="https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/ticket/car_service.png" />
        </div>
        <div class="item-top">
          <div class="item-title">
            <div class="title-left">上门保养券</div>
          </div>
          <div class="item-describe">服务内容在线预约，技师上门，足不出户、享受VIP级别服务</div>
        </div>
        <div class="item-bottom">
          <div class="bottom-content">
            <div class="bottom-price">价格: 12￥</div>
            <div class="bottom-submit" @click="qrCodeVisible = true;">立即使用 ></div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="出示店员核销"
      :modal="true"
      :fullscreen="true"
      :visible.sync="qrCodeVisible"
    >
      <div class="dialog-qrcode">
        <img src="http://p6ygud9kn.bkt.clouddn.com/YCPD/wx20/qrcode.png" />

        <div class="close-qrcode" @click="qrCodeVisible = false;">确认</div>
      </div>
    </el-dialog>

    <!-- 券详描述 -->
    <div class="ticket-describe">
      <div class="ticket-describe-title">优惠券详情</div>
      <div class="ticket-describe-main">
        <div class="ticket-describe-item flex-start">
          <div class="describe-item-title">特权说明</div>
          <div class="describe-item-content flex-rest">
            <p>激活成功即鳝送10积分</p>
            <p>每消费10.00元，赠送1积分</p>
            <p>每使用10积分，抵扣1.00元</p>
            <p>用卡可享受9.8折优思</p>
            <p>1.该会员卡可享受养车频道会员专属优惠；</p>
            <p>2、	积分永不过期。</p>
          </div>
        </div>
        <div class="ticket-describe-item flex-start">
          <div class="describe-item-title">有效日期</div>
          <div class="describe-item-content flex-rest">
            <p>1.永久有效</p>
          </div>
        </div>
        <div class="ticket-describe-item flex-start">
          <div class="describe-item-title">可用时段</div>
          <div class="describe-item-content flex-rest">
            <p>周一至周日全天</p>
          </div>
        </div>
        <div class="ticket-describe-item flex-start">
          <div class="describe-item-title">电话号码</div>
          <div class="describe-item-content flex-rest">
            <p>4001106558</p>
          </div>
        </div>
        <div class="ticket-describe-item flex-start">
          <div class="describe-item-title">使用须知</div>
          <div class="describe-item-content flex-rest">
            <p>每人限领1张</p>
            <p>1、该会员卡不能分享、转赠，汉限本店使用；</p>
            <p>2、养车频道保留最终解釋权</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ajaxs from './ajaxs';

import Vue from 'vue';
import { Dialog } from 'element-ui';
Vue.use(Dialog);

export default {
  name: 'myTicketDetail',

  data () {
    return {
      qrCodeVisible: false,
    }
  },

  mounted() {
  },
  
  methods: {
  }
}

</script>

<style scoped lang="less">
@black1: #303133;
@black2: #606266;
@black3: #909399;
@black4: #C0C4CC;

// 初始化样式
.ticket-detail {
  width: 100%;
  min-height: 100%;
  background: #fff;
  overflow: hidden;
}

// 头部导航栏
.ticket-detail .header {
  padding: 7px 10px 7px 10px;

  .header-main {
    padding-left: 10px;
    font-size: 18px;
    
    div {
      padding-left: 15px;
      border-left: 1px solid #ddd;
      color: @black2;
    }
  }
}

// 券详情
.ticket-detail .ticket-item {
  padding: 15px;
  font-size: 14px;
  color: #fff;

  .item-content {
    position: relative;
  }
  
  .item-backgroud img {
    width: 100%;
    height: 100%;
  }

  .item-top {
    position: absolute;
    top: 0px;
    width: 100%;

    .item-title {
      position: relative;
      display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
      display: -moz-box;     /* 老版本语法: Firefox (buggy) */
      display: -ms-flexbox;  /* 混合版本语法: IE 10 */
      display: -webkit-flex; /* 新版本语法: Chrome 21+ */
      display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */
      justify-content: start;
      align-items: center;
      padding: 5px 15px;

      .title-left {
        font-size: 16px;
      }

      .title-right {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: right;
      }
    }
    
    .item-describe {
      padding: 0px 15px;
    }
  }

  .item-bottom {
    position: absolute;
    bottom: 0px;
    width: 100%;

    .bottom-content {
      display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
      display: -moz-box;     /* 老版本语法: Firefox (buggy) */
      display: -ms-flexbox;  /* 混合版本语法: IE 10 */
      display: -webkit-flex; /* 新版本语法: Chrome 21+ */
      display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */
      justify-content: start;
      align-items: center;
      padding: 15px 15px;

      .bottom-submit {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: right;
      }
    }
  }
}

// 二维码核销
.ticket-detail .el-dialog {
  .dialog-qrcode {
    img {
      display: block;
      padding-bottom: 15px;
      width: 100%;
      height: 100%;
    }

    .close-qrcode {
      position: relative;
      display: block;
      color: #FFFFFF;
      background-color: #1AAD19;
      padding-left: 14px;
      padding-right: 14px;
      box-sizing: border-box;
      font-size: 18px;
      text-align: center;
      text-decoration: none;
      color: #FFFFFF;
      line-height: 2.55555556;
      border-radius: 5px;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      overflow: hidden;
    }
  }
}

// 券详描述
.ticket-detail .ticket-describe {
  padding: 5px 15px 35px;

  .ticket-describe-title {
    padding-bottom: 10px;
    font-size: 16px;
    color: @black1;
    border-bottom: 1px solid #ddd;
  }

  .ticket-describe-main {
    .ticket-describe-item {
      padding-top: 15px;

      .describe-item-title {
        font-size: 16px;
        color: @black1;
        width: 85px;
      }

      .describe-item-content {
        font-size: 14px;
        color: @black2;
      }
    }
  }
}

</style>
