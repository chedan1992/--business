/**
 * Created by xnr on 20/05/26.
 */

import {
	format
} from './tool.js'
const extend = {
	data() {
		return {
			islogin:true
		}
	},
	onShareAppMessage() {
		//用户点击右上角分享
	},
	onUnload() {
		//监听页面卸载
	},
	props: {},
	methods: {
		htmlFormat(htmlText) {
			if (htmlText) {
				let str = htmlText.replace(/<img[^>]*>/gi, function(match, capture) {
					// return match.replace(/(<img[^>]*)(\/?>)/gi, "$1width='100%' $2") // 添加width="100%"
					return match.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, 'style="max-width:100%;height:auto;"') // 替换style
				})
				return str
			}
			return ''
		},
		get_height(h, isbar) {
			let barh = isbar ? uni.getSystemInfoSync().statusBarHeight : 0;
			h = h ? h : 44;
			return (uni.getSystemInfoSync().windowHeight - barh - h) + 'px'
		},
		ossFormat(url, type) {
			return format.OssFormat(url, type);
		},
		dateFormat(date, type) {
			return format.DateFormat(date, type);
		},
		errorImg() {
			return ''
		},
		go(url) {
			uni.navigateTo({
				url: url
			});
		},
		goislogin(r) {
			if (this.islogin == false) {
				this.showModal({
					title: '提示',
					content: '您还未登录，快去登录吧？',
				}).then(r => {
					if (r.confirm) {
						this.goTop('../login/login');
					}
				})
			} else {
				this.go(r)
			}
		},
		goTop(url) {
			uni.reLaunch({
				url: url
			});
		},
		back(i) {
			uni.navigateBack({
				delta: i ? i : 1
			});
		},
		showToast(data) {
			return new Promise((reject, resolve) => {
				data.success = function() {
					reject()
				}
				data.file = function() {
					resolve()
				}
				uni.showToast(data);
			})
		},
		showModal(data) {
			return new Promise((reject, resolve) => {
				data.success = function(res) {
					reject(res)
				}
				data.file = function() {
					resolve()
				}
				uni.showModal(data);
			})
		},
		showPopup(id) {
			this.$refs[id].open()
		},
		closePopup(id) {
			this.$refs[id].close()
		}
	}
}

export default extend
