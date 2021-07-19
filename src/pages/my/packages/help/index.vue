<template>
	<view class="content">
		<mescroll-body :ref="'mescrollRef'" @init="mescrollInit" @down="downCallback()" @up="upCallback()" :safearea="true">
			<view>
				<uni-collapse accordion="true">
					<uni-collapse-item title="标题文字" size="30px">
						<view style="padding: 30rpx;" class="f28">
							手风琴效果
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="标题文字">
						<view style="padding: 30rpx;" class="f28">
							手风琴效果
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="标题文字">
						<view style="padding: 30rpx;" class="f28">
							手风琴效果
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"; // 注意.vue后缀不能省
	import unIicons from "@/components/uni-icons/uni-icons.vue";
	export default {
		components: {
			MescrollBody,
			unIicons
		},
		mixins: [MescrollMixin],
		data() {
			return {
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
				mescroll.endBySize(0, 0);
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
		}

	}
</style>
