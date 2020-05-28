<template>
	<view class="live">
		<cuCustom bgColor="bg-gradual-green"><text slot="content">直播</text></cuCustom>

		<scroll-view class="nav-bar shadow" :style="{ top: CustomBar + 'px' }" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item, index) in tabBars" :key="index" class="nav-item" :class="{ current: index === tabCurrentIndex }" @click="changeTab(index)">{{ item.name }}</view>
		</scroll-view>

		<swiper class="swiper-box" duration="200" :height="height" :style="{ height: height }" :current="tabCurrentIndex" @change="changeTab">
			<swiper-item class="swiper-item" v-for="(item, index) in tabBars" :key="(item, index)">
				<MescrollItem :i="index" :index="tabCurrentIndex" :tabs="item" :height="height"></MescrollItem>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import MescrollItem from './mescroll-swiper-item.vue';
export default {
	components: {
		MescrollItem
	},

	data() {
		return {
			CustomBar: this.CustomBar,
			tabBars: [
				// {
				// 	name: '哔哩哔哩',
				// 	value: 'bilibili'
				// },
				{
					name: '斗鱼',
					value: 'douyu'
				},
				{
					name: '企鹅',
					value: 'egame'
				},
				{
					name: '火猫',
					value: 'huomao'
				},
				{
					name: '虎牙',
					value: 'huya'
				},

				{
					name: '网易',
					value: 'cc'
				},
				{
					name: '战旗',
					value: 'zhanqi'
				}
			],
			tabCurrentIndex: 0, //当前选项卡索引
			scrollLeft: 0, //顶部选项卡左滑距离
			height: '400px' // 需要固定swiper的高度
		};
	},
	onLoad() {
		// 需要固定swiper的高度
		this.height = uni.getSystemInfoSync().windowHeight - this.CustomBar - uni.upx2px(80) + 'px';
	},
	methods: {
		changeTab(e) {
			if (typeof e == 'number') {
				this.tabCurrentIndex = e;
			}
			if (typeof e == 'object') {
				this.tabCurrentIndex = e.detail.current;
			}
		}
	}
};
</script>

<style lang="scss">
.live {
	height: 100%;
	position: relative;
	padding-top: 80rpx;
}
.nav-bar {
	position: fixed;
	z-index: 10;
	height: 80rpx;
	white-space: nowrap;
	background-color: #fff;
	display: flex;
	.nav-item {
		display: inline-block;
		padding: 0 30rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 30rpx;
		color: #303133;
		position: relative;
		&:after {
			content: '';
			width: 0;
			height: 0;
			border-bottom: 4upx solid #44b749;
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			transition: 0.3s;
		}
	}
	.current {
		color: #44b749;
		&:after {
			width: 50%;
		}
	}
}
</style>
