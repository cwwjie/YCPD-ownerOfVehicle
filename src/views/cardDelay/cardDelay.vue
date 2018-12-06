<template>
	<div id="cardDelay">
		<!-- 广告图模块 -->
		<div id="bannner">
			<img src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-carDelay/banner_BG%402x.png">
		</div>

		<!-- 主体内容模块 -->
		<div id="content">
			<p>【中国人保】</p>
			<p>服务券免费延期活动规则</p>
			<p>活动说明</p>
			<p>活动时间:2018.10.01-2018.12.31</p>
			<p>兑换规则：</p>
			<p>凡持有【深圳人保】优惠券的客户可通过养车频道兑换同等服务效应的养车频道优惠券，自兑换之日起，一年内有效。</p>
			<p>只能使用在有效期内且未使用的卡券兑换，兑换后，您在【深圳人保】的卡券将变为已核销状态，不能再次使用。</p>
			<p>您可在“养车频道”微信公众号“车主入口-我的-优惠券”中查看您已兑换的优惠券。</p>
			<p>
				<span>卡券来源</span>
				<span>可延期卡券名称</span>
			</p>
			<p>
				<span class="left">深圳人保</span>
				<span class="right">
					<span>上门/到店通用保养</span><br/>
					<span>洗车券</span><br/>
					<span>精洗券</span><br/>
					<span>上门/到店通用保养</span><br/>
					<span>保养券</span><br/>
				</span>
				
			</p>
			<!-- <p>
				<span class="left">深圳平安</span>
				<span class="right">
					<span>上门/到店通用保养</span><br/>
					<span>洗车券</span><br/>
					<span>精洗券</span><br/>
					<span>上门/到店通用保养</span><br/>
					<span>保养券</span><br/>
				</span>
				
			</p> -->
			
		</div>

		<!-- 是否延期按钮 -->
		<div id="btn" @click="goCardQueryPage">
			立即延期
		</div>
	</div>
</template>

<script>

import RequestedURL from '@/config/RequestedURL.js'; //导入链接

export default {
	name: "",

	data() {
		return {}
	},

	methods: {
		goCardQueryPage () {

			let _this = this;
			$.ajax({
				url: RequestedURL.getStationHandler1,
				type: "post",
				data: {
					action:"GetAbyStore",
					Name:'尊驾汇汽车服务中心'
				},
				success: function (datas) {
					_this.$router.push({
						path:'/cardDelay/cardQuery',query:{phoneName:datas.data[0].StringVal8,storeID:datas.data[0].StoreID}
					})
				},
			})
		}
	}
};
</script>

<style lang='less' scoped>
	#cardDelay {
		background-color: #f3f3f3;
		// height:100%;
		width:100%;
		position:absolute;
	}
	#bannner {
		width:100%;
		height:auto;
		img {
			width:100%;
			height:100%;
		}
	}
	#content {
		text-align: center;
		width:95%;
		background-color: #fff;
		margin: 0 auto;
		margin-top:4px;
		box-sizing: border-box;
		font-size:13px;
		padding:0px 15px;
		padding-top:25px;
		padding-bottom:70px;
		color:#333;
		border-radius:10px;
		p:first-child,p:nth-child(2) {
			font-size:16px;
			background:linear-gradient(225deg,rgba(255,119,0,1) 0%,rgba(229,0,18,1) 100%);
			// -webkit-background-clip: text;
			color:transparent;
			font-weight: bold;
		}
		p:nth-child(2) {
			padding-bottom:15px;
		}
		p:nth-child(3) {
			font-size:14px;
			color:#333;
		}
		p:nth-child(4) {
			color:#333;
		}
		p:nth-child(5),p:nth-child(4),p:nth-child(3),p:nth-child(6),p:nth-child(7), p:nth-child(8){
			text-align: left;
		}
		p:nth-child(8) {
			color:#333;
		}
		p:nth-child(9) {
			margin: 0 auto;
			display: flex;
			width:90%;
			height:32px;
			background-color: #FFF1AB;
			color:#775346;
			line-height: 32px;
			text-align: center;
			border:1px solid #F5E976;
			margin-top:10px;
			span:first-child {
				flex: 1;
				border-right:1px solid #F5E976;
			}
			span:nth-child(2) {
				flex: 1.7;
				text-align: left;
				margin-left:30px;
			}
		}
		p:nth-child(10) {
			margin: 0 auto;
			display: flex;
			width:90%;
			height:120px;
			background-color: #FFFDD6;
			color:#68301C;
			line-height: 32px;
			text-align: center;
			border:1px solid #F5E976;
			border-top:none;
			span:first-child {
				flex: 1;
				border-right:1px solid #F5E976;
				
			}
			.left {
				line-height: 120px;
			}
			span:nth-child(2) {
				flex: 1.7;
			}
			.right {
				line-height: 24px;
				text-align: left;
				padding-left:30px;
				box-sizing: border-box;
			}
		}
		p:nth-child(11) {
			margin: 0 auto;
			display: flex;
			width:90%;
			height:120px;
			background-color: #FFFDD6;
			color:#68301C;
			line-height: 32px;
			text-align: center;
			border:1px solid #F5E976;
			border-top:none;
			span:first-child {
				flex: 1;
				border-right:1px solid #F5E976;
				
			}
			.left {
				line-height: 120px;
			}
			span:nth-child(2) {
				flex: 1.7;
			}
			.right {
				line-height: 24px;
				text-align: left;
				padding-left:30px;
				box-sizing: border-box;
			}
		}
	

	}
	#btn {
		position:fixed;
		bottom:0px;
		width:100%;
		height:50px;
		background-color: #e50012;
		line-height: 50px;
		color:#fff;
		margin-top:10px;
		text-align: center;
	}
</style>
