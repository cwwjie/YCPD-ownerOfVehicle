<template>
    <div>
        <div></div>
    </div>
</template>
<script>
import initLocation from "./../../components/initLocation";
import RequestedURL from './../../config/RequestedURL.js'; //导入链接
import ajaxs from "./ajaxs.js";
    export default {
        data() {
            return {

            }
        },
        created(){
             let openid = window.localStorage.openid
              initLocation(this, true)
                    .then(
                        position => {
                            console.log(window.location.href)
                            $.ajax({
                                url:RequestedURL.getStationHandler,
                                type: "post",
                                data: {
                                action: "GetMembercard",
                                lattude: position.latitude,
                                lontude: position.longitude,
                                openid: openid
                                },
                                success: function(datas) {
                                    console.log(datas)
                                         window.location.href = datas.Url;
                                    if(datas.Url == "") {
                                        window.location.href = `http://${window.location.host}/wx20/index.html?code=071Y9Xqm1K4fvj0Qydom1iD4rm1Y9XqF&state=1#/`
                                    }                                      
                                }
                            });
                        
                        }
                    );
        },

         
     
        methods:{
           
        }
    }
</script>
