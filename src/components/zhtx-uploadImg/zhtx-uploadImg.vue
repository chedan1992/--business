<template>
	<view>
		<view class="zhtx-imgs">
			<view class="zhtx-single" :style="'width: '+width+'px;height: '+height+'px;'" v-for="(item, index) in list" :key="index">
				<image :src="item" :data-src="item" mode="aspectFit" @tap="previewImg" />
				<view class="zhtx-del" @tap="deleteItem(index)">x</view>
			</view>
			<view v-if="limit>list.length" :style="'width: '+width+'px;height: '+height+'px;'" class="zhtx-single zhtx-addNew"
			 @tap="chooseFile">
				<view class="zhtx-add color999 f25">+</view>
			</view>
		</view>
		<view class="num" v-if="limit>1">
			<text style="color: #007AFF;font-size: 14px;">{{list.length}}</text>/{{limit}}
		</view>
	</view>
</template>

<script>
	let toast = msg => {
		uni.showToast({
			title: msg,
			icon: 'none'
		});
	}

	export default {
		props: {
			width: {
				type: Number,
				default: 90
			},
			height: {
				type: Number,
				default: 90
			},
			uImgList: {
				type: Array, //附件列表
				default () {
					return {}
				}
			},
			uploadFileUrl: {
				type: String,
				dafault: '#' // 上传文件的服务器url
			},
			header: {
				type: Object, //上传图片到服务器时，HTTP 请求 Header
				default () {
					return {}
				}
			},
			limit: {
				type: Number, //限制可上传的图片数量
				default: 9 //这里有问题???
			},
			fileKeyName: {
				type: String,
				default: 'file' //用于在服务端通过自定义key值获取该文件数据
			},
			canUploadFile: { //是否更新
				type: Boolean,
				default: true
			},
			other: {
				type: Object
			}
		},
		computed: {
			list: {
				get() {
					return this.uImgList
				}
			}
		},
		data() {
			return {
				imageList: [],
				file: [],
			};
		},
		methods: {
			//预览
			previewImg(e) {
				console.log(...this.list);
				uni.previewImage({
					current: e.target.dataset.src,
					loop: true,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: (data) => {
							//可以自定义分享操作
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					},
					urls: this.list //this.imageList,保持删除了的不在
				});
			},
			//删除
			deleteItem(index) {
				uni.showModal({
					title: '提示',
					content: '确定要删除此项吗？',
					success: res => {
						if (res.confirm) {
							this.list.splice(index, 1); //已经达到了数据更新的状态
							this.$forceUpdate(); //强制更新
							this.$emit('update:uImgList', this.list); //类似双向数据绑定
							this.$emit('delete', index);
						}
					}
				});
			},

			chooseFile() {
				//双重保证
				// console.log(this.list);
				if (this.list.length >= this.limit) {
					toast('已达到最大上传数量')
					return;
				}

				let canUploadFile = this.canUploadFile;
				let tempFiles;
				if (canUploadFile) {
					uni.chooseImage({
						count: this.limit - this.list.length,
						sizeType: ['original', 'compressed'],
						sourceType: ['album', 'camera'],
						success: (res) => {
							console.log(res);
							tempFiles = res.tempFilePaths;

							this.imageList = tempFiles;

							this.list.push(...tempFiles) //如果图片一次性就超过这个值怎么使他赋的值回退
							this.file = res.tempFiles;
							if (this.list.length > this.limit) {
								this.list.splice(this.limit)
								toast('已达到最大上传数量')
								return;
							}
							this.upload()
						},
						fail: err => {
							console.log(err);
						}
					});

				}
			},
			upload() {
				let files = [];
				//这里改成异步上传会不会更好(对于跨端请求,只能重复调用api)

				for (let i = 0; i < this.imageList.length; i++) {
					let path = this.imageList[i]
					let index = i.toString()
					this.$api.common.uploadServer({
						name: this.fileKeyName,
						filePath: path,
					}).then(d => {
						if (d.code == 1) {
							this.$emit('update:uImgList', this.list); //类似双向数据绑定
							this.$emit('uploadSuccess', d, this.other);
							this.$forceUpdate();
						} else {
							toast('上传失败,请稍后重试')
						}
					}).catch(e => {
						console.log(e);
					});
				}
			}
		}
	};
</script>

<style scoped>
	.zhtx-imgs {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
	}

	.zhtx-del {
		position: absolute;
		width: 35rpx;
		height: 35rpx;
		background: #f56c6c;
		color: #fff;
		top: 0;
		text-align: center;
		right: 0;
		line-height: 28rpx;
		font-size: 30rpx;
		z-index: 100;
	}

	.zhtx-single {
		position: relative;
		border: 1px solid #ccc;
		margin: 10rpx;
	}

	.zhtx-addNew {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	text {
		font-size: 50rpx;
		color: #999;
	}

	image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.num {
		float: right;
		color: #ccc;
		font-size: 12px;
	}

	.num::after {
		clear: both;
	}
</style>
