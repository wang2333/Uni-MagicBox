<template>
	<MescrollUni ref="mescrollRef" @init="mescrollInit" :height="height" top="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick">
		<view class="cards">
			<view hover-class="navigator-hover" @click="handleGo(item)" class="card-item shadow" v-for="(item, index) in liveList" :key="index">
				<image :src="item.roomUrl" mode="scaleToFill"></image>
				<view class="nickname">
					<text>{{ item.nickname }}</text>
					<text>{{ addChineseUnit(item.online) }}</text>
				</view>
				<view class="roomName line1">{{ item.roomName }}</view>
			</view>
		</view>
	</MescrollUni>
</template>

<script>
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import MescrollMoreItemMixin from '@/components/mescroll-uni/mixins/mescroll-more-item.js';
import { getLiveList } from '@/service/live.js';
import { addChineseUnit } from '@/util/util.js';
export default {
	mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
	components: {
		MescrollUni
	},
	data() {
		return {
			liveList: [],
			downOption: {
				auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
			},
			upOption: {
				auto: false, // 不自动加载
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 30 // 每页数据的数量
				},
				noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
				empty: {
					tip: '~ 空空如也 ~', // 提示
					btnText: '去看看'
				}
			}
		};
	},
	props: {
		tabs: Object, // tab菜单,此处用于取关键词
		height: String
	},
	methods: {
		async handleGo(params) {
			uni.navigateTo({
				url: `/pages/live/video?title=${params.roomName}&type=${this.tabs.value}&id=${params.roomId}`
			});
		},
		addChineseUnit(num) {
			return addChineseUnit(num);
		},
		/*下拉刷新的回调 */
		downCallback() {
			this.mescroll.resetUpScroll();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		async upCallback(page) {
			try {
				const { data } = await getLiveList({ type: this.tabs.value, page: page.num });
				if (page.num == 1) this.liveList = [];
				this.liveList = this.liveList.concat(data.data);
				this.mescroll.endSuccess();
			} catch (e) {
				this.mescroll.endErr();
			}
		},
		//点击空布局按钮的回调
		emptyClick() {
			uni.showToast({
				title: '点击了按钮,具体逻辑自行实现'
			});
		}
	}
};
</script>
<style lang="scss">
.cards {
	background-color: #eee;
	display: flex;
	flex-wrap: wrap;
	.card-item {
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		margin: 6rpx;
		width: calc(50% - 12rpx);
		background-color: #fff;
		image {
			width: 100%;
			height: 220rpx;
		}
		.nickname {
			position: absolute;
			width: 100%;
			padding: 10rpx;
			top: 170rpx;
			left: 0;
			color: #ffffff;
			font-size: 12px;
			display: flex;
			justify-content: space-between;
		}
		.roomName {
			line-height: 30px;
			font-size: 12px;
			padding-left: 10rpx;
		}
	}
}
</style>
