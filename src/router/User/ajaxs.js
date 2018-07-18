import RequestedURL from './../../config/RequestedURL.js';

const ajaxs = {
    /**
     * 预约记录
     * @param {string} openid 必填
     * @param {string} status 必填 全部:-1,待支付:0,已预约:1已评价:2,已结算:3
     * @param {number} pageIndex 分页下标
     * @param {number} pageSize 分页
     * @return {Promise} resolve(apointment) reject(error)
     */
    getApointment: (openid, status, pageIndex, pageSize) => {
        // {
        //     Code: 200,
        //     Data: {
        //         List: [
        //             {
        //                 BookDate: "2018-06-02",
        //                 BookID: "180601010001477947",
        //                 BookTime: "08：00 - 10：00",
        //                 Brand: "现代",
        //                 CarNo: "粤B7E3N0",
        //                 IsMatch: "未扫码",
        //                 Model: "1.4 手动 TOP 顶级型",
        //                 Series: "瑞纳",
        //                 ServiceName: "（平安）购车险送保养预约（矿物油）",
        //                 Status: "已预约",
        //                 StoreName: "深南汽车服务中心",
        //                 UserName: "",
        //                 Volume: 3.3,
        //                 Years: "2014",
        //             }
        //         ],
        //         TotalRecord: 0,
        //     },
        //     List: [],
        //     TotalRecord: 0,
        //     Msg: ""
        // } 
        return new Promise((resolve, reject) => {
            var model = new Object();
                model.PageIndex = 1;
                model.PageSize = 100;
                model.Obj = new Object();
                model.Obj.Status = status;
                model.Obj.OpenID = openid;

            $.ajax({
                url: `${RequestedURL.getApointment}`,
                type: "post",
                contentType : "application/json",  
                dataType : "json", 
                data: JSON.stringify(model),
                success(response) {
                    if (
                        response && 
                        response.Code && 
                        response.Code === 200 && 
                        response.Data
                    ) {
                        resolve(response.Data)
                    } else {
                        reject(`向服务器获预约记录发生错误!, 原因: ${JSON.stringify(response)}`);
                    }
                },
                error(error) {
                    reject(`向服务器获预约记录发生错误!, 原因: ${error}`);
                }
            });
        });
    },
}

export default ajaxs;
