<template>
	<view class="content">
		<view id="search" class="flex-between w-calc40 pd-20 bg-white borderb">
			<view class="inputs">
				<input @confirm="search" placeholder-class="plh" maxlength="10" name="search" confirm-type="search" v-model="key"
				 type="text" placeholder="订单号|平台订单号|客户手机号" class="serchInput" />
			</view>
			<view><button class="btn mini-btn bg-FF6E44 colorfff">搜索</button></view>
		</view>
		<view id="popu" class="bg-white pd-10 borderb">
			<view class="dflex flex-center">
				<view class="center" @click="showSearch">
					<text>筛选订单</text>
					<image class="dropdownbank mgl-10" src="/static/dropdownbank.png"></image>
				</view>
				<view class="center pd-9" @click="go('/pages/selshop/index')">
					<text class="color333">小龙坎北京路店</text>
					<image class="dropdownbank mgl-10" src="/static/dropdownbank.png"></image>
				</view>
			</view>
		</view>
		<view ref="nav" id="nav" class="bg-white borderb">
			<mTab flex="dflex" :lineWidth="40" id="category" :tab-data="categoryData" :tab-cur-index="categoryCur" @change="toggleCategory"></mTab>
		</view>
		<swiper :current="categoryCur" :duration="300" @animationfinish="animationFinish" class="myswiper" :style="{height: get_height(120,true)}">
			<swiper-item v-for="(item, i) in categoryData" :key="i" class="my-swiper-item">
				<mescroll-uni :ref="'mescrollRef'+i" @init="mescrollInit" @down="downCallback(i)" @up="upCallback(i)" :safearea="true"
				 :fixed="false" :bottombar="false">
					<view class="item bg-white borderb" @click="go('packages/orderdetail/index')">
						<view class="status">
							<image src="/static/order/feihuiyuan.png" class="img"></image>
						</view>
						<view class="flex pd-30">
							<view class="w120 h120 pdr-20 flex-center">
								<image src="../../static/main/huodong.png" class="w120 h120"></image>
							</view>
							<view class="wordW2">
								<view class="f30 mgb-10 wordW">东门高端料理，东门高端料理，宝宝们入股不亏</view>
								<view class="flex-center">
									<view class="wordW2 f24 color666">五星好评，20字以上，2-4张图片（记得上传到 小程序）</view>
								</view>
							</view>
						</view>
						<view class="flex-between pdl-30 pdr-30 pdb-30">
							<view class="flex-center">
								<view>
									<view class="colorFF6E44 f24">满30减20</view>
									<view class="color999 f24">2021-04-26 14:00</view>
								</view>
								<view>
									<image src="/static/order/phone.png" class="w21 h26 mgl-30"></image>
								</view>
							</view>
							<view class="tr">
								<button class="btn mini-btn bg-white mgr-10">拒绝</button>
								<button class="btn mini-btn bg-FF6E44 colorfff mgr-10">通过</button>
							</view>
						</view>
					</view>
				</mescroll-uni>
			</swiper-item>
		</swiper>

		<uni-popup ref="popup" type="top">
			<view class="box bg-white">
				<view class="pd-30">
					<view class="tit">平台活动</view>
					<view class="tl type">
						<button class="btn bg-white mgr-20 active">全部</button>
						<button class="btn bg-white mgr-20">美团</button>
						<button class="btn bg-white">饿了么</button>
					</view>
					<view class="tit">订单时间</view>
					<view class="dflex">
						<view>
							<MyPicker mode="date" placeholder="选择时间" :value="1"></MyPicker>
						</view>至
						<view>
							<MyPicker mode="date" placeholder="选择时间" :value="1"></MyPicker>
						</view>
					</view>
					<view class="tit">省市区</view>
					<view>
						<MyPicker mode="region" placeholder="请选择" :value="[0,1,2]"></MyPicker>
					</view>
				</view>
				<view class="dflex footer">
					<button class="btn mini-btn bg-white">拒绝</button>
					<button class="btn mini-btn bg-FF6E44 colorfff">通过</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import mTab from "@/components/m-tab";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"; // 注意.vue后缀不能省
	import MyPicker from "@/components/m-picker.vue"
	export default {
		components: {
			mTab,
			MyPicker,
			MescrollUni
		},
		mixins: [MescrollMixin],
		data() {
			return {
				H: 0,
				titH: 0,
				popuH: 0,
				navH: 0,
				key: '',
				categoryCur: 0,
				categoryData: [{
					name: '全部',
					typeId: 0,
					listData: []
				}, {
					name: '待上传',
					typeId: 0,
					listData: []
				}, {
					name: '待审核',
					typeId: 0,
					listData: []
				}, {
					name: '已完成',
					typeId: 0,
					listData: []
				}]
			}
		},
		onReady() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#search').boundingClientRect(data => {
				this.titH = data.height
			}).exec();
			query.select('#popu').boundingClientRect(data => {
				this.popuH = data.height
			}).exec();
			query.select('#nav').boundingClientRect(data => {
				this.navH = data.height
			}).exec();
		},
		methods: {
			showSearch() {
				this.$refs.popup && this.$refs.popup.open()
			},
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				if (this.mescrolls.length == 0) {
					this.mescroll = mescroll;
					if (mescroll) {
						this.mescrolls.push(mescroll)
					}
					this.mescrollInitByRef(); // 兼容字节跳动小程序
				} else {
					if (mescroll) {
						this.mescrolls.push(mescroll)
					}
				}
			},
			// 以ref的方式初始化mescroll对象 (兼容字节跳动小程序: http://www.mescroll.com/qa.html?v=20200107#q26)
			mescrollInitByRef() {
				if (!this.mescroll || !this.mescroll.resetUpScroll) {
					let mescrollRef = this.$refs['mescrollRef' + this.categoryCur];
					if (mescrollRef) {
						this.mescroll = mescrollRef.mescroll
						this.mescrolls.push(this.mescroll)
					}
				}
			},
			// 下拉刷新的回调 (mixin默认resetUpScroll)
			downCallback(i) {
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
			upCallback(index) {
				// mixin默认延时500自动结束加载
				this.getList(index);
			},
			getList(index) {
				let mescroll = this.mescrolls[index];
				let pageData = this.categoryData[index];
				mescroll.endBySize(0, 0);
				return
				this.$api.drycargo.list({
					current: mescroll.num,
					size: mescroll.size,
					key: this.key,
					typeId: pageData.typeId
				}).then(d => {
					//设置列表数据
					//如果是第一页需手动置空列表
					if (d.curPage == 1) pageData.listData = [];
					if (d.code == 1) {
						pageData.listData = pageData.listData.concat(d.data);
						let curPageLen = d.data.length;
						this.$set(this.categoryData, index, pageData);
						setTimeout((e) => {
							mescroll.endBySize(curPageLen, d.totalCount);
						}, 20)
					} else {
						mescroll.endErr();
					}
				}).catch(e => {
					mescroll.endErr();
				})
			},
			toggleCategory(e, i) {
				this.categoryCur = i
				this.mescroll = this.mescrolls[this.categoryCur];
				console.log(this.mescroll)
			},
			// 页面滑动切换事件
			animationFinish(e) {
				setTimeout(() => {
					this.categoryCur = e.detail.current
					this.mescroll = this.mescrolls[this.categoryCur];
					//console.log(this.mescroll)
				}, 0);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0;

		.item {
			position: relative;
			.status{
				left: 0px;
				top: 0px;
				position: absolute;
				z-index: 11;
				.img{
					height: 100rpx;
					width: 100rpx;
				}
			}
			.w120 {
				width: 120rpx;
			}

			.h120 {
				height: 120rpx;
			}
		}

		#popu {
			.dropdownbank {
				width: 12rpx;
				height: 8rpx;
			}
		}

		.inputs {
			background: #F2F2F2;
			width: calc(100% - 200rpx);

			.serchInput {
				background: #F2F2F2;
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
	}

	.box {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		width: 100%;

		.tit {
			line-height: 33px;
			font-size: 13px;
		}

		.type {
			.btn {
				height: 30px;
				line-height: 30px;
				padding: 0px 30px;

				&.active {
					background-color: #FFF8F6;
					border: 1px solid #FF6E45;
					color: #FF6E45;
				}
			}
		}

		.footer .btn {
			border-radius: 0px;
			height: 40px;
			line-height: 40px;
		}
	}
</style>
