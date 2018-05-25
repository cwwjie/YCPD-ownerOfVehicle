/**
 * store 中的 state 中派生出一些状态
 * 目标是保持 state 的纯净
 */
export default {
    /**
     * 获取用户信息 如果未登录 则设置为false
     */
    getLoginIofor(states) {
        let loginIofor = false;

        if (states.info) { // 已登录
            loginIofor = states.info;

            if (states.headImageUrl) { // 并且成功获取到头像
                loginIofor.headImageUrl = states.headImageUrl;
            } else {
                loginIofor.headImageUrl = false;
            }
        }

        return loginIofor;
    },
};
