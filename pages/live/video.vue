<template>
	<view class="video">
		<cuCustom bgColor="bg-gradual-blue" isBack>
			<text slot="content">{{ title }}</text>
		</cuCustom>
		<view class="shadow"><video class="myVideo" id="myVideo" :src="src" controls autoplay></video></view>
	</view>
</template>

<script>
import { getVideoUrl } from '@/service/live.js';
export default {
	data() {
		return {
			id: '',
			type: '',
			title: '',
			src: ''
		};
	},
	onLoad(option) {
		this.title = option.title;
		this.id = option.id;
		this.type = option.type;
		this.getVideoUrl();
	},
	onReady(res) {},
	methods: {
		async getVideoUrl() {
			try {
				const { data } = await getVideoUrl({ type: this.type, id: this.id });
				this.src = data.data;
			} catch (e) {
				uni.showModal({
					content: '加载直播地址失败',
					showCancel: false
				});
			}
		}
	}
};
</script>
<style scoped>
.myVideo {
	position: relative;
	width: 100%;
}
</style>
