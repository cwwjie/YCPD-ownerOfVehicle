import axios from 'axios';

import RequestedURL from './../../config/RequestedURL.js';

const ajaxs = {
    /**
     * 获取城市
     * @param {boolean} isHot 是否热门城市
     * @return {Promise} resolve({ // 城市列表
     *   Group: "A",
     *   List: [
     *     ID: "180613010000526126"
     *     Name: "安庆"
     *   ],
     * }) reject(error)
     * @return {Promise} resolve([ // 热门城市
     *   {
     *     ID: "151215010000000015",
     *     Name: "广州",
     *   }
     * ]) reject(error)
     */
    getCity: isHot => {
        let cityAction = isHot ? 'GetHotCity' : 'GetCity';
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: `${RequestedURL.getCity}?action=${cityAction}`
            })
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                reject(`向服务器获取城市发生错误!, 原因: ${error}`);
            });
        });
    },
}

export default ajaxs;
