<template>
    <div><div></div></div>
</template>
<script>
import initLocation from "@/components/initLocation";
import RequestedURL from "@/config/RequestedURL.js"; // 导入链接
import ajaxs from "./ajaxs.js";

export default {
    data() {
        return {};
    },

    created() {
        const _this = this;
        let openid = window.localStorage.openid;

        initLocation(this, true).then(position => {
            console.log(window.location.href);
            $.ajax({
            url: RequestedURL.getStationHandler,
            type: "post",
            data: {
                action: "GetMembercard",
                lattude: position.latitude,
                lontude: position.longitude,
                openid: openid
            },
            success: function(datas) {
                console.log(datas);

                _this.$store.dispatch("getUserInfor", openid).then(
                    val => {
                        // 获取用户信息成功
                        window.location.href = datas.Url;
                    },
                    error => {
                        // 成功获取用户信息失败
                        window.location.href = `http://${window.location.host}/wx/selectmobile.aspx?openid=${openid}&history=http://${window.location.host}/wx20/index.html`;
                    }
                );
            }
            });
        });
    },

    methods: {}
};
</script>
