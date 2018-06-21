/**
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
 */
export default {
    initOpenid (states, openid) { // openid
        states.openid = openid;
    },

    initLocation (states, location) { // location
        states.location = location;
    },

    initUserInfo (states, obj) { // 登录信息
        states.info = obj.userInfo;
    },

    initHeadImageUrl (states, headImageUrl) { // 用户头像
        states.headImageUrl = headImageUrl;
    }
}
