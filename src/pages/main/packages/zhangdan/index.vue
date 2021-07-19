<template>
	<view class="content">
		<uni-nav-bar color="#fff" leftIcon="arrowleft" @clickLeft="back" :fixed="true" :border="false" :statusBar="true"
		 :backgroundColor="'#FF6E44'">
			<view class="center w-calc0">
				<text class="colorfff">小龙坎北京路店</text>
				<image class="w12 h8 mgl-10" src="/static/dropdown.png"></image>
			</view>
		</uni-nav-bar>
		<mescroll-body :ref="'mescrollRef'" @init="mescrollInit" @down="downCallback()" @up="upCallback()" :safearea="true">
			<view class="bg-white">
				<view class="dflex center pdt-40 pdb-40 pdr-10 pdl-10">
					<view>
						<view class="f30">98463583.40</view>
						<view class="f24">总返现(元)</view>
					</view>
					<view>
						<view class="f30">98463583.40</view>
						<view class="f24">总单量</view>
					</view>
					<view>
						<view class="f30">98463583.40</view>
						<view class="f24">总佣金(元)</view>
					</view>
				</view>
			</view>
			<view class="h20"></view>
			<view class="bg-white">
				<view class="flex-between pd-30">
					<view class="f30 bold">最近1个月</view>
					<view class="flex-center" @click="go('../zhangdanserach/index')">
						<view class="f26">查看更多</view>
						<uni-icons class="mgt-6" type="arrowright" size="10"></uni-icons>
					</view>
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
	</view>
</template>

<script>
	import mTab from "@/components/m-tab";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"; // 注意.vue后缀不能省
	import unIicons from "@/components/uni-icons/uni-icons.vue";
	export default {
		components: {
			mTab,
			MescrollBody,
			unIicons
		},
		mixins: [MescrollMixin],
		data() {
			return {
				key: '',
				listData: [],
				categoryData: [{
					name: '最近3天',
				}, {
					name: '最近7天',
				}]
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

	}
</style>
