/**
 * 单一状态树 唯一数据源 (SSOT)
 */

let state = {
    openid: false, // 微信对应用户身份的 openid   默认为false
    info: false,   // 用户信息              未登录默认为false

    location: {   // 定位
        state: false,
        latitude: 114,
        longitude: 22.7,
        cityname: '深圳',
    },

    headImageUrl: false, // 用户头像        未获取默认为false

    points: 0, // 用户积分

    VIP: { // VIP会员
        grade: 0,
    },
};

/**
 * 测试环境 重写 state 模拟成功获取真实数据的情况
 * 可以随意修改, 但是一般而言 要注释掉. 因为影响测试环境模拟未登录情况
 */
if (process.env.NODE_ENV === 'development') {
    // state.info = { // 用户信息
    //     Address: "",
    //     Brand: "阿尔法-罗密欧",
    //     CarNo: "粤B00000",
    //     City: "深圳市",
    //     ContactName: "曾杰杰测试账号",
    //     ContactPhone: "1597671287",
    //     Coupons: "2",
    //     CustomerName: "",
    //     CustomerNo: "CNO20180525507102",
    //     IdentityNo: "",
    //     Mobile: "",
    //     Model: "1.8 手动 化油器",
    //     Series: "100",
    //     VinNo: "",
    //     Years: "1992",
    // }
    // state.headImageUrl = 'http://thirdwx.qlogo.cn/mmopen/Q3auHgzwzM5muUMU39cxp5g5mxRbr2JY0HSFeyJYHfIIIUAOib3vF6Av729SKDicia4UC1VHepbG9iah3YC6pJBn6YEaJ7PbROx5piahmDhPIicAk/132'; // 头像
    // state.points = 150; // 积分
    // state.VIP = { // 会员
    //     grade: 1,
    // }
}

export default state
