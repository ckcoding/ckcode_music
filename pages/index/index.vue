<template>
	<view class="">
	<view class="content">
		<image class="logo" :src="images" @click="stop"></image>
		<view class="text-area">
			<view class="title">Hello,{{title}}</view>
			<view class="title2">Welcome Back !</view>
		</view>
	</view>
<view class="list_title_txt">
		<view class="list_title">发现</view>
		</view>
		<view class="litebox">
		
		
		<view v-for="(item, index) in List" :key="index" @click="music" :id="item.url" >
			<image class="list_img" :src=item.img ></image>
			<view class="list_txt">
				{{item.name}}
			</view>
			
		</view>
		
		
		</view>


	<view class="list_title_txt" v-if="songDan">
		<view class="list_title">我的歌单</view>
		<!-- <view class="list_title1" bindtap="more"> 更多 ></view> -->
	</view>
	

<view class="list1" v-for="(item, index) in songDan" :key="index" @click="music" :id="item.id" v-if="index != 0">
	
	<image class="list1_left" :src="item.coverImgUrl"></image>
	<view class="list1_left1">
		<view class="list1_txt1">{{item.name}}</view>
		<view class="list1_txt2">{{item.trackCount}}首</view>
	</view>

</view>
<view style="padding:50px;">
			</view>
	<playMusic v-if="isShow == true"></playMusic>
</view>
</template>

<script>
	import {refreshUrl,signinUrl,songDanUrl} from '../../utils/config.js'
	import playMusic from '@/pages/audio/index.vue';
	import { mapMutations, mapState } from 'vuex';
	export default {
		
		data() {
			return {
				
				title: '柴疙瘩', //用户信息
				images:'https://p3.music.126.net/yhUNNUA5Uzmai6roa-wycA==/109951164406875887.jpg' ,//头像
				songDan:"",
				id:"105448211",
				List:[{name:"我的喜欢",url:"127667937",img:"http://ckcode.tooo.top:2200/public/images/like.png"},
				{name:"我的云盘",url:"cloud",img:"http://ckcode.tooo.top:2200/public/images/cloud.png"},
				{name:"每日推荐",url:"zan",img:"http://ckcode.tooo.top:2200/public/images/zan.png"},
				{name:"排行榜单",url:"3778678",img:"http://ckcode.tooo.top:2200/public/images/top.png"}],
			
				
			}
		},
		components: {
			playMusic
		},
		computed:{
			...mapState(['isShow'])
		},
		onLoad() {
			console.log(this.isShow)
			uni.getStorageInfoSync({
			    key: 'userdata',
			    success: function (res) {
				//	console.log(res.data)
			       this.title = res.data.name
				   this.id = res.data.id
				   this.images = res.data.url
			    }
			});
			
	uni.request({
				url:refreshUrl,
				success:(res)=>{
		if (res.data.code !== 200){
			uni.redirectTo({
			    url: '../login/index'
			});
		}else{
			//签到
			this.signin()
			//加载数据
			this.reSongLists()
		}
	}
})
		},
		methods: {
			...mapMutations(['closeisShow']),

//加载数据


//签到
signin(){
	uni.request({
		url:signinUrl,
		success:function(res) {
		//	console.log(res.data)
		}
	})
},
//我的歌单
reSongLists(){

	uni.request({
		url:songDanUrl+"?uid="+this.id,
		success:(res)=>{
			this.songDan = res.data.playlist
			//console.log(res.data)
		}
	})
},
//跳转到播放界面
music(e){
	//console.log(e.currentTarget.id)
	uni.navigateTo({
	    url: '../music/index?id='+e.currentTarget.id
	});
	
},stop() {
				 	this.$audio.stop();
					this.closeisShow()
				 }
		}
	}
</script>

<style>
	.content {
		display: flex;
		align-items: center;	
	}
	.logo {
		height: 120rpx;
		width: 120rpx;
		margin-top: 100rpx;
		margin-left: 80rpx;
		border-radius: 50%;
	}

	.text-area {
		margin-top: 150rpx;
		margin-left: 80rpx;
		justify-content: center;
	}

	.title{
		
		color: #8f8f94;
	}
	.title2{
		  font-size: 40rpx;
		  font-weight: 700;
		  color: #5c5b5b;
	}
	.tool_box{
	  width: 88%;
	  margin: auto;
	  display: flex;
	  flex-direction: row;
	  justify-content:space-between;
	  background-color: #ffffff;
	  border-radius: 35rpx;
	  flex-wrap: wrap; 
	}
	.tool_img{
	
	  margin: 20rpx;
	  display: block;
	}
	.tool_text{
	  color: #909399;
	  font-size: 22rpx;
	  text-align: center;
	  width: 100rpx;
	  display: block;
	  font-weight: normal;
	  overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	
	}
	.tool_title{
	  font-size: 45rpx;
	  font-weight: 900;
	  color: #5c5b5b;
	  margin: 30rpx;
	}
	
	
	.icon {
	  width: 100rpx;
	  height: auto;
	}
	
	
	
	
	.weui-loadmore {
	  margin: 1.5em auto;
	  line-height: 1.6em;
	  font-size: 22rpx;
	  text-align: center;
	  background-clip: text;
	  background: -webkit-linear-gradient(top, #a2a2a2, #a2a2a2);
	  -webkit-text-fill-color: transparent;
	  -webkit-background-clip: text;
	  position: relative;
	  font-weight: 600;
	}
	/*yes*/
	.container {
	  padding-bottom: 20rpx;
	  box-sizing: border-box;
	}
	
	
	/*yes*/
	.tui-banner-box {
	  width: 100%;
	  padding: 30rpx 0;
	  box-sizing: border-box;
	}
	/*yes*/
	.tui-banner-swiper {
	  width: 100%;
	  height: 240rpx;
	}
	
	.tui-banner-item {
	  padding: 0 16rpx;
	  box-sizing: border-box;
	}
	
	.tui-slide-image {
	  width: 100%;
	  height: 240rpx;
	  display: block;
	  border-radius: 12rpx;
	  /* transition: all 0.1s linear; */
	}
	
	.tui-banner-scale {
	  transform: scaleY(0.85);
	  transform-origin: center center;
	}
	
	.tui-banner-swiper .wx-swiper-dot {
	  width: 8rpx;
	  height: 8rpx;
	  display: inline-flex;
	  background: none;
	  justify-content: space-between;
	}
	
	.tui-banner-swiper .wx-swiper-dot::before {
	  content: '';
	  flex-grow: 1;
	  background: rgba(255, 255, 255, 0.8);
	  border-radius: 16rpx;
	  overflow: hidden;
	}
	
	.tui-banner-swiper .wx-swiper-dot-active::before {
	  background: #fff;
	}
	
	.tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
	  width: 16rpx;
	}
	
	/*banner*/
	
	.list_title{
	  font-size: 40rpx;
	  color: #4d4b4b;
	  font-weight: 900;
	  margin-left: 40rpx;
	}
	.list_title1{
	  font-size: 30rpx;
	  color: #3a79f0;
	  margin-right: 40rpx;
	}
	
	.list_title_txt{
	  height: 150rpx;
	  line-height:150rpx;
	}
	.list1{
	  height: 150rpx;
	  margin-left: 20rpx;
	}
	.list1_left{
	  width: 100rpx;
	  height: 100rpx;
	  margin: 25rpx 10rpx 25rpx 20rpx;
	  border-radius: 15rpx;
	  float: left;
	}
	
	.list1_left1{
	  height: 100rpx;
	  line-height:50rpx;
	  margin: 25rpx 0 25rpx 0;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	  color: #2e2d2d;
	  
	  float: left;
	}
	.list1_txt1{
	  font-size: 30rpx;
	  font-weight: 900;
	  padding: 0 0 0 10rpx;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	  
	}
	.list1_txt2{
	  font-size: 25rpx;
	  color: #a2a2a2;
	  padding: 0 0 0 10rpx;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	}
	.list1_txt3{
	  font-size: 25rpx;
	  color: #a2a2a2;
	  padding: 0 0 0 20rpx;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	}
	.list1_left2{
	  height: 160rpx;
	  line-height:160rpx;
	  padding: 20rpx;
	  float: right;
	}
	.list1_left2_text{
	  border-radius: 30rpx;
	  height: 160rpx;
	  color: #fff;
	  line-height:26rpx;
	  font-size: 20rpx;
	  padding: 15rpx 40rpx;
	  background-color: #fb7299;
	}
/* 	.text-areas{
		margin-top: 180rpx;
		
	
		flex-direction: column;
		align-items: center;
		justify-content: center;
	} */
	.litebox{
		display: flex;
		text-align: center;
		justify-content:space-around;
	}
	.list_txt{
		font-size: 15px;
		margin: 10px;
	}
	.list_img{
		display: flex;
		width: 36px;
		height: 36px;
		text-align: center;
		margin: auto;
	}
</style>
