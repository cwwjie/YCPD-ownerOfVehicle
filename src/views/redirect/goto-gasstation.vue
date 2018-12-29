<!-- 分润系统 跳转到优惠加油 -->
<template>
<div class="goto-gasstation">
</div>
</template>

<script>
// 组件类
import html5WxBMapLocation from "@/components/html5WxBMapLocation";
import loadPageVar from '@/utils/loadPageVar.js';
// 配置类
import config from "@/config/index";
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
            const _this = this;
            let loadPageCode = loadPageVar('code'); 

            /**
             * 获取微信 code 的 url 链接, 并且跳转
             */
            let getWxCodeUrl = () => {
                // 判断是否生产环境
                let appid = 'wxa21f56d22d9482b1';
                if (window.location.origin === 'http://picc.hotgz.com') {
                    appid = 'wx69b29a9a280c57d9';
                }

                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${window.encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect`;
            }

            /**
             * 【第三步】 获取优惠加油的链接
             */
            let getStationHandler = position => {
                $.ajax({
                    url: RequestedURL.getStationHandler,
                    type: "post",
                    data: {
                        action: "GetStation",
                        lattude: position.latitude,
                        lontude: position.longitude,
                        openid: window.localStorage.openid
                    },
                    success: function success(datas) {
                        if (datas.Msg) {
                            alert(datas.Msg);
                            window.history.back(-1);
                        } else {
                            window.location.href = datas.Url;

                        }
                    }, 
                    error: function error() {
                        alert('获取优惠加油的链接失败');
                        window.history.back(-1);
                    }, 
                });
            }

            /**
             * 【第一步】 通过 openid 获取用户信息
             */
            let getUserInfor = openid => {
                _this.$store.dispatch('getUserInfor', openid)
                .then(val => {
                    // 如果有用户信息 表示用户已经注册

                    /**
                     * 【第二步】 获取定位
                     */
                    html5WxBMapLocation(_this, true)
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
                    // 如果如果没有用户信息，表示用户未注册，跳转到养车频道注册页面
                    window.location.href = `http://${ window.location.host }/wx20/register/index.html#/index/${ window.localStorage.openid }/`;
                });
            }

            /**
             * 判断 openid 合法性
             */
            if (window.localStorage && window.localStorage.openid && window.localStorage.openid.length > 15) { // 存在并且合法
                getUserInfor(window.localStorage.openid);

            } else { // 不存在 openid

                // 判断 code
                if (!loadPageCode) {
                    // 不存在 code
                    return getWxCodeUrl(); // 获取微信 code 的 url 链接, 并且跳转
                }

                // 存在 code 获取 openid
                this.$store.dispatch('getOpenidCode', loadPageCode)
                .then(res => {

                    // 判断 获取 openid 状态码，是否为1，为1的情况下是成功的
                    if (res.code === 1) {
                        // 成功获取 openid 
                        window.localStorage.openid = res.openid;
                        getUserInfor(res.openid); // 通过 openid 获取用户信息

                    } else if (res.code === 2) {
                        // 如果状态码为 2 表示状态码已被使用过
                        getWxCodeUrl(); // 获取微信 code 的 url 链接, 并且跳转

                    } else {
                        getWxCodeUrl(); // 其他情况也跳转吧, 如果出现无限跳转的情况下, 那是不可控的问题

                    }

                }, error => {
                    // 出错的情况下, 也是不可控的问题, 直接报出来错误
                    alert(`请求换取openid失败! 原因: ${error}`);
                    window.history.back(-1);

                });
            }
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
