<template>
	<view ref="tab" class="mytab" :style="'width:'+width+'px'">
		<scroll-view class="scroll-view" :style="'line-height:'+height+'px'" scroll-x="true" :scroll-with-animation="true" :scroll-left="scrollLeft">
			<view :class="flex">
				<view @tap="tabChange(e,i)" class="mytab-item pdl-10 pdr-10 center" v-for="(e,i) in tabData" :key="i">
					<span class="" :class="tabCur==i?curClass:defaultClass">{{e.name}}</span>
					<i v-if="lineWidth>0&&tabCur==i" class="line bg-FF6E44" :class="'w'+lineWidth" :style="'margin-left:-'+(lineWidth/2)+'rpx;'"></i>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		format
	} from '@/utils/tool.js';
	export default {
		components: {

		},
		data() {
			return {
				tabItems: [],
				width: 0,
				tabCur: 0,
				scrollLeft: 0 //左边滚动距离
			}
		},
		props: {
			flex: {
				type: String,
				default: 'flex',
			},
			// 数据源
			tabData: {
				type: Array,
				default: () => []
			},
			height: {
				type: Number,
				default: 40
			},
			defaultClass: {
				type: String,
				default: ''
			},
			curClass: {
				type: String,
				default: 'colorFF6E44'
			},
			lineWidth: {
				type: Number,
				default: 0
			},
			tabCurIndex: {
				type: Number,
				default: 0
			}
		},
		mounted() {
			this.init();
		},
		watch: {
			tabCurIndex(i) {
				this.tabCur = i;
				this.scrollByIndex(i);
			},
		},
		computed: {},
		beforeDestroy() {},
		methods: {
			init() {
				uni.getSystemInfo({
					success: (res) => {
						this.width = res.windowWidth;
					}
				});
				this.tabCur = this.tabCurIndex;
				this.createSelectorQuery().selectAll(".mytab-item").boundingClientRect(res => {
					this.tabItems = res
					this.scrollByIndex(this.tabCur);
				}).exec();
			},
			tabChange(e, i) {
				this.tabCur = i;
				this.$emit('change', e, i)
				this.scrollByIndex(i);
			},
			scrollByIndex(i) {
				let item = this.tabItems[i];
				if (!item) return;
				let itemWidth = item.width || 0,
					itemLeft = item.left || 0;
				// 超出滚动的情况
				// 保持滚动后当前 item '尽可能' 在屏幕中间
				let scrollLeft = itemLeft - (this.width - itemWidth) / 2;
				this.scrollLeft = scrollLeft
			}
		}
	}
</script>

<style scoped>
	.mytab .flex {
		flex-wrap: nowrap;
	}

	.mytab-item {
		position: relative;
		min-width: 70px;
	}

	.mytab-item .line {
		height: 2px;
		position: absolute;
		bottom: 10%;
		left: 50%;
	}
</style>
