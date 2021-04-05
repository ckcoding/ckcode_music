<template>
<!-- 歌单详情页面 -->
	<view class="playlist-page">
		<!-- 专辑背 -->
		<view class="bg-pic-box">
			<image class="img-bg" width="100%" height="100%" mode="aspectFill" :src="detail.picUrl"/>
			<view class="pic-box-content">
				<view style="width:220rpx;height: 220rpx; z-index: 999;margin-right: 20rpx;" @click="stop()">
					<image
						border-radius="20"
						class="img-pic" width="220rpx" height="220rpx"
						mode="widthFix" 
						:src="detail.picUrl"/>
				</view>
				
				
				<!-- 右边信息 -->
				<view class="pic-box-content-info">
					<!-- 专辑名 -->
					
					<view style="margin-top: 20rpx;" @tap="openArtist(detail.artist.id)">
						作者：{{artist.name}}
					</view>
					
					
					<view style="margin-top: 50rpx;font-size: 24rpx; color: #ddd;" @tap="()=>{showDesc=!showDesc}">
						
						<view style="margin-top: 10rpx;" v-if="detail.description">{{detail.description.substr(0, 50)}}</view>
					</view>
				</view>
			</view>
			
			
		</view>
		
		<!-- 按钮卡片 -->
	
		<!-- 歌曲列表 -->
		
	
			<view class="list1" v-if="songs!=[]" v-for="(item, index) in songs" :key="index" @click="modifyInfo(songs, index)" :id="item.id" >
				<view class="list1_i">
					{{index+1}}
				</view>
				<image class="list1_left" :src="item.al.picUrl"></image>
				<view class="list1_left1">
					<view style="font-size: 32rpx;color: #000000;width: 500rpx;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;" >{{item.name}}</view>
					<view style="font-size: 26rpx;color:#999;">
						{{item.ar ? item.ar[0].name : '未知'}} 
					</view>
					
				</view>
				<u-icon class="newSongIcon1" name="volume" color="#e3e3e3" size="44" v-if="index === subscript"></u-icon>
<!-- 				<view class="newSongIcon" v-else><u-icon name="play-right-fill" color="#e3e3e3" size="24"></u-icon></view> -->
			</view>	
			
			<view style="padding:50px;">
			</view>
		
							
				<playMusic v-if="isShow == true"></playMusic>
		</view>
		
		
		
	</view>
</template>

<script>
	import {songUrl,songDetailUrl,songDanDetailUrl,cloudUrl,zanUrl,topUrl} from '../../utils/config.js'
	import playMusic from '@/pages/audio/index.vue';
	import { mapMutations, mapState } from 'vuex';
	export default {
	 data() {
	        return {
				
				isHeadBtn: true,
				// 新歌列表
				newSongList: [],
				//新歌列表背景控制
				newSongBg: null,
				current: {
				    poster: '',
				    name: '3',
				    author: '',
				    src: '1111',
					option: {},	
				},
				detail: {
					picUrl: 'https://p3.music.126.net/yhUNNUA5Uzmai6roa-wycA==/109951164406875887.jpg',
					//介绍
					description: '这人很懒，什么也没有写！'
				},
				//歌手、作者
				artist: {
					id: '柴疙瘩',
					name: '柴疙瘩',
				},
				//歌曲列表
				songs: [],
				clouds:[],
				zans:null,
				
	        }
	    },
		onLoad: function (option) {
			
		        //获得上一个页面传过来的id
		        var id = option.id;
				//var id = "3778678"
		        //this.songUrl(id);
				
				if(id == "cloud"){
					this.cloud()
				}else if(id == "zan"){
					this.zan()
				}else if(id != null){
					this.songDanDetail(id)
					
				}
		    },
			components: {
				playMusic
				
			},
			computed: {
				
				...mapState(['isBtn', 'playList', 'subscript','isShow'])
			},
			methods: {
			
			...mapMutations(['getIndex','getPlayList', 'getIsBtn','closeisShow','openisShow']),
				
				//获取歌单详情
			songDanDetail(id){
					uni.request({
						url:songDanDetailUrl+`?id=${id}`,
						success:async (res)=>{
							this.songs = res.data.playlist.tracks
							this.detail.picUrl = res.data.playlist.coverImgUrl
							this.detail.description = res.data.playlist.name
							this.artist.name = res.data.playlist.creator.nickname
							for (let i = 0, length = this.songs.length; i < length; i++) {
							await this.getOutInfo (i)
						//	console.log("一次次"+i)
								//console.log("this.songs是"+JSON.stringify(this.songs))
							}
						//	console.log("this.songs是"+JSON.stringify(this.songs))
						}
						})
						
					
				},
				//云盘
				cloud(){
					uni.request({
						url:cloudUrl,
						success:async (res)=>{
							//console.log(res.data.data)
							for(var i =0;i<res.data.data.length;i++){
								var data ={
									"name":res.data.data[i].simpleSong.name,
									"al":res.data.data[i].simpleSong.al,
									"ar":[{"name":res.data.data[i].artist}],
									"id":res.data.data[i].simpleSong.id
								}
								this.songs.push(data)
								await this.getOutInfo (i)
							}
						
						}
					})
				},
				//每日推荐
				zan(){
					uni.request({
						url:zanUrl,
						success:async (res)=>{
							this.songs = res.data.data.dailySongs
							for (let i = 0, length = this.songs.length; i < length; i++) {
								await this.getOutInfo (i)
							
								}
						}
					})
				},
				getOutInfo(i){ 
							return new Promise((resolve, reject) => {
								var id = this.songs[i].id
									console.log(id)
							    if (id == undefined){
									var id = this.cloud[i].songid
									console.log(id)
								}else{
									var id = this.songs[i].id
									console.log(id)
								}
								uni.request({ 
									url:songUrl+`?id=${this.songs[i].id}`,
									success: (res) => {
									//	console.log("二次"+i)
//										console.log(res.data.data[0].url)
										this.songs[i].url = res.data.data[0].url;
				            			resolve(res);  // 千万别忘写！！！
									},
									fail:(err)=>{
										reject('err')
									}
								})
							})
						},
				// 获得要播放音乐的索引
				modifyInfo(item, index) {
					console.log("事实上")
						console.log("事实上"+this.songs)
					this.openisShow()
					console.log(this.isShow)
				//	console.log("索引值"+index)
				console.log("数据源"+JSON.stringify(item))
					this.getIndex(index);
					this.getPlayList(item);
					//console.log(JSON.stringify(this.$audio))
					this.$audio.src = this.playList[index].url
					this.$audio.play();
					console.log(this.isBtn)
					if (!this.isBtn && this.$audio.src) {
						this.$audio.play();
					}
					
					this.getIsBtn(true);
					
				},
				songUrl(i){
					
					uni.request({
						url:songUrl+`?id=${this.songs[i].id}`,
						success:(res)=>{
							this.songs[i].url = res.data.data[0].url;
							//console.log(res.data.data[0].url)
							
						
					
						}
					})
				},
				
				//获取歌曲详情
				songDetail(idd){
					uni.request({
						url:songDetailUrl+`?ids=${idd}`,
						success:(res)=>{
							//console.log(res.data)
							this.current.poster = res.data.songs[0].al.picUrl
							this.current.name =res.data.songs[0].name
							this.current.author = res.data.songs[0].ar[0].name
						}
					})
				},
				 play(e){
					var idd = e.currentTarget.id
					// uni.navigateTo({
					//     url: '../audio/index?id='+e.currentTarget.id
					// });
					this.songUrl(idd);
					this.songDetail(idd)
					
					
				 },
				 stop() {
				 	this.$audio.stop();
					this.closeisShow()
				 }
				}
		}
</script>

<style>
	.bg-pic-box{
		
	}
	.newSongIcon {
		position: relative;
		transform: translateY(100%);
		right: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 46rpx;
		height: 46rpx;
		border-radius: 50%;
		border: 1px solid #e3e3e3;
	}
	.newSongIcon1 {
		align-items:center;
		justify-content:center;
		display: flex;
		position: relative;
		right: 10rpx;
		transform: translateY(100%);
	}
	.bg-pic-box{
		position: relative;
		height: 450rpx;
		padding: 140rpx 40rpx 100rpx 40rpx;
		border-radius: 0 0 10rpx 10rpx;
	}
	.bg-pic-box .img-bg{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 88;
		filter: blur(30rpx);
	}
	
	.bg-pic-box .img-pic{
		width: 100%;
		min-height: 200rpx;
		border-radius: 50rpx;
		z-index: 100;
	}
	
	.pic-box-content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		z-index: 120;
		align-items: center;
	}
	
	.pic-box-content-info{
		width: 0rpx;
		flex: 1;
		z-index: 120;
		color: #fff;
		/* margin-left: 40rpx; */
	}
	
	/* 卡片 */
	.name-card-box{
		background-color: #fff;
		margin: 0 100rpx;
		border-radius: 50rpx;
		box-shadow: 0 0 3rpx 2rpx #f0f0f0;
		position: relative;
		top: -20rpx;
		background-color: rgba(255,255,255, .9);
		z-index: 100;
		padding: 20rpx;
	}
	.name-card-item{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.list_img{
		display: flex;
		width: 36px;
		height: 36px;
		text-align: center;
		margin: auto;
	}
	.songlist{
		display: flex;
	}
	.songlistimg{
		display: flex;
	}
	.songlistname{
		display: flex;
	}
	.list1{
	  height: 150rpx;
	  margin-left: 20rpx;
	}
	.list1_i{
		line-height:150rpx;
		float: left;
		font-size: 30rpx;
		color:#999;
		margin-left: 10rpx;
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
	  margin: 25rpx 10rpx 25rpx 10rpx;
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
</style>
