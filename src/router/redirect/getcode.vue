<!-- 获取 openid 页面, 暂时未用上  -->
<template>
    <div class="getcode">
    </div>
</template>

<script>

import { Indicator } from 'mint-ui';

export default {
    name: "getcode",

    data() {
        return {}
    },

	mounted: function mounted() {
        Indicator.open('正在跳转...'); // 弹出加载框

        // 测试环境的 appid
        let appid = (window.location.host === 'store.demo.icheboayang.com') ? 'wxa21f56d22d9482b1' : 'wx69b29a9a280c57d9';

        this.jumpwx(`http://${window.location.host}/wx20/index.html#/redirect/gas/preview`, appid);
    },

    destroyed: function () {
        Indicator.close(); // 关闭加载框
    },

    methods: {

        /**
         * 跳转到微信 url 地址复用的方法
         * @param {string} redirect_uri 需要加密的URL
         * @param {string} appid 需要加密的URL
         */
        jumpwx: function jumpwx(redirect_uri, appid) {
            return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${window.encodeURIComponent(redirect_uri)}&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect`
        },
    }
};
</script>

<style scoped lang="less">
@black1: #303133;
@black2: #606266;
@black3: #909399;
@black4: #c0c4cc;
</style>
