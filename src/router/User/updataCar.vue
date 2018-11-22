<template>
  <div id="updataCar">
    <div id="main">
      <!-- 1 -->
		<p>
			<span>车&nbsp; 牌&nbsp; 号 :</span>
			<span>
				<span @click="showCityKeyBoard=true,number='0'">{{city}}</span> 
				<img class="arrow" src="../../assets/img/icon_arrow@2x.png" alt="">&nbsp;
				<!-- <span class="carNo" @click="showCityKeyBoard=true,number='1'">{{carNo}}</span> -->
				<input class="carNo" type="text" maxlength="7" @focus="hideKeyboard" v-model="carNo" @blur="checkValue(carNo)">
			</span>
			<img src="../../assets/img/icon_arrow@2x.png">
		</p>
		<!-- 2 -->
		<p>车辆型号</p>
		<!-- 3 -->
		<p>
			<span>车 &nbsp;架&nbsp; 号 :</span>
			<input type="text" v-model="frameNo">
			<img src="../../assets/img/icon_info@3x.png">
		</p>
		<!-- 4 -->
		<p>输入车架号可为您自动解析车辆型号</p>
		<!-- 5 -->
		<p>
			<span>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌 :</span>
			<select v-model="infoData.brand" id="input">
				<option disabled value="">请选择品牌</option>
				<option  v-for="(item,index) in haha" :key="index">{{item}}</option>
			</select>
			<img src="../../assets/img/icon_arrow@2x.png">
		</p>
		<!-- 6 -->
		<p>
			<span>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系 :</span>
			<select  v-model="infoData.carSystem" id="input">
				<option disabled value="">请选择车系</option>
				<option value="">11</option>
			</select>
			<img src="../../assets/img/icon_arrow@2x.png">
		</p>
		<!-- 7 -->
		<p>
			<span>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份 :</span>
			<select  v-model="infoData.year" id="input">
				<option disabled value="">请选择年份</option>
				<option value="">11</option>
				<option value="">11</option>
				<option value="">11</option>
				<option value="">11</option>
				<option value="">11</option>
			</select>
			<img src="../../assets/img/icon_arrow@2x.png">
		</p>
		<!-- 8 -->
		<p>
			<span>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型 :</span>
			<select v-model="infoData.carModel" id="input">
				<option disabled value="">请选择车型</option>
				<option value="">11</option>
			</select>
			<img src="../../assets/img/icon_arrow@2x.png">
		</p>
		<p>
			是否设置为默认车辆
			<span id="btnRight">
				<span v-if="isdefalutCar?changeTxt='是':changeTxt='否'">{{changeTxt}}</span>
				<mt-switch id="isdefalute" v-model="isdefalutCar"></mt-switch>
			</span>
		</p>
		 <p>
			确定
		</p> 
    </div>
	 	<div id="keyboard" v-show="showCityKeyBoard">
			<ul class="keyboard" v-if="number=='0'">
				<li v-for="(item,index) in keyboard" :key="index" @click="changeCity(item)">{{item}}</li>
				<li @click="showCityKeyBoard=false">关闭</li>
			</ul>
			<ul class="keyboard1" v-if="number=='1'">
				<li v-for="(item,index) in keyboard1" :key="index" @click="changeCarNo(item)">{{item}}</li>
				<li class="success" @click="showCityKeyBoard=false">完成</li>
				<li @click="empty">清除</li>
			</ul>
	  	</div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Switch,Toast } from 'mint-ui';
Vue.component(Switch.name, Switch);
import 'mint-ui/lib/style.css'
export default {
	components:{
		Toast,
	},
  name: "",

  data() {
    return {
		frameNo:'', //车架号
		haha:[
			'1111','2222','3333'
		],
		//车子数据详情
		infoData:{
			brand:'',  //品牌
			carSystem:'', //车系
			year:'',       //年份
			carModel:'', //车型
		},
		isdefalutCar:false,  //控制文字是 '是'还是'否'
		changeTxt:'否',
		keyboard:[
			'粤', '京', '冀', '沪', '津', '晋', '蒙', '辽', '吉',
		 	'黑','苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '桂',
			'琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁'
		],
		keyboard1:[
			'1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
　　　　　	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I','J', 'K',
　　　　　　 'L', 'M', 'N', 'O','P', 'Q', 'R', 'S', 'T', 'U', 'V','W','X','Y','Z'
		],
		city:'粤',   //选择省区
		showCityKeyBoard:false,  //控制键盘的显示与隐藏
		carNo:'',   //车牌号
		number:'0',  
		selectShow:true,  //控制select是否可以点击  true为禁用 false为可用


	};
  },

  methods: {
	  //点击获取对应的值
	  changeCity(val){
		   this.showCityKeyBoard = false //选中后隐藏键盘
		   this.city = val   //赋值选中的值
	  },

	//   changeCarNo(val){
	// 	   if(this.carNo.length<7){
	// 		    this.carNo =this.carNo += val   //赋值选中的值
	// 	   }else {
	// 		     Toast({
	// 				message: "车牌号不可超过7位数",
	// 				duration: 1500
	// 			});
	// 	   }
	//   },
	//   empty(){
	// 	  this.carNo =this.carNo.substr(0, this.carNo.length - 1);
	//   }

	//输入框失去焦点时
	checkValue(val){
		if(!/^[0-9a-zA-Z]+$/.test(val)){  //正则判断是否是数字和英文
			Toast({
				message: "格式错误请重新输入",
				duration: 1000
			});
			this.carNo = ''       //把输入框清空
        }
	},

	//关闭键盘
	hideKeyboard(){
		this.showCityKeyBoard = false
	},
  }
};
</script>

<style lang='less' scoped>
#updataCar {
  	width: 100%;
  	height: 100%;
  	background-color: #f5f5f5;

  	#main {
   		width: 100%;
    	// height:100%;
		position: absolute;
		// padding-left:15px;
		box-sizing: border-box;
    	p {
			position: relative;
			padding: 0px 15px;
			line-height: 48px;
			font-size: 14px;
			color: #666;

			span:first-child {
				color: #666;
				font-size: 14px;
				float: left;
			}

			span:nth-child(2) {
				color: #333;
				font-size: 14px;
				float: left;
				margin-left: 15px;
			}

			img {
				width: 12px;
				height: 12px;
				float: right;
				margin-top:19px;
			}

			input {
				width: 100%;
				height: 48px;
				border: none;
				font-size: 14px;
				color: #333;
				padding-left: 100px;
				box-sizing: border-box;
				outline: none;
			}
		}
		// 1
		p:first-child {
			height: 48px;
			line-height: 48px;
			background-color: #fff;
			margin-top:10px;
			span {
				.arrow {
					float:left;
				}
				.carNo {
					float:right;
					// display: inline-block;
					width:80%;
					height:48px;
					font-size:13px;
					color:#666;
					// background-color:red;
					padding:0px;
				
				}
			}
		}
    	// 2
		p:nth-child(2) {
			height: 40px;
			text-align: left;
		}
		// 3
		p:nth-child(3),
		p:nth-child(10) {
			padding: 0px;
			span {
				position: absolute;
				left: 15px;
			}
			img {
				height: 16px;
				width: 16px;
				position: absolute;
				top: 0px;
				right: 15px;
			}
   		}
		// 4
		p:nth-child(4) {
			color: #ff8d18;
			font-size: 12px;
			height: 33px;
			line-height: 33px;
			text-align: left;
		}

		p:nth-child(5),
		p:nth-child(6),
		p:nth-child(7),
		p:nth-child(8) {
			padding: 0px;
			margin-top:1px;
			// border-bottom: 1px solid #ddd;
			span {
				position: absolute;
				left: 15px;
			}
			img {
				position: absolute;
				top: 0px;
				right: 15px;
			}
		}
		p:nth-child(8) {
			border: none;
		}
		p:nth-child(9) {
			background-color: #fff;
			margin-top:10px;
			#btnRight {
				float:right;
			}
			#isdefalute {
				float:right;
				height:25px;
				margin-top:11px;
				margin-left:10px;
			}
		}
		p:nth-child(10) {
			width:90%;
			height:44px;
			background:rgba(229,0,18,1);
			border-radius:5px;
			margin:0 auto;
			text-align: center;
			color:#fff;
			margin-top:20px;
		}
		#input {
			width:100%;
			height:48px;
			outline: none;
			background-color: #fff;
			border:none;
			 appearance:none;
			-moz-appearance:none;
			-webkit-appearance:none;
			-ms-appearance:none;
			padding-left:100px;
			font-size:14px;
			color:#666;
		}

	}

	#keyboard {
		position:fixed;
		bottom:0px;
		background-color: #ccc;
		width:100%;
		padding-bottom:10px;
		.keyboard {
			width:100%;
			li {
				float:left;
				width:40px;
				height:40px;
				background-color: #fff;
				margin-left:10px;
				margin-top:10px;
				text-align: center;
				line-height: 40px;
				border-radius: 5px;
			}
			li:last-child {
				width:90px;
			}
		}
		.keyboard1 {
			width:100%;
			li {
				float:left;
				width:35px;
				height:40px;
				background-color: #fff;
				margin-left:5px;
				margin-top:10px;
				text-align: center;
				line-height: 40px;
				border-radius: 5px;
			}
			li:last-child {
				width:75px;
				float:right;
			}
			.success {
				margin-right:10px;
				float:right;
				width:75px;
			}
		}
	}


	  
}
</style>
