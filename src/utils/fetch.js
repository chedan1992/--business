import {
	url_config
} from './config.js'

import store from '../store/index.js'

const headers = {}
const PORT1 = '/baseinfo'
let is110 = false

export function request(res) {
	if (res.loading) {
		uni.showLoading({
			title: '加载中...'
		});
	}
	headers['Accept'] = 'application/json'
	if (res.requestBody == "body") {
		headers['Content-Type'] = 'application/json'
	} else {
		headers['Content-Type'] = 'application/x-www-form-urlencoded'
	}

	let uniToken = uni.getStorageSync('uniToken')
	if (uniToken) {
		headers['Authorization'] = uniToken.issuer + ' ' + uniToken.token
	}

	return new Promise((reject, resolve) => {
		uni.request({
			url: url_config + res.url,
			method: res.method,
			data: res.data,
			dataType: 'json',
			header: headers,
			success: (d) => {
				if (d.statusCode == 200) {
					console.log("request:success==================================" + res.url);
					// console.log(JSON.stringify(d.data));
					if (d.data.code == 110 && !is110) {
						is110 = true
						uni.showModal({
							showCancel: false,
							title: '提示',
							content: '您登录已过期，请重新的登录',
							success(r) {
								is110 = false
								uni.navigateTo({
									url: '/pages/login/login'
								});
							}
						});
						return
					}
					reject && reject(d.data)
				}
			},
			fail: (error) => {
				console.log("request:fail==================================" + res.url);
				console.log(JSON.stringify(error));
				resolve && resolve(error)
			},
			complete: (e) => {
				if (res.loading) {
					setTimeout(function() {
						uni.hideLoading();
					}, 300);
				}
			}
		})
	})
}

/**
 * 
 * 
 */
export function uploadFile(res) {
	// let uniToken = uni.getStorageSync('uniToken')
	// if (uniToken) {
	// 	headers['Authorization'] = uniToken.issuer + ' ' + uniToken.token
	// }

	uni.showLoading({
		title: '上传中...'
	});
	return new Promise((reject, resolve) => {
		console.log(res.data)

		let uploadTask = uni.uploadFile({
			//header: headers,
			url: url_config + res.url,
			formData: {
				suffix: res.data.suffix
			},
			name: res.data.name,
			filePath: res.data.filePath,
			//files:res.data.files,
			success: (d) => {
				if (d.statusCode == 200) {
					console.log("uploadFile:success======================" + res.url);
					console.log(d.data);
					reject && reject(JSON.parse(d.data))
				}
			},
			fail: (error) => {
				console.log("uploadFile:fail======================" + res.url);
				resolve && resolve(error)
			},
			complete: (e) => {
				setTimeout(function() {
					uni.hideLoading();
				}, 300);
			}
		})

		uploadTask.onProgressUpdate((res) => {
			console.log('上传进度' + res.progress);
			console.log('已经上传的数据长度' + res.totalBytesSent);
			console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

			res.onProgressUpdate && res.onProgressUpdate(res)

			// 测试条件，取消上传任务。
			if (res.progress > 50) {
				//中断上传任务
				//uploadTask.abort();
			}
		});

	})

}
