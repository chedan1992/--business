<template>
	<view class="content">
		<mescroll-body :ref="'mescrollRef'" @init="mescrollInit" @down="downCallback()" :up="up" @up="upCallback()" :safearea="true">
			<view class="bg-img flex pd-30 pdt-100">
				<view>
					<image src="../../static/my/touxiang.png" class="w130 h130"></image>
				</view>
				<view class="pdl-30">
					<view class="f36 colorfff">张三</view>
					<view class="f30 colorfff mgt-30">13123456789</view>
				</view>
			</view>
			<view class="">
				<view class="lh100  bg-white pdl-30 pdr-30" @click="goislogin('pages/main/packages/shop/index')">
					<view class="flex-between borderb">
						<view class="flex-center ">
							<image class="w36 h36" src="../../static/my/guanli.png"></image>
							<view class="f30 pdl-14">店铺管理</view>
						</view>
						<view>
							<uni-icons type="arrowright" size="10"></uni-icons>
						</view>
					</view>
				</view>
				<view class="lh100  bg-white pdl-30 pdr-30" @click="goislogin('packages/account/index')">
					<view class="flex-between">
						<view class="flex-center ">
							<image class="w36 h36" src="../../static/my/zhanghao.png"></image>
							<view class="f30 pdl-14">店铺子账号管理</view>
						</view>
						<view>
							<uni-icons type="arrowright" size="10"></uni-icons>
						</view>
					</view>
				</view>
				<view class="lh100 bg-white pdl-30 pdr-30 mgt-30"  @click="go('packages/help/index')">
					<view class="flex-between borderb">
						<view class="flex-center ">
							<image class="w36 h36" src="../../static/my/shangjia.png"></image>
							<view class="f30 pdl-14">商家帮助</view>
						</view>
						<view>
							<uni-icons type="arrowright" size="10"></uni-icons>
						</view>
					</view>
				</view>
				<view class="lh100 bg-white pdl-30 pdr-30" @click="go('packages/phone/index')">
					<view class="flex-between borderb">
						<view class="flex-center ">
							<image class="w36 h36" src="../../static/my/shouji.png"></image>
							<view class="f30 pdl-14">更改手机号</view>
						</view>
						<view>
							<uni-icons type="arrowright" size="10"></uni-icons>
						</view>
					</view>
				</view>
				<view class="lh100 bg-white pdl-30 pdr-30" @click="go('packages/uppwd/index')">
					<view class="flex-between borderb">
						<view class="flex-center ">
							<image class="w36 h36" src="../../static/my/mima.png"></image>
							<view class="f30 pdl-14">修改密码</view>
						</view>
						<view>
							<uni-icons type="arrowright" size="10"></uni-icons>
						</view>
					</view>
				</view>
				<view class="lh100 bg-white pdl-30 pdr-30">
					<view class="flex-between borderb">
						<view class="flex-center ">
							<image class="w36 h36" src="../../static/my/guanyu.png"></image>
							<view class="f30 pdl-14">关于我们</view>
						</view>
						<view>
							<uni-icons type="arrowright" size="10"></uni-icons>
						</view>
					</view>
				</view>
				<view class="lh100 bg-white pdl-30 pdr-30">
					<view class="flex-between">
						<view class="flex-center ">
							<image class="w36 h36" src="../../static/my/shezhi.png"></image>
							<view class="f30 pdl-14">设置</view>
						</view>
						<view>
							<uni-icons type="arrowright" size="10"></uni-icons>
						</view>
					</view>
				</view>
				<view class="lh100 bg-white pdl-30 pdr-30 mgt-30">
					<view class="flex-between">
						<view class="flex-center ">
							<image class="w36 h36" src="../../static/my/kefu.png"></image>
							<view class="f30 pdl-14">联系客服</view>
						</view>
						<view class="flex-center">
							<view class="f26 color666">13123456789</view>
							<uni-icons type="arrowright" size="10"></uni-icons>
						</view>
					</view>
				</view>
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
				up: {
					empty: {
						use: false, // 是否显示空布局
					}
				},
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

<style lang="scss" scoped>
	.content {
		padding: 0;

		.bg-img {
			background-image: url(../../static/my/bg.jpg);
			background-repeat: no-repeat;
			background-size: 100% 100%;

			.w130 {
				width: 130rpx;
			}

			.h130 {
				height: 130rpx;
			}
		}
	}
</style>
