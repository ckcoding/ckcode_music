<template>
	<view class="playMusic" v-if="isNull">
		<swiper
			class="playSwiper"
			circular
			:duration="duration"
			:current="subscript"
			@change="getCurrent"
			@transition="playTransition"
			@animationfinish="playAnimationfinish"
		>
			<swiper-item v-for="(item, i) in playList" :key="item.id">
				<u-image class="songImg" :src="item.al.picUrl" mode="widthFix"  width="80" height="80" shape="circle"></u-image>
				<view class="songInfo">
					<view class="songName">{{ item.name }}</view>
					<view class="lyrics">{{item.ar[0].name ? item.ar[0].name : '未知'}}</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="btn">
			<view class="btn-item" style="margin: 0 0 40px 0;" @click="getBtn()">
				<u-icon class="btnItem" name="pause-circle" v-if="isBtn" @click="pause"></u-icon>
				<u-icon class="btnItem" name="play-circle" v-else @click="play"></u-icon>
			</view>
			
		</view>

		
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	name: 'playMusic',
	data() {
		return {
			// 动画时间
			duration: 0,
			// popup样式
			style: {
				width: '90%',
				margin: '0 auto 36rpx',
				borderRadius: '20rpx'
			},
			//歌曲列表背景控制
			songBg: null
		};
	},

	methods: {
		// 控制播放
		...mapMutations(['getIsBtn', 'getIndex','getIsShow']),
		getBtn() {
			this.getIsBtn();
		},
		pause() {
			this.$audio.pause();
		},
		play() {
			this.$audio.play();
			console.log("列表是"+JSON.stringify(this.playList))
		},
		// current值发生改变时触发的事件
		getCurrent(e) {
			// console.log(e.detail.current,e.detail.source);
			if (e.detail.source === 'touch') {
				this.getIndex(e.detail.current);
				this.getIsBtn(true);
			}
		},
		// swiper-item位置发生变化时触发的事件
		playTransition() {
			this.duration = 500;
		},
		// 动画结束后触发的事件
		playAnimationfinish() {
			this.duration = 0;
		}
		
	},
	computed: {
		...mapState(['isBtn', 'playList', 'subscript']),
		// 处理微信兼容v-if问题
		isNull() {
			return this.subscript !== null;
		}
	},
	watch: {
		// 监听subscript变化更改url
		subscript() {
			// this.$audio.autoplay = true;
			console.log("列表是"+JSON.stringify(this.playList))
			this.$audio.src = this.playList[this.subscript].url;
		}
	}
};
</script>

<style lang="scss" scoped>
.playMusic {
	position: fixed;
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-radius: 30rpx 30rpx 0 0;
	bottom: 0px;
	width: 100%;
	height: 180rpx;
	// padding: 0 10rpx;
	box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
	border-top: 1px solid #eee;
	background-color: rgba(255, 255, 255, 0.9);
	// z-index: 999999;
	.playSwiper {
		height: 100%;
		width: 75%;
		margin: 0 0 40px 0;
		swiper-item {
			display: flex;
			align-items: center;
			margin: 0 0 0 20px;
		}
		.songImg {
			margin: 0 20rpx;
		}
		.songInfo {
			// width: 55%;
			font-size: 24rpx;
			.songName {
				color: #000;
				width: 440rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.lyrics {
				color: #666;
			}
		}
	}
	.btn {
		width: 24%;
		font-size: 45rpx;
		margin-right: 0rpx;
		display: flex;
		justify-content: space-around;
	}
}
</style>
