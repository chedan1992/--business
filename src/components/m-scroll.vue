<template>
	<movable-area style="width:100%;height:100%;">
		<movable-view class="movableview" ref="movableView" @change="change" @touchend="touchend" direction="vertical"
		 :disabled="disabled||refreshStatus >= 3" :y="move" :style="'height:'+height">
			<scroll-view :scroll-y="refreshStatus == 1" @scroll="scroll" :scroll-top="scrollTop" :enable-back-to-top="true"
			 :lower-threshold="'40px'" @scrolltolower="more" :style="'height:'+height">
				<view ref="refreshHeight" class="refreshHeight">
					<view v-if="!slotrefresh">
						<view class="center lh50 h50 color999 f14" v-if="refreshStatus == 1">下拉刷新</view>
						<view class="center lh50 h50 color999 f14" v-else-if="refreshStatus == 2">松开更新</view>
						<view class="center lh50 h50" v-else-if="refreshStatus == 3">
							<uni-load-more :contentText="morecontent" :color="'#999'" :showIcon="true" :status="'loading'"></uni-load-more>
						</view>
					</view>
					<slot name="refresh" v-if="slotrefresh"></slot>
				</view>
				<slot name="content"></slot>
				<view v-if="listCount === 0 && emptyShow" class="empty">
					<mEmpty :emptyUrl="emptyUrl" :emptyText="emptyText">
						<slot name="emptyUrl"></slot>
						<slot name="emptyText"></slot>
					</mEmpty>
				</view>
				<view v-if="listCount !== 0 && overOnePage && !disabled" class="scroll__bottom">
					<view class="center lh50" v-if="end">
						<uni-load-more :contentText="morecontent" :color="'#999'" :showIcon="true" :status="'noMore'"></uni-load-more>
					</view>
					<view class="scroll__loading" v-else>
						<uni-load-more :contentText="morecontent" :color="'#999'" :showIcon="true" :status="'loading'"></uni-load-more>
					</view>
				</view>
			</scroll-view>
		</movable-view>
	</movable-area>
</template>

<script>
	import mEmpty from "@/components/m-empty";
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			mEmpty,
			uniLoadMore
		},
		data() {
			return {
				transform: '',
				morecontent: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				height: '0px',
				height1: '0px',
				move: 0,
				refreshHeight: 0,
				scrollTop: 0,
				/* 未渲染数据 */
				mode: 'refresh',
				// refresh 和 more 两种模式
				successShow: false,
				// 显示success
				successTran: false,
				// 过度success
				refreshStatus: 1,
				// 1: 下拉刷新, 2: 松开更新, 3: 加载中, 4: 加载完成
				overOnePage: false,
				timer: null,
				diff: 0,
				windowHeight: 0
			}
		},
		props: { // 加载中
			requesting: {
				type: Boolean,
				default: false
			},
			// 加载完毕
			end: {
				type: Boolean,
				default: false
			},
			// 控制空状态的显示
			emptyShow: {
				type: Boolean,
				default: false
			},
			// 当前列表长度
			listCount: {
				type: Number,
				default: 0
			},
			// 空状态的图片
			emptyUrl: {
				type: String,
				default: "/static/img/wl9.png"
			},
			// 空状态的文字提示
			emptyText: {
				type: String,
				default: "未找到数据"
			},
			// 下拉刷新的高度
			topHeight: {
				type: Number,
				default: 44
			},
			// 是否禁用下拉刷新
			disabled: {
				type: Boolean,
				default: false
			},
			// 下拉插槽
			slotrefresh: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
			this.$nextTick(function() {
				this.init();
			})
		},
		watch: {
			requesting: 'requestingEnd',
			refreshSize: 'refreshChange',
			topHeight(e) {}
		},
		computed: {},
		beforeDestroy() {},
		methods: {
			/**
			 * 处理 bindscrolltolower 失效情况
			 */
			scroll(e) {
				//console.log("===========================scroll" + e);
				// 可以触发滚动表示超过一屏
				this.overOnePage = true;
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.scrollTop = e.detail.scrollTop
				}, 100)
			},

			/**
			 * movable-view 滚动监听
			 */
			change(e) {
				if (this.disabled) {
					return
				}
				let diff = e.detail.y;
				//console.log("===========================change" + diff);
				if (this.refreshStatus >= 3) return;

				if (diff > -10) {
					this.refreshStatus = 2
				} else {
					this.refreshStatus = 1
					//this.move = diff
				}
			},

			/**
			 * movable-view 触摸结束事件
			 */
			touchend() {
				let refreshStatus = this.refreshStatus;
				console.log("===========================touchend" + refreshStatus);
				if (refreshStatus >= 3) return;

				if (refreshStatus === 2) { // 1: 下拉刷新, 2: 松开更新, 3: 加载中, 4: 加载完成
					//使手机发生较短时间的振动
					uni.vibrateShort();
					this.refreshStatus = 3;
					this.move = 0;
					setTimeout(res => {
						this.mode = 'refresh'
						this.$emit('refresh');
					}, 300)
				} else if (refreshStatus === 1) {
					this.move = 0;
					setTimeout(res => {
						this.move = -this.refreshHeight;
					}, 100)
				}
			},
			/**
			 * 加载更多
			 */
			more() {
				if (!this.end) {
					this.mode = 'more'
					this.$emit('more');
				}
			},
			/**
			 * 监听 requesting 字段变化, 来处理下拉刷新对应的状态变化
			 */
			requestingEnd(newVal, oldVal) {
				if (this.mode === 'more') return;
				if (oldVal === true && newVal === false) {
					//加载完成...
					this.refreshStatus = 4;
					this.move = -this.refreshHeight;
					console.log("===========================加载完成..." + this.move);
					setTimeout(res => {
						this.refreshStatus = 1;
					}, 300)
				} else {
					//加载中...
					console.log("===========================加载中...");
					if (this.refreshStatus !== 3) {
						this.refreshStatus = 3;
						this.move = 0;
					}
				}
			},
			init() {

				const query = uni.createSelectorQuery().in(this);
				uni.getSystemInfo({
					success: (res) => {
						console.log(res)
						this.windowHeight = res.windowHeight + 10
						this.height = this.windowHeight + 'px'
						query.select(".refreshHeight").boundingClientRect(d => {
							console.log(d)
							this.refreshHeight = d.height;
							this.move = -this.refreshHeight
							console.log(this.move)
						}).exec()

					}
				});
			}
		}
	}
</script>

<style scoped>
	.movableview {
		width: 100%;
		right: 0;
		bottom: 0;
	}
</style>
