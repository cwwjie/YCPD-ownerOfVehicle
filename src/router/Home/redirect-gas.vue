<!-- 
  - 加油优惠 导航页面 
  -->
<template>
    <div class="redirect-gas">
        <div class="redirect-gas-background"
            :style="`min-height: ${clientWidth * 1573 / 1491}px;`"
        >
            <img alt="navigation-page" src="https://ycpduser.oss-cn-shenzhen.aliyuncs.com/wx20/home/navigation-page.png" />
        </div>
        <div class="redirect-gas-leftover flex-column-center"
            :style="`height: ${clientHeight - (clientWidth * 1573 / 1491)}px;`"
        >
            <div class="gas-leftover-btn">
                <div class="leftover-btn-content flex-column-center"
                    @click="jumpToRefuelGas"
                >
                    <span>加油优惠</span>
                    <label>加油优惠高达1.2元/升</label>
                </div>
            </div>
            <div class="gas-leftover-btn">
                <div class="leftover-btn-content flex-column-center"
                    @click="jumpToEngineGas"
                >
                    <span>机油优惠</span>
                    <label>机油保养5折优惠</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import initLocation from './../../components/initLocation';
import ajaxs from './ajaxs.js';

export default {
    name: 'redirect-gas',

    data () {
        return {
            // 屏幕宽高
            clientWidth: document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth,
            clientHeight: document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight,
        }
    },

    methods: {
        // 加油优惠
        jumpToRefuelGas() {
            const _this = this;
            let openid = this.$store.state.user.openid;
            let info = this.$store.state.user.info;

            // 判断顶部是否存在 openid
            if (!openid) {
                openid = window.localStorage.openid;
            }

            if (!info) { // 表示没有用户信息 请先注册
                window.location.href = `http://${window.location.host}/wx/selectmobile.aspx?openid=${openid}&history=${encodeURIComponent(`http://${window.location.host}/wx20/#/redirect-gas`)}`;
            }

            let gasStationHandler = position => {
                ajaxs.getStationHandler({
                    openid: openid,
                    longitude: position.longitude,
                    latitude: position.latitude,
                }).then(
                    url => {
                        window.location.href = url;
                    },
                    error => {
                        alert(error)
                    }
                )
            }
            
            initLocation(this, true)
            .then(
                position => {
                    gasStationHandler({
                        latitude: position.latitude,
                        longitude: position.longitude
                    });
                }, error => {
                if (_this.$store.state.user.position && _this.$store.state.user.position.state === true) {
                    gasStationHandler({
                        latitude: _this.$store.state.user.position.latitude,
                        longitude: _this.$store.state.user.position.longitude
                    });
                } else {
                    if (
                        window.localStorage && 
                        window.localStorage.longitude &&
                        window.localStorage.latitude
                    ) {
                        gasStationHandler({
                            latitude: window.localStorage.latitude,
                            longitude: window.localStorage.longitude
                        });
                    } else {
                        alert('请打开养车频道公众号-设置-提供定位信息.');
                    }
                }
            });

        },

        // 机油优惠
        jumpToEngineGas() {
            let openid = this.$store.state.user.openid;
            let info = this.$store.state.user.info;

            // 判断顶部是否存在 openid
            if (!openid) {
                openid = window.localStorage.openid;
            }

            if (!info) { // 表示没有用户信息 请先注册
                window.location.href = `http://${window.location.host}/wx/selectmobile.aspx?openid=${openid}&history=${encodeURIComponent(`http://${window.location.host}/wx20/#/redirect-gas`)}`;
            }

            // 判断是否正式环境
            if ( 
                window.location.host === 'store.demo.ichebaoyang.com' || 
                process.env.NODE_ENV === 'development'
            ) { // 测试
                window.location.href = 'http://store.demo.ichebaoyang.com/Merchant/Merchanthome.html?id=180727010001925946';
            } else { // 正式
                window.location.href = 'http://picc.hotgz.com/Merchant/Merchanthome.html?id=180724010002017319';
            }
        }
    }
}

</script>

<style scoped lang="less">

@black1: #303133;
@black2: #606266;
@black3: #909399;
@black4: #C0C4CC;

.redirect-gas {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .redirect-gas-background {
        width: 100%;

        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }

    .redirect-gas-leftover {
        width: 100%;
        background: #fcecd5;

        .gas-leftover-btn {
            width: 80%;
            height: 55px;
            padding-top: 25px;

            .leftover-btn-content {
                height: 55px;
                width: 100%;
                border-radius: 55px;
                color: #fff;
                background: -webkit-linear-gradient(#2ABCFF, #0096F6); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(#2ABCFF, #0096F6); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(#2ABCFF, #0096F6); /* Firefox 3.6 - 15 */
                background: linear-gradient(#2ABCFF, #0096F6); /* 标准的语法 */

                span {
                    padding-top: 5px;
                    font-size: 16px;
                }

                label {
                    font-size: 12px;
                }
            }
        }
    }
}

</style>
