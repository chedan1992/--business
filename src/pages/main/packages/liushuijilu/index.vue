<template>
	<view class="content">
		<mescroll-body :ref="'mescrollRef'" @init="mescrollInit" @down="downCallback()" @up="upCallback()" :safearea="true">
			<view id="search" class="flex-between w-calc40 pd-20 bg-white borderb">
				<view class="flex-between inputs">
					<view class="date lh60 h60">
						<MyPicker class="center" mode="date" placeholder="选择时间" :value="1"></MyPicker>
					</view>
					<view class="w50 center">至</view>
					<view class="date lh60 h60">
						<MyPicker class="center" mode="date" placeholder="选择时间" :value="1"></MyPicker>
					</view>
				</view>
				<view>
					<button class="btn mini-btn bg-FF6E44 colorfff lh60 h60">查询</button>
				</view>
			</view>
			<view class="bg-white">
				<view class="dflex pdl-30 pdr-30 lh80 h80 borderb">
					<view class="f26">时间</view>
					<view class="f26 center">金额</view>
					<view class="f26 center">收入/支出</view>
					<view class="f26 center">当前余额</view>
				</view>
				<view class="dflex pdl-30 pdr-30 lh80 h80 borderb">
					<view class="f26 lh40">2021-04-26<br>14:00</view>
					<view class="f26 center">￥3000</view>
					<view class="f26 center">收入</view>
					<view class="f26 center">￥2000</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import mTab from "@/components/m-tab";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"; // 注意.vue后缀不能省
	import unIicons from "@/components/uni-icons/uni-icons.vue";
	import MyPicker from "@/components/m-picker.vue"
	export default {
		components: {
			mTab,
			MescrollBody,
			unIicons,
			MyPicker
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

		.inputs {
			width: calc(100% - 150rpx);

			.date {
				background: #F2F2F2;
				width: calc(50% - 45rpx);

				.serchInput {
					font-size: 13px;
				}

				.plh {
					font-size: 13px;
				}
			}
		}
	}
</style>
