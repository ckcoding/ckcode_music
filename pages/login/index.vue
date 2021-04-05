<template>
	<view class="loginBox">
		<view class="loginTitle">
			网易云音乐
		</view>
		<view class="loginImgBox">
			<image src="../../images/wyy.png" mode="heightFix" class="loginImg"></image>
		</view>
		<view class="loginInputBox">
			<input class="phone" @input="teltphone" type="number" maxlength="11" placeholder="手机号" />
		</view>
		<view class="loginInputBox">
			<input class="pass" @input="passwords" password type="text" maxlength="36" placeholder="密码" />
		</view>
		<view class="loginButton" @click="login">
			登录
		</view>
	</view>
</template>

<script>
	//get请求
	//http://localhost:3000/login/cellphone?phone=xxx&password=yyy
	//import urlapi from "../../utils/config.js"
	//const urlapi = require('../../utils/config.js');
	import {loginUrl} from '../../utils/config.js'
	export default {
		data() {
			return {
				phone:'',
				pass:''
			}
		},
		methods: {
			login() {
				uni.request({
					url:`${loginUrl}?phone=${this.phone}&password=${this.pass}`, //仅为示例，并非真实接口地址。
					success: function(res) {
						if(res.data.code != "200"){
							uni.showToast({
							    title: res.data.message,
							    duration: 2000
								
							});
						}else{
						
							var data={
								name:res.data.profile.nickname,
								id:res.data.profile.userId,
								url:res.data.profile.avatarUrl
							}
							//写入缓存
							uni.setStorageSync('userdata', data);
							
							uni.redirectTo({
							    url: '../index/index'
							});
						}
							
						
					
			}})},
			teltphone: function(event) {
				//console.log("sfss")
				this.phone = event.target.value
			},
			passwords: function(event) {
			    this.pass = event.target.value
			        },

			// 中断请求任务
			//requestTask.abort();

		}
	}
</script>

<style>
	.loginImgBox{
		margin: auto;
		margin-top:35px;
		width: 80px;
		height: 80px;
	}
	.loginImg{
		
		width: 80px;
		height: 80px;
	}
	.loginBox{
		margin-top:60px;
	}
	.loginTitle{
		text-align: center;
		color: #FFF;
		font-family: "trebuchet MS", sans-serif;
		line-height: 1em;
		line-height: 1em;
		font-weight:500;
		font-size: 28px;
		text-shadow:0px 0px 0 rgb(243,243,243),1px 0px 0 rgb(230,230,230),2px 0px 0 rgb(218,218,218), 3px 0px 0 rgb(206,206,206),4px 0px 3px rgba(0,0,0,0),4px 0px 1px rgba(0,0,0,0.5),0px 0px 3px rgba(0,0,0,.2);
	}
	.loginInputBox{
		margin:90px auto -60px;
		background-color: #FFFFFF;
		padding: 10px;
		width: 70%;
		border-radius: 12px;
		
	}
	.loginButton{
		margin:120px auto;
		background-color: #FFFFFF;
		padding: 10px;
		width: 30%;
		border-radius: 12px;
		text-align: center;
		color: #cb4635;
		font-weight:700;
		font-family: "trebuchet MS", sans-serif;
	}
	page{
		background-color: #cb4635;
	}
</style>
