<!-- 跳转到优惠加油 -->
<template>
<div class="goto-gasstation">
</div>
</template>

<script>
// 组件类
import getOpenid from "@/components/getOpenid";
import html5WxBMapLocation from "@/components/html5WxBMapLocation";
// 配置类
import RequestedURL from "@/config/RequestedURL";

export default {
    name: 'goto-gasstation',

	data: function data() { 
        return {
            clientWidth: document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth, // 设备的宽度
            clientHeight: document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight, // 设备高度
        }
    },

	mounted: function mounted() {
        this.jumpRedirectUrl();
    },

	methods: {
        /**
         * 跳转到优惠加油的链接
         */
        jumpRedirectUrl: function jumpRedirectUrl() {
            let openid = window.localStorage.openid;

            /**
             * 【第三步】 获取优惠加油的链接
             */
            let getStationHandler = position => {
                $.ajax({
                    url: RequestedURL.getStationHandler,
                    type: "post",
                    data: {
                        action: "GetMembercard",
                        lattude: position.latitude,
                        lontude: position.longitude,
                        openid: openid
                    },
                    success: function success(datas) {
                        window.location.href = datas.Url;
                    }, 
                    error: function error() {
                        alert('获取优惠加油的链接失败');
                        window.history.back(-1);
                    }, 
                });
            }

            /**
             * 【第一步】 获取 openid
             */
            getOpenid(this)
            .then(res => {
                openid = res;

                /**
                 * 【第二步】 获取定位
                 */
                html5WxBMapLocation(this, true)
                .then(position => {
                    getStationHandler(position);
                }, error => {
                    // 使用缓存的位置信息
                    getStationHandler({
                        lattude: window.localStorage.latitude ? window.localStorage.latitude : 114,
                        lontude: window.localStorage.longitude ? window.localStorage.longitude : 22.7,
                    });
                });
            }, error => {
                alert('不存在openid');
                window.history.back(-1);
            });
        },
    }
}

</script>

<style scoped lang="less">
@black1: #303133;
@black2: #606266;
@black3: #909399;
@black4: #C0C4CC;

.goto-gasstation {
    position: relative;
    font-size: 14px;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}

</style>
