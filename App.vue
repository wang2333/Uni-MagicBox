<script>
import Vue from 'vue';
export default {
	globalData: {
		video: ''
	},
	onLaunch: function() {
		console.log('App Launch');
		uni.getSystemInfo({
			success: function(e) {
				// #ifndef MP
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == 'android') {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
				}
				// #endif

				// #ifdef MP-WEIXIN
				Vue.prototype.StatusBar = e.statusBarHeight;
				let custom = wx.getMenuButtonBoundingClientRect();
				Vue.prototype.Custom = custom;
				Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
				// #endif

				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = e.statusBarHeight;
				Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
				// #endif
			}
		});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
/* #ifndef APP-PLUS-NVUE */
@import 'components/colorui/main.css';
@import 'components/colorui/icon.css';
page {
	position: relative;
	height: 100%;
}
.shadow {
	box-shadow: 4rpx 4rpx 6rpx rgba(0, 0, 0, 0.3);
}
.line1 {
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	width: 90%;
}
.line3 {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}
/* #endif */
</style>
