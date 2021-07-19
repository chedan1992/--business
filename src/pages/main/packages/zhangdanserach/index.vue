<template>
	<view class="content">
		<mescroll-body :ref="'mescrollRef'" @init="mescrollInit" @down="downCallback()" @up="upCallback()" :safearea="true">
			<view class="bg-white pdb-100">
				<view id="search_date" class="flex-between w-calc0 pd-20 bg-white borderb">
					<view class="flex-between inputs">
						<view class="date lh60 h60">
							<MyPicker class="center" mode="date" placeholder="选择时间" :value="1"></MyPicker>
						</view>
						<view class="w50 center">至</view>
						<view class="date lh60 h60">
							<MyPicker class="center" mode="date" placeholder="选择时间" :value="1"></MyPicker>
						</view>
					</view>
				</view>
				<view id="search" class="flex-between w-calc40 pd-20 bg-white borderb">
					<view class="inputs">
						<input @confirm="search" placeholder-class="plh" maxlength="10" name="search" confirm-type="search" v-model="key"
						 type="text" placeholder="搜索店铺" class="serchInput" />
					</view>
					<view><button class="btn mini-btn bg-FF6E44 colorfff">搜索</button></view>
				</view>
				<view class="lh100 bg-white pdl-20 pdr-20 borderb" @click="go('packages/uppwd/index')">
					<view class="flex-between">
						<view class="flex-center ">
							<view class="f30">2021-06-10</view>
						</view>
						<view>
							<uni-icons type="arrowright" size="10"></uni-icons>
						</view>
					</view>
					<view class="dflex bordert">
						<view class="">
							<view class="f22">店铺名称</view>
						</view>
						<view class="center ">
							<view class="f22">总单量</view>
						</view>
						<view class="center ">
							<view class="f22">完成单量</view>
						</view>
						<view class="center ">
							<view class="f24">总返现</view>
						</view>
						<view class="center ">
							<view class="f22">实际返现</view>
						</view>
						<view class="center ">
							<view class="f22">总佣金</view>
						</view>
						<view class="center ">
							<view class="f22">结算</view>
						</view>
					</view>
					<view class="dflex bordert">
						<view class="">
							<view class="f22">sdfsffs</view>
						</view>
						<view class="center ">
							<view class="f22">12</view>
						</view>
						<view class="center ">
							<view class="f22">22</view>
						</view>
						<view class="center ">
							<view class="f22">11</view>
						</view>
						<view class="center ">
							<view class="f22">11</view>
						</view>
						<view class="center ">
							<view class="f22">111</view>
						</view>
						<view class="center ">
							<button class="btn mini-btn colorfff pdl-8 pdr-8 mgt-25">完成</button>
						</view>
					</view>
					<view class="dflex bordert">
						<view class="">
							<view class="f22">sdfsffs</view>
						</view>
						<view class="center ">
							<view class="f22">12</view>
						</view>
						<view class="center ">
							<view class="f22">22</view>
						</view>
						<view class="center ">
							<view class="f22">11</view>
						</view>
						<view class="center ">
							<view class="f22">11</view>
						</view>
						<view class="center ">
							<view class="f22">111</view>
						</view>
						<view class="center ">
							<button class="btn mini-btn bg-FF6E44 colorfff pdl-8 pdr-8 mgt-25">结算</button>
						</view>
					</view>
				</view>

			</view>
		</mescroll-body>
		<view class="fixed bottom10 w-calc0">
			<button class="btn bg-FF6E44 colorfff block w-calc100 h80 lh80">导出账单</button>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"; // 注意.vue后缀不能省
	import unIicons from "@/components/uni-icons/uni-icons.vue";
	import MyPicker from "@/components/m-picker.vue"
	export default {
		components: {
			MescrollBody,
			unIicons,
			MyPicker
		},
		mixins: [MescrollMixin],
		data() {
			return {
				key: '',
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

		.w200 {
			width: 200rpx;
		}

		#search {
			.inputs {
				background: #F2F2F2;
				width: calc(100% - 200rpx);

				.serchInput {
					background: #F2F2F2;
					font-size: 13px;
					padding-left: 60rpx;
					width: 100%;
					background-image: url('/static/search.png');
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
		}

		.inputs {
			width: calc(100% - 40rpx);

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
