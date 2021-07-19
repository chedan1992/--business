<template>
	<view class="content">
		<mescroll-body :ref="'mescrollRef'" @init="mescrollInit" @down="downCallback()" @up="upCallback()" :safearea="true">
			<view class="item bg-white borderb">
				<view class="pd-30">
					<view class="flex-center">
						<view class="pdr-20 flex-center">
							<image src="../static/msg/xiaoxi1.png" class="w30 h30"></image>
						</view>
						<view>
							<view class="f24 wordW">订单消息</view>
						</view>
					</view>
					<view class="f30 mgt-30">您有待审核订单了</view>
					<view class="f26 color999 mgt-20">请尽快处理</view>
				</view>
			</view>
			<view class="item bg-white borderb">
				<view class="pd-30">
					<view class="flex-center">
						<view class="pdr-20 flex-center">
							<image src="../static/msg/xiaoxi1.png" class="w30 h30"></image>
						</view>
						<view>
							<view class="f24 wordW">订单消息</view>
						</view>
					</view>
					<view class="f30 mgt-30">您有待审核订单了</view>
					<view class="f26 color999 mgt-20">请尽快处理</view>
				</view>
			</view>
		</mescroll-body>
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
				// this.$api.article.help({
				// 	current: mescroll.num,
				// 	size: 10,
				// 	key: this.key
				// }).then(d => {
				// 	//设置列表数据
				// 	//如果是第一页需手动置空列表
				// 	if (d.curPage == 1) this.listData = [];
				// 	if (d.code == 1) {
				// 		this.listData = this.listData.concat(d.data);
				// 		let curPageLen = d.data.length;
				// 		setTimeout((e) => {
				// 			mescroll.endBySize(curPageLen, d.totalCount);
				// 		}, 20)
				// 	} else {
				// 		mescroll.endErr();
				// 	}
				// }).catch(e => {
				// 	mescroll.endErr();
				// })
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
