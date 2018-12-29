/**
 * 获取openid
 */
import loadPageVar from '@/utils/loadPageVar.js';
// 配置类
import config from "@/config/index";

/**
 * 获取微信 code 的 url 链接
 */
let getWxCodeUrl = url => new Promise((resolve, reject) => {
    $.ajax({
        url: `${config.origin.api}/Weixin/AuthorizeUrl?directUrl=${url}`,
        type: "get",
        success: function success(res) {
            if (res && res.Data && res.Data.directurl) {
                resolve(res.Data.directurl);

            } else {
                reject(`获取微信 code 的 url 链接失败, 原因: ${res.Msg}`);

            }
        }, 
        error: function error() {
            reject('获取微信 code 的 url 链接失败, 原因请求失效.');
        },
    });
})

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
        return getWxCodeUrl(window.location.href)
        .then(
            directurl => window.location.href = directurl,
            error => reject()
        );
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
