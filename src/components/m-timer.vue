<template>
	<view>
		<slot name="content" :hms="hms"></slot>
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
				inter: null,
				timespaning: 0,
				hms: null
			}
		},
		props: {
			//秒
			timespan: {
				type: Number,
				default: 0
			},
			endTimer: {
				type: String,
				default: 'endTimer'
			}
		},
		created() {
			this.init();
		},
		watch: {
			timespan(t) {
				if (t > 0) {
					this.hms = {
						second: t
					};
					this.init();
				}
			}
		},
		computed: {},
		beforeDestroy() {
			if (this.inter)
				clearInterval(this.inter)
		},
		methods: {
			init() {
				if (this.timespan > 0) {
					this.timespaning = this.timespan;
					this.inter = setInterval(e => {
						if (this.timespaning <= 0) {
							this.$emit(this.endTimer);
							clearInterval(this.inter)
							return
						}
						this.timespaning = this.timespaning - 1;
						this.hms = format.DateObj(this.timespaning * 1000);
						console.log(this.hms)
					}, 1000)
				} else if (this.inter) {
					clearInterval(this.inter)
				}
			}
		}
	}
</script>

<style>
	.m-input-view {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		/* width: 100%; */
		flex: 1;
		padding: 0 10px;
	}

	.m-input-input {
		flex: 1;
		width: 100%;
		min-height: 100%;
		line-height: inherit;
		background-color: rgba(0, 0, 0, 0);
	}

	.m-input-icon {
		width: 20px;
		font-size: 20px;
		line-height: 20px;
		color: #666666;
	}
</style>
