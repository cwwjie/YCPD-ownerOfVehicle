<template>
    <div id="cardInfo">
        <div id="main">
            <div id="header">
                <div class="top">
                    <img class="icon" src="../../assets/img/5.jpg">
                    <span>深圳百店通用精致洗车券深圳</span>
                    <span>有效期 : 2018.07.01-2018.12.31</span>
                    <img class="arrow" src="../../assets/img/icon_arrow@2x.png">
                </div>
                <div class="bottom">
                    <img src="../../assets/img/印章@2x.png">
                   <p>核销码：6661 2616 3322 2112</p>
                </div>
            </div>
            <!-- 门店信息 -->
            <div id="shopInfo">
                <p class="allShop">
                    <span>使用时间：2018.07.01 12:34:56</span>
                </p>
                <div class="address">
                    <P>中国和谐控股豪华汽车维修中心（清龙路店）</P>
                    <P>6.10km 离我最近</P>
                    <P>
                        <img src="../../assets/img/icon_position02@2x.png">
                        <span>深圳市龙华新区清龙路原彬峰桂工业和深圳市龙华新区清</span>
                    </P>
                    <!-- <img class="call" src="../../assets/img/icon_call@3x.png"> -->
                    <!-- <p class="solid"></p> -->
                </div>
            </div>
            <!-- 已使用模块 -->
            <div v-if="this.$route.query.type" id="used">
                 <!-- 评分 -->
                <div id="score">
                    <p>
                        <span>评分 </span>
                        <img v-for="index in 3" src="../../assets/img/icon_star01@2x.png" alt=""><img v-for="INDEX in 5-3" src="../../assets/img/icon_star02@2x.png" alt="">
                    </p>
                    <p>
                        服务很细致，态度好，环境好。服务很细致，态度好，环境好。服务很细致，态度好，环境好。服务很细致，态度好，环境好。
                    </p>
                </div>
                <!-- 服务介绍 -->
                <div id="introduce">
                    <p>服务内容</p>
                    <p>
                        <a>消费介绍</a>
                        <span> • 仅限XXXXXXXX消费</span>
                        <span> • 仅限XXXXXXXX消费</span>
                        <span> • 仅限XXXXXXXX消费</span>
                        <span> • 仅限XXXXXXXX消费</span>
                        
                    </p>
                </div>
                <!-- 订单信息 -->
                <div id="order">
                    <p>订单信息</p>
                    <p>
                        领取渠道 : <span>积分兑换</span>
                    </p>
                    <p>
                        消耗积分：<span>2555555</span>
                    </p>
                    <p>
                        购买时间：<span>2018-07-01 15:30:59</span>
                    </p>
                </div>
                <div class="space"></div>
            </div>
            <!-- 编辑评论 -->
            <div v-if="!this.$route.query.type" id="comment">
                <p>评分</p>
                <p>
                  <img v-for="(item,index) in imgData" :key="index" @click="redStar(index)" :src="item.active?require('../../assets/img/icon_star03@2x.png'):item.src">
                </p>
                <p>
                  <span v-for="(item,index) in comment" :key="index" @click="item.active=!item.active,change(index)"  :class="[item.active?'bgcColor':'']">{{item.name}}</span>
                </p>
                <textarea v-model="commentTxt" name="commentTxt" maxlength="300" id="" cols="10" rows="10" placeholder="请输入评价内容,300字以内"></textarea>
                <p  v-show="commentTxt==''&&!isChange">确定</p>
                <p v-show="commentTxt!==''||isChange==true">确定</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      imgData: [
        { src: require("../../assets/img/icon_star04@2x.png"), active: true },
        { src: require("../../assets/img/icon_star04@2x.png"), active: false },
        { src: require("../../assets/img/icon_star04@2x.png"), active: false },
        { src: require("../../assets/img/icon_star04@2x.png"), active: false },
        { src: require("../../assets/img/icon_star04@2x.png"), active: false }
      ],
      comment: [
        { name: "服务专业", active: false },
        { name: "服务专业", active: false },
        { name: "服务专业", active: false }
      ],
      commentTxt: "",
      isChange: false
    };
  },
  created() {},
  methods: {
    goShopList() {
      this.$router.push({
        path: "/card/shopList"
      });
    },
    redStar(index) {
      let data = this.imgData;
      for (let i = 0; i < data.length; i++) {
        if (i == index) {
          data[i].active = true;
          if (data[4].active == true) {
            data[0].active = true;
            data[1].active = true;
            data[2].active = true;
            data[3].active = true;
          }
          if (data[3].active == true) {
            data[0].active = true;
            data[1].active = true;
            data[2].active = true;
          }
          if (data[2].active == true) {
            data[0].active = true;
            data[1].active = true;
          }
          if (data[1].active == true) {
            data[0].active = true;
          }
        } else {
          data[i].active = false;
        }
      }
    },
     change(index) {
      let data = this.comment;
      for (let i = 0; i < data.length; i++) {
          console.log(data[i].active)
          if(data[i].active ==true){
           this.isChange = true
          }
          if(data[0].active==false&&data[1].active==false&&data[2].active==false) {
            this.isChange = false
          }
      }
    }
  }
};
</script>
<style lang="less" scoped>
#cardInfo {
  background-color: #f5f5f5;
}
#main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 10px;
  #header {
    width: 95%;
    height: auto;
    margin: 0 auto;
    border-radius: 5px;
    position: relative;
    .top {
      background-color: #fff;
      width: 100%;
      height: 113px;
      padding: 20px 15px 0px 15px;
      box-sizing: border-box;
      border-bottom: 1px dotted #ddd;
      border-radius: 5px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      position: relative;
      .icon {
        width: 90px;
        height: 62px;
        float: left;
        margin-right: 10px;
      }
      .arrow {
        position: absolute;
        width: 14px;
        height: 12px;
        top: 40px;
        right: 15px;
      }
      span {
        display: block;
        float: left;
        color: #333;
        font-size: 14px;
        width: 50%;
      }
      span:nth-child(2) {
        font-weight: bold;
        height: 45px;
        overflow: hidden;
      }
      span:nth-child(3) {
        color: #cccccc;
        font-size: 12px;
        width: 74%;
      }
    }
    .bottom {
      width: 100%;
      background-color: #fff;
      padding-top: 30px;
      padding-bottom: 30px;
      border-radius: 5px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      img {
        width: 60px;
        height: 60px;
        position: absolute;
        right: 20px;
        top: 35%;
      }
      p:nth-child(2) {
        width: 80%;
        background-color: #f0f0f0;
        height: 40px;
        line-height: 40px;
        margin: 0 auto;
        text-align: center;
        border-radius: 5px;
        color: #aaaaaa;
      }
    }
  }
  #shopInfo {
    width: 100%;
    margin-top: 5px;
    background-color: #fff;
    padding: 0px 15px;
    box-sizing: border-box;
    .allShop {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      border-bottom: 1px solid #ddd;
      span:first-child {
        color: #666;
      }
      span:nth-child(2) {
        color: #ff8d18;
        float: right;
      }
      img {
        width: 14px;
        height: 14px;
        // float:right;
        vertical-align: middle;
        margin-top: -2px;
      }
    }
    .address {
      position: relative;
      width: 100%;
      padding: 10px 0px;
      p:nth-child(1) {
        height: 25px;
        font-size: 14px;
        width: 90%;
        overflow: hidden;
      }
      p:nth-child(2) {
        color: #808080;
        font-size: 12px;
      }
      p:nth-child(3) {
        img {
          width: 16px;
          height: 16px;
          float: left;
          margin-top: 10px;
          margin-right: 10px;
        }
        span {
          display: table-cell;
          vertical-align: middle;
          width: 300px;
          height: 35px;
          overflow: hidden;
          color: #808080;
          font-size: 12px;
        }
      }
    }
  }
  #score {
    width: 100%;
    background-color: #fff;
    margin-top: 5px;
    padding: 0px 15px;
    box-sizing: border-box;
    p:first-child {
      font-size: 14px;
      color: #666;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
      span {
        vertical-align: middle;
        margin-right: 5px;
      }
      img {
        width: 14px;
        height: 14px;
        margin-left: 5px;
        vertical-align: middle;
      }
    }
    p:nth-child(2) {
      padding: 5px;
      font-size: 14px;
      color: #333;
    }
  }
  #introduce {
    width: 100%;
    background-color: #fff;
    margin-top: 5px;
    padding: 0px 15px 15px 15px;
    box-sizing: border-box;
    p:first-child {
      height: 40px;
      line-height: 40px;
      color: #666666;
      font-size: 14px;
      border-bottom: 1px solid #ddd;
    }
    p:nth-child(2) {
      padding-top: 10px;
      span {
        display: block;
        font-size: 13px;
        color: #333;
        margin-left: 10px;
      }
      a {
        color: #666;
        font-size: 14px;
      }
    }
  }
  #order {
    width: 100%;
    margin-top: 5px;
    background-color: #fff;
    padding: 0px 15px;
    padding-bottom: 10px;
    box-sizing: border-box;
    p {
      font-size: 13px;
      margin-left: 10px;
    }
    p:first-child {
      height: 40px;
      line-height: 40px;
      color: #666;
      font-size: 14px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
      margin-left: 0px;
    }
  }
  .space {
    height: 40px;
  }
  #comment {
    width: 100%;
    height: 316px;
    background-color: #fff;
    margin-top: 5px;
    padding: 0px 15px;
    box-sizing: border-box;
    p:first-child {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
      color: #666;
    }
    p:nth-child(2) {
      margin-top: 30px;
      text-align: center;
      img {
        width: 31px;
        height: 30px;
        margin-left: 5px;
      }
    }
    p:nth-child(3) {
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        width: 100px;
        height: 35px;
        display: inline-block;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 5px;
        line-height: 35px;
        color: #999;
        font-size: 14px;
      }
      .bgcColor {
        background-color: #ffeff0;
        border: 1px solid rgba(229, 0, 18, 1);
        color: #e50012;
      }
    }
    textarea {
      width: 100%;
      height: 75px;
      outline: none;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid #ddd;
      color: #666;
    }
    p:nth-child(5) {
        width: 100%;
      height: 44px;
      color: #fff;
      background-color: #ccc;
      border-radius: 3px;
      text-align: center;
      line-height: 44px;
      margin-top: 10px;
    }
    p:last-child {
      width: 100%;
      height: 44px;
      color: #fff;
      background-color: #ccc;
      border-radius: 3px;
      text-align: center;
      line-height: 44px;
      margin-top: 10px;
        background-color: #e50012 !important;
    }
  }
}
</style>



