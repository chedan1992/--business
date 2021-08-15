<template>
	<view class="content">
		<mescroll-body :ref="'mescrollRef'" @init="mescrollInit" @down="downCallback()" @up="upCallback()" :safearea="true">
			<view class="item bg-white borderb" v-for="(item, e) in listData" :key="e">
				<view class="flex-between pd-30">
					<view class="flex wordW">
						<view class="w120 h120 pdr-20 flex-center">
							<image :src="ossFormat(item.shoplogo)" class="w120 h120"></image>
						</view>
						<view class="wordW">
							<view class="f30 mgb-20 wordW">{{ item.shopname }}</view>
							<view class="flex-center wordW">
								<view class="w22 h24 pdr-10 flex-center">
									<image src="../static/shop/address.png" class="w22 h24"></image>
								</view>
								<view class="wordW f24 color666">{{ item.shopaddress }}</view>
							</view>
						</view>
					</view>
					<view class="w100 pdl-10 tr">
						<text class=" f24" :class="{colorFF6E44: item.isaudit == 1, color17B97A: item.isaudit == 2, colorFF2E42: item.isaudit == 3}">
							{{ item.isaudit | aa }}
						</text>
					</view>
				</view>
				<view class="tr pdb-20 flex-between" v-if="item.isaudit == 3">
					<view class="pdl-30 colorFF2E42">驳回原因：{{ item.reason }}</view>
					<view>
						<button class="btn mini-btn bg-FF6E44 colorfff mgr-10">编辑</button>
						<!-- <button class="btn mini-btn bg-white mgr-10">重新提交</button> -->
					</view>
				</view>
				<view class="tr pdb-20" v-if="item.isaudit != 3">
					<button class="btn mini-btn bg-white mgr-10" v-if="item.isaudit == 2" @click="updateShopStatus(item.shopid, item.isdelete)">
						{{ item.isdelete == 0 ? '禁用' : '启用' }}
					</button>
					<button class="btn mini-btn bg-FF6E44 colorfff mgr-10" v-if="item.isaudit != 2" @click="bianji(item.shopid)">编辑</button>
					<!-- <button class="btn mini-btn bg-white mgr-10" v-if="item.isaudit == 3">重新提交</button> -->
				</view>
			</view>
		</mescroll-body>
		<view>
			<movable-area class="fixed right100 bottom10 w0 h-calc100">
				<movable-view class="w100 h100" direction="vertical" :y="9999">
					<template>
						<image @click="go('../shopadd/index')" src="../static/shop/add.png" class="w100 h100"></image>
					</template>
				</movable-view>
			</movable-area>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
	import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue' // 注意.vue后缀不能省
	export default {
		filters: {
			aa(ele) {
				if (ele == 1) {
					return '审核中'
				} else if (ele == 2) {
					return '正常'
				} else if (ele == 3) {
					return '驳回'
				}
			}
		},
		components: {
			MescrollBody
		},
		mixins: [MescrollMixin],
		data() {
			return {
				key: '',
				listData: []
			}
		},
		onReady() {},
		onShow() {
			this.downCallback()
		},
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
						isselect: 0
					})
					.then(d => {
						console.log(d)
						//设置列表数据
						//如果是第一页需手动置空列表
						if (mescroll.num == 1) this.listData = []
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
			updateShopStatus(id, status) {
				this.$api.shopAdmin
					.updateShopStatus({
						shopid: id,
						status: status == 0 ? 1 : 0
					})
					.then(d => {
						if (d.status == 1) {
							this.showToast({
								duration: 3000,
								title: '操作成功'
							}).then(r => {
								this.getList()
							})
						}
					})
					.catch(e => {
						mescroll.endErr()
					})
			},
			bianji(id) {
				this.go('../shopadd/index?id=' + id)
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 0;

		.item {
			.w120 {
				width: 120rpx;
			}

			.h120 {
				height: 120rpx;
			}

			.color17B97A {
				color: #17b97a;
			}

			.colorFF2E42 {
				color: #ff2e42;
			}
		}
	}
</style>
