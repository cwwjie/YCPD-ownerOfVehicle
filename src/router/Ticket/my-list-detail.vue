<!-- 
  - 购买券列表 
  -->
<template>
  <div class="ticket-list">
  </div>
</template>

<script>

import ajaxs from './ajaxs';

export default {
  name: 'myTicketListDetail',

  data () {
    return {
    }
  },

  mounted() {
  },
  
  methods: {
  }
}

</script>

<style scoped lang="less">

// 初始化样式
.ticket-list {
  width: 100%;
  min-height: 100%;
  background: #efefef;
  overflow: hidden;
}

// 头部导航栏
.ticket-list .mint-header {
  background: #d00;
  margin-bottom: 15px;
}

// 顶部选项卡
.ticket-list .mint-navbar {
  position: relative;
  z-index: 2;

  .mint-tab-item-label {
    font-size: 16px;
  }

  .is-selected {
    border-bottom: 3px solid #F56C6C;
    color: #F56C6C;
    text-decoration: none;
  }
}

// 显示面板
.ticket-list .mint-tab-container {
  position: relative;
  top: 1px;

  .order-list {
    background: #fff;
    padding-top: 15px;

    .order-item {
        padding: 0px 15px 15px 15px;
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
  }

  .order-none {
    padding: 15px;
    text-align: center;
    font-size: 14px;
    color: #606266;
  }
}

</style>
