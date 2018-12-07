<template>
  <router-view/>
</template>

<script>

// 配置文件类
import RequestedURL from '@/config/RequestedURL.js';
import config from '@/config';
// 组件类
import loadPageVar from '@/utils/loadPageVar.js';
import html5WxBMapLocation from '@/components/html5WxBMapLocation.js';

export default {
    name: 'Index',

    mounted() {
        /**
         * 判断是否 包含 /redirect/路径
         * 如果 rul 下 包含 /redirect/ (重定向) 这个字符串的话
         * 是不需要获取openid 和定位这些操作的
         * 因为 这样会导致后台请求 code 被重复使用的报错发生
         */
        if (window.location.href.indexOf('/redirect/') !== -1) {
            return false;
        }

        // 这里获取一次定位 因为有地方会用到
        html5WxBMapLocation(this);

        /**
         * 判断是否测试环境
         * 因为 测试环境的初始化 和 生产环境的初始化 是有一定的区别的
         */
        if (process.env.NODE_ENV === 'development') {
            
            this.initDevOpenid(); // 测试
        } else {

            this.initProOpenid(); // 生产 正式
        }
    },

    methods: {
        /**
         * 测试环境
         */
        initDevOpenid() {
            let loadPageOpenid = loadPageVar('openid');      // url解析openid

            /**
             * 判断 是否存在 url解析openid
             * url解析openid 是因为有 测试的需求
             * 当有这个需求的时候 我们就虚要绕过正常流程
             * 所以需要进行判断 url解析openid
             */
            if (loadPageOpenid && loadPageOpenid.length > 15) {

                this.$store.commit('initOpenid', loadPageOpenid); // 存储 vuex  因为 getuserinfo 会失败, 可能不会被 commit 进去 所以在此初始化 openid

                this.saveOpenid(loadPageOpenid); // 存储 openid
                this.initUserInfor(loadPageOpenid);

            // 测试环境不存在 url解析openid 的情况
            } else {
                
                // 判断是不是本地环境, 如果是 本地开发环境 使用 localStorage 的缓存
                if (window.location.hostname === 'localhost') {

                    /**
                     * 判断 openid 合法性
                     * 因为有一次出现了 undefined 的情况 而继续使用undefined去请求后台 这个是不符合规范的 所以需要判断openid 合法性
                     * 正确合法的 openid 的长度为 20 
                     * 这里判断openid合法性的方式是 判断长度是否大于 15
                     */
                    if (window.localStorage && window.localStorage.openid && window.localStorage.openid.length > 15) { // 本地openid

                        // 如果 本地缓存 存在 openid 并且 openid 是 合法的 
                        // 则存储 vuex
                        this.$store.commit('initOpenid', window.localStorage.openid); // 存储 vuex
                        this.initUserInfor(window.localStorage.openid); // 同时初始化用户信息

                    // 本地缓存 不存在 openid 的情况下
                    } else {
                        alert('本地环境开发，不存在openid，请初始化一次openid');
                    }

                // 如果 不是本地开发环境 那表示一定时 测试环境
                } else {

                    // 正式环境 走正式环境的请求方法
                    // 因为测试环境是模拟正式环境的
                    this.initProOpenid();

                }
            }
        },

        /**
         * 生产环境
         */
        initProOpenid() {
            const _this = this;
            let loadPageCode = loadPageVar('code');     // url 解析 code

            /**
             * 错误处理 的方法
             * 通过 code 获取 openid 失败的情况
             */
            let errorHandle = error => {
                // 通过 code 获取 openid 失败的 次数 模板
                let errorCount = {
                    count: 1, // 默认的 次数是 一次
                    expire: (new Date().getTime() + (1000 * 60 * 60 * 24)), // 过期的时间 是明天过期 
                }

                let getOpenidByCode = window.localStorage.getOpenidByCode ? JSON.parse(window.localStorage.getOpenidByCode) : errorCount;
                
                // 先判断 通过 code 获取 openid 失败的 次数 是否过期
                if ( new Date().getTime() > getOpenidByCode.expire) {
                    
                    // 通过 code 获取 openid 失败的 次数过期的情况 
                    // 表示是今天 第一次 通过 code 获取 openid 失败
                    // 存储 这个状态 并且 跳转 养车频道 重新获取 code
                    window.localStorage.setItem('getOpenidByCode', JSON.stringify(errorCount));
                    window.location.href = config.YcpdUrlWidthWxCode();
                } else {

                    // 未过期的情况
                    // 先判断 通过 code 获取 openid 失败的 次数 是否超过 3次
                    if (getOpenidByCode.count >= 3) {
                        // 大于 3 次 都通过 code 获取 openid 失败，则弹出报错信息
                        alert(error);
                    } else {
                        // 通过 code 获取 openid 失败 次数 未超过 3 次
                        getOpenidByCode.count++; // 次数加一
                        window.localStorage.setItem('getOpenidByCode', JSON.stringify(getOpenidByCode)); // 存储状态
                        window.location.href = config.YcpdUrlWidthWxCode(); // 重新获取 code
                    }
                }
            }

            /**
             * 先判断 是否存在 code
             */
            if (loadPageCode) {
                // 如果存在 code 则进行一次 openid 的交换
                this.$store.dispatch('getOpenidCode', loadPageCode) // 交换 openid
                .then(res => {

                    // 判断状态码 是否为1
                    if (res.code === 1) {
                        _this.saveOpenid(res.openid);
                        _this.initUserInfor(res.openid);

                    // 如果状态码为 2 表示状态码已被使用过
                    } else if (res.code === 2) {
                        // 重新跳转一次获取 code
                        window.location.href = config.YcpdUrlWidthWxCode();

                    }

                // 通过 code 获取 openid 失败的情况
                }, error => errorHandle(error));

            } else {
                // 不存在 code, 重新跳转一次获取 code
                window.location.href = config.YcpdUrlWidthWxCode();
            }
        },

        /**
         * 本地存储 openid 并且存储到 vuex
         * @param {string} openid openid
         */
        saveOpenid(openid) {
            this.$store.commit('initOpenid', openid); // 存储 vuex

            if (window.localStorage) { // 兼容
                window.localStorage.setItem('openid', openid);
            }
        },

        /**
         * 初始化 用户信息
         * @param {string} openid openid
         */
        initUserInfor: function initUserInfor(openid) {
            const _this = this;

            this.$store.dispatch('getUserInfor', openid)
            .then(val => {
                _this.initHeadImage(openid); // 获取 用户头像

            }, error => console.error(error));
        },

        /**
         * 获取 用户 头像
         * @param {string} openid openid
         */
        initHeadImage(openid) {
            this.$store.dispatch('getHeadImageUrl', openid) // 通过 openid 获取 用户头像
            .then({}, // 获取头像成功 不做任何操作
            error => console.error('获取 用户 头像失败, 原因:' + error) // 失败 打印错误信息
            );
        }
    },
}

</script>

<style lang="less">

// 这里是存放全局样式的地方
@import '~vux/src/styles/reset.less'; // vux 初始化样式

// 禁止使用 iframe 防止广告弹出
iframe { display: none !important; }

</style>
