import loadPageVar from '@/utils/loadPageVar.js';

/**
 * 获取openid的方法
 */
let getOpenid = self => new Promise((resolve, reject) => {
    // url 解析 code
    let loadPageCode = loadPageVar('code');         
    // 使用本地缓存的 opneid
    let openid = window.localStorage.openid;

    // 判断是否 存在 本地缓存 openid
    if (openid) {
        return resolve(openid);
    }

    // 判断 url 是否没有 code 参数
    if (!loadPageCode) {
        // 如果 连 url 也没有 code 那么 openid 是无法获取的
        return reject('无法获取openid!');
    }

    // 通过 url 的 code 向后台 换取 openid
    self.$store.dispatch('getOpenidCode', loadPageCode)
    .then(openid => {
        resolve(openid);
    }, error => {
        reject(`请求换取openid失败! 原因: ${error}`);
    });
});

export default getOpenid;
