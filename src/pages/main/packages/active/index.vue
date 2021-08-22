<template>
	<view class="content">
		<uni-nav-bar color="#fff" leftIcon="arrowleft" @clickLeft="back" :fixed="false" :border="false" :statusBar="true"
		 :backgroundColor="'#FF6E44'">
			<view class="center w-calc0" @click="goislogin('../../../selshop/index')">
				<text class="colorfff">{{ nowShop.shopname }}</text>
				<image class="w12 h8 mgl-10" src="/static/dropdown.png"></image>
			</view>
		</uni-nav-bar>
		<view ref="nav" id="nav" class="bg-white borderb">
			<mTab flex="dflex" :lineWidth="40" id="category" :tab-data="categoryData" :tab-cur-index="categoryCur" @change="toggleCategory"></mTab>
		</view>
		<swiper :current="categoryCur" :duration="300" @animationfinish="animationFinish" class="myswiper" :style="{height: get_height(86, true)}">
			<swiper-item v-for="(item, i) in categoryData" :key="i" class="my-swiper-item">
				<mescroll-uni :ref="'mescrollRef' + i" @init="mescrollInit" @down="downCallback(i)" @up="upCallback(i)" :safearea="true"
				 :fixed="false" :bottombar="false" :height="get_height(86, true)">
					<view class="item bg-white borderb" v-for="(items, i) in item.listData" :key="i">
						<view class="status">
							<image :src="items.isaudit == 1 ? shenhe : items.isaudit == 2 ? jinxingzhong : bohui" class="img"></image>
						</view>
						<view class="flex pd-30">
							<view class="w120 h120 pdr-20 flex-center">
								<image :src="ossFormat(items.shoplogo)" class="w120 h120"></image>
							</view>
							<view class="wordW2">
								<view class="f30 mgb-10 wordW">{{ items.shopname }}</view>
								<view class="flex-center">
									<view class="wordW2 f24 color666">{{ items.tips }}</view>
								</view>
							</view>
						</view>
						<view class="pdl-30 pdb-30">
							<view class="colorFF6E44 f24 mgb-10">总共{{ items.totalnumber }}单，剩余{{ items.todaybuyednumber }}单</view>
							<view class="colorFF2E42 f24 mgb-10" v-if="items.reason">驳回原因：{{ items.reason }}</view>
							<view class="dflex flex-between">
								<view class="color999 f24 wid">
									{{ items.starttime }}至{{ items.endtime }} <br />每日{{ items.todaystarttime }}-{{ items.todayendtime }}
								</view>
								<view class="flex-between">
									<button class="btn mini-btn bg-white mgr-10 f28" v-show="items.isforbid == 0" @click="changeType(items.activityid, items.isforbid)">
										禁用
									</button>
									<button class="btn mini-btn bg-white mgr-10 f28" v-show="items.isforbid == 1" @click="changeType(items.activityid, items.isforbid)">
										启用
									</button>
									<button class="btn mini-btn bg-white mgr-10 f28" v-show="items.isaudit == 3" @click="del(items.activityid)">删除</button>
									<button class="btn mini-btn bg-FF6E44 colorfff mgr-10 f28" v-show="items.isaudit == 3" @click="tijiao(items.activityid)">
										重新提交
									</button>
									<button class="btn mini-btn bg-FF6E44 colorfff mgr-10 f28" v-show="items.isaudit != 1" @click="look(items.activityid)">
										查看订单
									</button>
								</view>
							</view>
						</view>
					</view>
				</mescroll-uni>
			</swiper-item>
		</swiper>
		<view>
			<movable-area class="fixed right100 bottom10 w0 h-calc100">
				<movable-view class="w100 h100" direction="vertical" :y="9999">
					<template>
						<image @click="go('../activeadd/index')" src="../static/active/add.png" class="w100 h100"></image>
					</template>
				</movable-view>
			</movable-area>
		</view>
	</view>
</template>

<script>
	import mTab from '@/components/m-tab'
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
	import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue' // 注意.vue后缀不能省
	export default {
		components: {
			mTab,
			MescrollUni
		},
		mixins: [MescrollMixin],
		data() {
			return {
				key: '',
				categoryCur: 0,
				categoryData: [{
						name: '全部',
						typeId: 0,
						listData: []
					},
					{
						name: '待审核',
						typeId: 1,
						listData: []
					},
					{
						name: '未开始',
						typeId: 2,
						listData: []
					},
					{
						name: '进行中',
						typeId: 3,
						listData: []
					},
					{
						name: '已结束',
						typeId: 4,
						listData: []
					}
				],
				bohui: require('../static/active/bohui.png'),
				jinxingzhong: require('../static/active/jinxingzhong.png'),
				shenhe: require('../static/active/shenhe.png'),
				weikaishi: require('../static/active/weikaishi.png'),
				yijingyong: require('../static/active/yijingyong.png')
			}
		},
		onReady() {},
		onShow() {},
		methods: {
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				mescroll.optDown.auto = false
				mescroll.isUpAutoLoad = true
				if (this.mescrolls.length == 0) {
					this.mescroll = mescroll
					if (mescroll) {
						this.mescrolls.push(mescroll)
						setTimeout(() => {
							this.mescroll.resetUpScroll()
						}, 300)
					}
					this.mescrollInitByRef() // 兼容字节跳动小程序
				} else {
					if (mescroll) {
						this.mescrolls.push(mescroll)
					}
				}
			},
			// 以ref的方式初始化mescroll对象 (兼容字节跳动小程序: http://www.mescroll.com/qa.html?v=20200107#q26)
			mescrollInitByRef() {
				if (!this.mescroll || !this.mescroll.resetUpScroll) {
					let mescrollRef = this.$refs['mescrollRef' + this.categoryCur]
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
						this.mescroll.endSuccess()
					}, 500)
				}
			},
			// 上拉加载的回调
			upCallback(index) {
				// mixin默认延时500自动结束加载
				this.getList(index)
			},
			getList(index) {
				if (this.mescrolls.length == 0) {
					return
				}
				let mescroll = this.mescrolls[index]
				let pageData = this.categoryData[index]
				mescroll.endBySize(0, 0)
				this.$api.active
					.getActivityList({
						pindex: mescroll.num,
						psize: mescroll.size,
						shopid: this.nowShop.shopid,
						key: this.key,
						status: pageData.typeId
					})
					.then(d => {
						//设置列表数据
						//如果是第一页需手动置空列表
						if (mescroll.num == 1) pageData.listData = []
						if (d.status == 1) {
							pageData.listData = pageData.listData.concat(d.data)
							let curPageLen = d.data.length
							this.$set(this.categoryData, index, pageData)
							setTimeout(e => {
								mescroll.endBySize(curPageLen, d.totalCount)
							}, 20)
						} else {
							mescroll.endErr()
						}
					})
					.catch(e => {
						mescroll.endErr()
					})
			},
			toggleCategory(e, i) {
				this.categoryCur = i
				this.mescroll = this.mescrolls[this.categoryCur]
				if (this.categoryData[this.categoryCur].listData && this.categoryData[this.categoryCur].listData.length == 0) {
					this.mescroll.resetUpScroll()
				}
			},
			// 页面滑动切换事件
			animationFinish(e) {
				setTimeout(() => {
					this.categoryCur = e.detail.current
					this.mescroll = this.mescrolls[this.categoryCur]
				}, 0)
			},
			look(e) {
				this.goTop('/pages/order/index?activityid=' + e)
			},
			tijiao(e) {
				this.go('../activeadd/index?id=' + e)
			},
			del(e) {
				let activityid = e,
					that = this
				uni.showModal({
					title: '提示',
					content: '确定要删除此项吗？',
					success: res => {
						if (res.confirm) {
							that.$api.active
								.deleteActivity({
									activityid: activityid
								})
								.then(d => {
									if (d.status == 1) {
										that.showToast({
											duration: 3000,
											title: '操作成功'
										}).then(r => {
											that.downCallback()
										})
									}
								})
								.catch(e => {
									console.log(e)
								})
						}
					}
				})
			},
			changeType(e, status) {
				let that = this
				this.$api.active
					.updateStatusActivity({
						activityid: e,
						isforbid: status == 0 ? 1 : 0
					})
					.then(d => {
						if (d.status == 1) {
							this.showToast({
								duration: 3000,
								title: '操作成功'
							}).then(r => {
								that.downCallback()
							})
						}
					})
					.catch(e => {
						console.log(e)
					})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 0;

		.item {
			position: relative;

			.status {
				left: 0px;
				top: 0px;
				position: absolute;
				z-index: 11;

				.img {
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

			.color17B97A {
				color: #17b97a;
			}

			.colorFF2E42 {
				color: #ff2e42;
			}
		}
	}
</style>
