import http from './index.js';
export const getLiveList = (data) => {
	return http.get('/live/list', data)
}

export const getVideoUrl = (data) => {
	return http.get('/live/video', data)
}
