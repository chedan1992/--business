<template>
	<view>
		<picker :mode="mode" :value="pickerValue" :range="rangeData" @change="changed" @columnchange="columnchange"
		 :range-key="rangeText">
			<view class="uni-picker" :class="{plh:text===''}">{{text||placeholder}}</view>
		</picker>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				rangeData: [],
				pickerValue: '',
				text: ''
			}
		},
		props: {
			range: {
				type: Array,
				default: e => [],
			},
			mode: {
				type: String,
				default: 'selector'
			},
			value: {
				type: [Number, String, Array],
				default: ''
			},
			rangeValue: {
				type: String,
				default: ''
			},
			rangeText: {
				type: String,
				default: ''
			},
			/**
			 * change事件
			 */
			change: {
				type: String,
				default: 'change'
			},
			/**
			 * placeholder
			 */
			placeholder: {
				type: String,
				default: '请选择'
			},
			iffx: {
				type: String,
				default: '-'
			}
		},
		watch: {
			range: {
				immediate: true,
				handler(v) {
					this.rangeData = v;
					this.settext()
				}
			},
			value: {
				immediate: true,
				handler(v) {
					this.pickerValue = v;
					this.settext()
				}
			},
		},
		created() {},
		methods: {
			settext() {
				if (this.mode == 'multiSelector') {
					this.getfullName();
				} else if (this.mode == 'selector') {
					let r = this.rangeData.find(e => e[this.rangeValue] == this.pickerValue)
					this.text = r ? r[this.rangeText] : ''
				} else {
					this.text = this.pickerValue;
				}
			},
			changed(e) {
				this.pickerValue = e.target.value
				this.settext()
				this.$emit(this.change, this.pickerValue, this.text)
				this.$forceUpdate(); //强制更新
			},
			columnchange(e) {
				var r = this.rangeData[e.detail.column][e.detail.value];
				this.$emit('columnchange', r, e.detail.column + 1, e.detail.value);
			},
			getfullName() {
				let texts = []
				if (this.pickerValue) {
					this.rangeData.forEach((e, i) => {
						e.forEach((c, j) => {
							if (c[this.rangeValue] == this.pickerValue[i]) {
								texts.push(c[this.rangeText]);
							}
						})
					})
				}
				this.text = texts.join(this.iffx);
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
