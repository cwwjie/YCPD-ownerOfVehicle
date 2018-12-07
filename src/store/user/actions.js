/**
 * Action 类似于 mutation
 * Action 可以包含任意异步操作。
 */
import RequestedURL from './../../config/RequestedURL';

let actions = {
    /**
     * 通过 openid 获取 用户信息的方法
     * @param {string} param openid
     * @return {Promise} resolve(userInfo) reject(error)
     */
    getUserInfor: ({commit}, param) => {
        return new Promise((resolve, reject) => {
            fetch(`${RequestedURL.getUserInfor}?OpenID=${param}`, {
                'method': 'POST',
                'contentType': "application/json; charset=utf-8"
            }).then(
                response => response.json(),
                error => error
            ).then(val => {
                if (val.Code === 200 && val.Data) { // 获取成功 并且数据存在的情况下
                    commit('initUserInfo', {userInfo: val.Data}); // 初始化 登录信息 传入到 mutations 里面
                    resolve(val.Data);
                } else {
                    reject(`向服务器获取用户信息成功, 但是数据有误. 原因:${JSON.stringify(val)}`);
                }
            })
            .catch(error => reject(`向服务器获取用户信息发生错误!, 原因: ${error}`));
        });
    },

    /**
     * 通过 openid 获取 用户信息的头像
     * @param {string} param openid
     * @return {Promise} resolve(headImageUrl) reject(error)
     */
    getHeadImageUrl: ({commit}, param) => {
        return new Promise((resolve, reject) => {
            fetch(`${RequestedURL.getHeadImageUrl}?Type=1&OpenID=${param}`, {
                'method': 'GET',
                'contentType': "text/html; charset=utf-8"
            }).then(
                response => response.text(),
                error => error
            ).then(headImageUrl => {
                // 判空
                if (headImageUrl) {
                    commit('initHeadImageUrl', headImageUrl); // 初始化 登录信息 传入到 mutations 里面
                    resolve(headImageUrl);

                } else {

                    reject('向服务器获用户信息的头像成功, 但是头像不存在');
                }
            })
            .catch(error => reject(`向服务器获用户信息的头像发生错误！ 原因:${error}`));
        });
    },
    
    /**
     * 获取 用于交换 openid 的 code 方法
     * @param {string} param code
     */
    getOpenidCode: ({commit}, param) => {
        return new Promise((resolve, reject) => {
            fetch(`${RequestedURL.getOpenidCode}?action=GetOpenID&code=${param}`, {
                'method': 'GET',
                'contentType': "application/json; charset=utf-8"
            }).then(
                response => response.json(),
                error => error
            ).then(val => {
                // 判断 code 是否被使用
                if (val && val.msg && val.msg === 'code已被使用') {
                    // 如果 code 被使用了 返个状态码 2
                    return resolve({
                        code: 2, 
                        openid: null
                    });
                }

                // 判空 并且 校验openid的合法性
                if (val && val.OpenID && val.OpenID.length > 15) {
                    resolve({
                        code: 1,
                        openid: val.OpenID
                    });

                } else {

                    reject(`向服务器获用于交换 openid 的 code 有错误！ 原因:${JSON.stringify(val)}`);
                }
            })
            .catch(error => reject(`向服务器获用于交换 openid 的 code 发生错误！ 原因:${error}`));
        });
    },
}

export default actions
