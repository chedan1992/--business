<template>
	<view class="content">
		<mescroll-body :ref="'mescrollRef'" @init="mescrollInit" @down="downCallback()" @up="upCallback()" :safearea="true">
			<view id="search" class="flex-between w-calc40 pd-20 bg-white borderb">
				<view class="inputs">
					<input @confirm="search" placeholder-class="plh" maxlength="10" name="search" confirm-type="search" v-model="key"
					 type="text" placeholder="搜索店铺" class="serchInput" />
				</view>
				<view><button class="btn mini-btn bg-FF6E44 colorfff" @click="getList()">搜索</button></view>
			</view>
			<view class="flex-between pd-10 borderb bg-white" v-for="(item, e) in listData" :key="e" @click="chickNowShop(item)">
				<view class=" pd-20 nameWidth">{{ item.shopname }}</view>
				<view class="mgr-20 colorFF6E44 f26" v-if="item.shopid == nowShop.shopid">
					<image src="/static/dangqian.png" class="w26 h26 mgr-20"></image>
					当前选择
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
	import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue' // 注意.vue后缀不能省
	export default {
		components: {
			MescrollBody
		},
		mixins: [MescrollMixin],
		data() {
			return {
				key: '',
				listData: [],
				nowShop: uni.getStorageSync('chickNowShop')
			}
		},
		onReady() {},
		methods: {
			// 下拉刷新的回调 (mixin默认resetUpScroll)
			downCallback() {
				if (this.mescroll.optUp.use) {
					//重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
					this.mescroll.resetUpScroll()
				} else {
					setTimeout(() => {
						this.mescroll.endSuccess()
					}, 500)
				}
			},
			// 上拉加载的回调
			upCallback() {
				this.getList()
			},
			getList() {
				let mescroll = this.mescroll
				mescroll.endBySize(0, 0)
				mescroll.endErr()
				this.$api.shopAdmin
					.shopList({
						current: mescroll.num,
						size: 10000,
						keyword: this.key,
						isselect: 1
					})
					.then(d => {
						console.log(d)
						//设置列表数据
						//如果是第一页需手动置空列表
						if (mescroll.num == 1) {
							this.listData = []
						}
						if (d.status == 1) {
							this.listData = this.listData.concat(d.data)
							let curPageLen = d.data.length
							setTimeout(e => {
								mescroll.endBySize(curPageLen, curPageLen)
							}, 20)
						} else {
							mescroll.endErr()
						}
					})
					.catch(e => {
						mescroll.endErr()
					})
			},
			chickNowShop(item) {
				uni.setStorageSync('chickNowShop', item)
				this.back()
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 0;

		.inputs {
			background: #f2f2f2;
			width: calc(100% - 200rpx);

			.serchInput {
				background: #f2f2f2;
				font-size: 13px;
				padding-left: 60rpx;
				width: 100%;
				background-image: url('../../static/search.png');
				background-size: 30rpx 30rpx;
				background-repeat: no-repeat;
				background-position: 15rpx center;
				height: 60rpx;
				line-height: 60rpx;
			}

			.plh {
				font-size: 13px;
			}
		}

		.nameWidth {
			width: calc(100% - 250rpx);
		}
	}
</style>
