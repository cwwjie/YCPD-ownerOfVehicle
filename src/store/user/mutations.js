/**
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
 */
export default {
    initOpenid (states, openid) { // openid
        states.openid = openid;
    },

    initLocation (states, position) { // 初始化定位
        states.position = position;
    },

    updateCityname (states, cityname) { // 更新所在城市
        let newPosition = JSON.parse(JSON.stringify(states.position));
        newPosition.cityname = cityname;
        states.position = newPosition;
    },

    initUserInfo (states, obj) { // 登录信息
        states.info = obj.userInfo;
    },

    initHeadImageUrl (states, headImageUrl) { // 用户头像
        states.headImageUrl = headImageUrl;
    }
}
