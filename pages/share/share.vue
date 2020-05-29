<template>
	<view class="content">
		<cuCustom bgColor="bg-gradual-green"><text slot="content">分享</text></cuCustom>
		<view class="top"></view>
		<view class="banner">
			<dl>
				<dt><image src="../../static/image/logo.png" mode=""></image></dt>
				<dd>魔盒</dd>
			</dl>
			<view class="img"><image src="../../static/image/ewm.png" mode=""></image></view>

			<view class="sharbuttn">
				<view class="btn" @click="save">保存二维码</view>
				<view class="btn" @click="sharurl">复制推广链接</view>
			</view>

			<view class="shartitle"><view>分享</view></view>
			<view class="sharapk" @click="share">
				<view><image src="../../static/image/weact.png"></image></view>
				<view><image src="../../static/image/shar.png"></image></view>
				<view><image src="../../static/image/qq.png"></image></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			providerList: [],
			type: 0
		};
	},
	onLoad() {
		this.version = plus.runtime.version;
		uni.getProvider({
			service: 'share',
			success: e => {
				let data = [];
				for (let i = 0; i < e.provider.length; i++) {
					switch (e.provider[i]) {
						case 'weixin':
							data.push({
								name: '分享到微信好友',
								id: 'weixin'
							});
							data.push({
								name: '分享到微信朋友圈',
								id: 'weixin',
								type: 'WXSenceTimeline'
							});
							break;
						case 'qq':
							data.push({
								name: '分享到QQ',
								id: 'qq'
							});
							break;
						default:
							break;
					}
				}
				this.providerList = data;
			},
			fail: e => {
				console.log('获取登录通道失败' + JSON.stringify(e));
			}
		});
	},
	methods: {
		//复制分享链接
		sharurl() {
			uni.setClipboardData({
				data: '47.98.195.39:8500/download/MagicBox.apk',
				success: function() {
					uni.showModal({
						title: '复制成功',
						content: 'APP下载地址复制成功!',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								//console.log('用户点击确定');
							} else if (res.cancel) {
								//console.log('用户点击取消');
							}
						}
					});
				}
			});
		},
		//保存图片到相册
		save() {
			uni.showActionSheet({
				itemList: ['保存图片到相册'],
				success: () => {
					plus.gallery.save(
						'http://47.98.195.39:8500/download/ewm.png',
						function() {
							uni.showToast({
								title: '保存成功',
								icon: 'none'
							});
						},
						function() {
							uni.showToast({
								title: '保存失败，请重试！',
								icon: 'none'
							});
						}
					);
				}
			});
		},
		share(e) {
			if (this.providerList.length === 0) {
				uni.showModal({
					title: '当前环境无分享渠道!',
					showCancel: false
				});
				return;
			}
			let itemList = this.providerList.map(function(value) {
				return value.name;
			});

			console.log(itemList);

			uni.showActionSheet({
				itemList: itemList,
				success: res => {
					if (this.providerList[res.tapIndex].id == 'qq') {
						this.type = 1;
					} else {
						this.type = 0;
					}
					uni.share({
						provider: this.providerList[res.tapIndex].id,
						scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession',
						type: this.type,
						title: '魔盒',
						summary: '聚合全网直播平台APP',
						imageUrl: 'http://47.98.195.39:8500/download/ewm.png',
						href: 'http://47.98.195.39:8500/download/MagicBox.apk',
						success: res => {
							console.log('success:' + JSON.stringify(res));
						},
						fail: e => {
							uni.showModal({
								content: e.errMsg,
								showCancel: false
							});
						}
					});
				}
			});
		}
	}
};
</script>

<style scoped>
.sharbuttn {
	display: flex;
	justify-content: center;
}
.shartitle {
	width: 80%;
	text-align: center;
	margin-left: 10%;
	border-bottom: 1px solid #dddddd;
	position: relative;
	height: 60upx;
}

.shartitle view {
	height: 50upx;
	line-height: 50upx;
	font-size: 28upx;
	color: #999;
	width: 120upx;
	margin: 32upx auto;
	position: absolute;
	background: #fff;
	left: 50%;
	margin-left: -60upx;
}
.sharapk {
	display: flex;
	justify-content: center;
	margin: 20upx auto;
}
.sharapk view {
	margin: 40upx;
}
.sharapk view image {
	height: 80upx;
	width: 80upx;
}
.content {
	position: relative;
	width: 100%;
	height: 100%;
	background-color: #ffffff;
}
.top {
	width: 100%;
	height: 500upx;
	background: url(../../static/image/banner.png) no-repeat;
	background-size: 100%;
	background-position: center center;
}
.banner {
	position: absolute;
	bottom: 40rpx;
	width: 100%;
	background-color: #ffffff;
	border-radius: 60upx 60upx 0 0;
}
.banner dl {
	margin-top: -80upx;
}
.banner dl dt {
	text-align: center;
}
.banner dl dt image {
	width: 160upx;
	height: 160upx;
	border-radius: 50%;
}
.banner dl dd {
	text-align: center;
}
.img {
	width: 300upx;
	height: 300upx;
	background-color: red;
	margin: 0 auto;
	margin-top: 60upx;
}
.img image {
	width: 100%;
	height: 100%;
}
.btn {
	width: 260upx;
	height: 60upx;
	line-height: 60upx;
	margin: 0 auto;
	margin-top: 60upx;
	border-radius: 40upx;
	border: 0;
	font-size: 26upx;
	outline: 0;
	background: #33b17b;
	color: #ffffff;
	text-align: center;
}
</style>
