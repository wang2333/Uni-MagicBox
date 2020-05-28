import Vue from 'vue'
import App from './App'
import http from '@/service/index.js';

Vue.prototype.$http = http
Vue.config.productionTip = false

import cuCustom from '@/components/colorui/cu-custom.vue'
Vue.component('cuCustom', cuCustom)


App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
