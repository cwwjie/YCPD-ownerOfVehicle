/**
 * Action 类似于 mutation
 * Action 可以包含任意异步操作。
 */
import RequestedURL from './../../config/RequestedURL';
import config from './../../config';

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
     * @param {string} openid openid
     */
    getHeadImageUrl: ({commit}, openid) => {
        return new Promise((resolve, reject) => {
            fetch(`${config.origin.api}/Weixin/GetHeadImageUrl?openid=${openid}`, {
                'method': 'GET',
                'contentType': "text/html; charset=utf-8"
            }).then(
                response => response.json(),
                error => error
            ).then(res => {
                // 判空
                if (res && res.Data && res.Data.headimgurl) {
                    commit('initHeadImageUrl', res.Data.headimgurl); // 初始化 登录信息 传入到 mutations 里面
                    resolve(res.Data.headimgurl);

                } else {

                    reject('向服务器获用户信息的头像成功, 但是头像不存在');
                }
            })
            .catch(error => reject(`向服务器获用户信息的头像发生错误！ 原因:${error}`));
        });
    },
    
    /**
     * 通过code 交换 openid
     * @param {string} code code
     */
    getOpenidCode: ({commit}, code) => {
        return new Promise((resolve, reject) => {
            fetch(`${config.origin.api}/Weixin/Get_WxOpenID?code=${code}`, {
                'method': 'GET',
                'contentType': "application/json; charset=utf-8"
            }).then(
                response => response.json(),
                error => error
            ).then(val => {
                // 判断 code 是否被使用
                if (val.Code === 202) {
                    return resolve({
                        code: 2, 
                        openid: null
                    });
                }

                // 判空 并且 校验openid的合法性
                if (val && val.Data.OpenID && val.Data.OpenID.length > 15) {
                    resolve({
                        code: 1,
                        openid: val.Data.OpenID
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
