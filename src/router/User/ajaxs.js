import axios from 'axios';

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
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: RequestedURL.getApointment,
                data: {
                    PageSize: pageSize ? pageSize : 100,
                    PageIndex: pageIndex ? pageIndex : 1,
                    Obj: {
                        OpenID: openid,
                        Status: status
                    }
                }
            })
            .then(function (response) {
                if (
                    response.data && 
                    response.data.Code && 
                    response.data.Code === 200 && 
                    response.data.Data
                ) {
                    resolve(response.data.Data)
                } else {
                    reject(`向服务器获预约记录发生错误!, 原因: ${JSON.stringify(response)}`);
                }
            })
            .catch(function (error) {
                reject(`向服务器获预约记录发生错误!, 原因: ${error}`);
            });
        });
    },
}

export default ajaxs;
