<template>
	<view class="content">
		<mescroll-body :ref="'mescrollRef'" @init="mescrollInit" @down="downCallback()" @up="upCallback()" :safearea="true">
			<view class="item bg-white borderb">
				<view class="flex-between pd-30">
					<view class="flex wordW">
						<view class="w120 h120 pdr-20 flex-center">
							<image src="../static/shop/logo.png" class="w120 h120"></image>
						</view>
						<view class="wordW">
							<view class="f30 mgb-20 wordW">小龙坎望京路店</view>
							<view class="flex-center wordW">
								<view class="w22 h24 pdr-10 flex-center">
									<image src="../static/shop/address.png" class="w22 h24"></image>
								</view>
								<view class="wordW f24 color666">四川省成都市望京路四川省成都市望京路</view>
							</view>
						</view>
					</view>
					<view class="w100 pdl-10 tr">
						<text class="color17B97A f24">正常</text>
					</view>
				</view>
				<view class="tr pdb-20">
					<button class="btn mini-btn bg-white mgr-10">禁用</button>
				</view>
			</view>
			<view class="item bg-white borderb">
				<view class="flex-between pd-30">
					<view class="flex wordW">
						<view class="w120 h120 pdr-20 flex-center">
							<image src="../static/shop/logo.png" class="w120 h120"></image>
						</view>
						<view class="wordW">
							<view class="f30 mgb-20 wordW">小龙坎望京路店</view>
							<view class="flex-center wordW">
								<view class="w22 h24 pdr-10 flex-center">
									<image src="../static/shop/address.png" class="w22 h24"></image>
								</view>
								<view class="wordW f24 color666">四川省成都市望京路四川省成都市望京路</view>
							</view>
						</view>
					</view>
					<view class="w100 pdl-10 tr">
						<text class="colorFF6E44 f24">审核中</text>
					</view>
				</view>
				<view class="tr pdb-20 flex-between">
					<view class="pdl-30 colorFF2E42">驳回原因：店铺位置模糊</view>
					<view>
						<button class="btn mini-btn bg-FF6E44 colorfff mgr-10">编辑</button>
						<button class="btn mini-btn bg-white mgr-10">重新提交</button>
					</view>
				</view>
			</view>
			<view class="item bg-white borderb">
				<view class="flex-between pd-30">
					<view class="flex wordW">
						<view class="w120 h120 pdr-20 flex-center">
							<image src="../static/shop/logo.png" class="w120 h120"></image>
						</view>
						<view class="wordW">
							<view class="f30 mgb-20 wordW">小龙坎望京路店</view>
							<view class="flex-center wordW">
								<view class="w22 h24 pdr-10 flex-center">
									<image src="../static/shop/address.png" class="w22 h24"></image>
								</view>
								<view class="wordW f24 color666">四川省成都市望京路四川省成都市望京路</view>
							</view>
						</view>
					</view>
					<view class="w100 pdl-10 tr">
						<text class="colorFF2E42 f24">驳回</text>
					</view>
				</view>
				<view class="tr pdb-20 flex-between">
					<view class="pdl-30 colorFF2E42">驳回原因：店铺位置模糊</view>
					<view>
						<button class="btn mini-btn bg-FF6E44 colorfff mgr-10">编辑</button>
						<button class="btn mini-btn bg-white mgr-10">重新提交</button>
					</view>
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
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"; // 注意.vue后缀不能省
	export default {
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
		onReady() {

		},
		methods: {
			// 下拉刷新的回调 (mixin默认resetUpScroll)
			downCallback() {
				if (this.mescroll.optUp.use) {
					//重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
					this.mescroll.resetUpScroll()
				} else {
					setTimeout(() => {
						this.mescroll.endSuccess();
					}, 500)
				}
			},
			// 上拉加载的回调
			upCallback() {
				this.getList();
			},
			getList() {
				let mescroll = this.mescroll;
				mescroll.endErr();
				this.$api.shopAdmin.shopList({
					
				}).then(d => {
					//设置列表数据
					//如果是第一页需手动置空列表
					if (d.curPage == 1) this.listData = [];
					if (d.status == 1) {
						this.listData = this.listData.concat(d.data);
						let curPageLen = d.data.length;
						setTimeout((e) => {
							mescroll.endBySize(curPageLen, d.totalCount);
						}, 20)
					} else {
						mescroll.endErr();
					}
				}).catch(e => {
					mescroll.endErr();
				})
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
				color: #17B97A;
			}

			.colorFF2E42 {
				color: #FF2E42;
			}
		}
	}
</style>
