/**
 * 下面的 配置文件 是 很久之前写的 不够规范
 */

// 真实环境跳转链接
let RedirectRUL = {
    host: 'http://picc.hotgz.com',
}

/**
 * 测试环境 重写 RedirectRUL
 * 测试环境有时候需要重写方法, 方便测试, 生产环境不会执行下面方法
 * 此方法可以随意改动，
 */
if (process.env.NODE_ENV === 'development') {
    RedirectRUL.host = 'http://shzj.demo.hotgz.com';
}

export default RedirectRUL;
