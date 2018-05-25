/**
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
 */
export default {
    initOpenid (states, obj) { // 初始化 openid
        states.openid = obj.openid;
    },

    initUserInfo (states, obj) { // 初始化 登录信息
        states.info = obj.userInfo;
    },

    initHeadImageUrl (states, headImageUrl) { // 初始化 用户头像
        states.headImageUrl = headImageUrl;
    }
}
