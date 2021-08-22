<template>
	<view class="content">
		<view id="search" class="flex-between pd-30 bg-white borderb">
			<view class="inputs" style="background-color:#F2F2F2;width:calc(100% - 140rpx)">
				<input @confirm="search" placeholder-class="plh" name="search" confirm-type="search" v-model="key" type="text"
				 placeholder="搜索店铺" class="serchInput pdl-20" />
			</view>
			<view><button class="btn bg-FF6E44 colorfff w140 h60 lh60" style="border-radius:0" @click="getList()">搜索</button></view>
		</view>
		<view class="bg-white pdl-15 mgt-30">
			<checkbox-group @change="checkboxChange">
				<label class="width100 flex pd-30 borderb" v-for="item in items" :key="item.shopid">
					<view class="mgr-20">
						<checkbox style="transform:scale(0.8)" :value="item.shopid" :checked="item.checked" />
					</view>
					<view class="f30">{{ item.shopname }}</view>
				</label>
			</checkbox-group>
		</view>
		<view class="fixed bottom0">
			<button class="btn bg-FF6E44 colorfff lh80 h80 block" @click="submit()">确认添加</button>
		</view>
	</view>
</template>

<script>
	import unIicons from '@/components/uni-icons/uni-icons.vue'
	export default {
		components: {},
		data() {
			return {
				items: [],
				labelStyle: {
					color: '#333',
					fontSize: '30rpx',
					width: '200rpx'
				},
				selectId: [],
				select: [],
				key: ''
			}
		},
		onReady() {},
		onLoad() {
			this.select = uni.getStorageSync('addShop')
			this.getList()
		},
		methods: {
			getList() {
				this.$api.shopAdmin
					.shopList({
						current: 1,
						size: 10000,
						isselect: 1,
						keyword: this.key
					})
					.then(d => {
						this.items = d.data.map(e => {
							if (this.select && this.select.findIndex(c => c.shopid == e.shopid) >= 0) {
								e.checked = true
							} else {
								e.checked = false
							}
							return e
						})
					})
					.catch(e => {})
			},
			checkboxChange: function(e, i) {
				let values = e.detail.value
				let items = this.items.concat()
				this.select = []
				this.items = items.map(i => {
					if (values.indexOf(i.shopid + '') > -1) {
						i.checked = true
						if (this.select.findIndex(c => c.shopid == e.shopid) < 0) {
							this.select.push(i)
						}
					} else {
						i.checked = false
					}
					return i
				})
			},
			submit() {
				if (!this.select || this.select && this.select.length == 0) {
					this.showToast({
						title: '请选择要添加的店铺',
						icon: 'none'
					})
					return
				} else {
					uni.setStorageSync('addShop', this.select)
					this.back()
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 0;

		.adressInput {
			height: 40px;
			line-height: 40px;
			width: 90%;
			margin-left: 5%;
		}

		.serchInput {
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
		}

		.btn {
			border: 0px;
			border-radius: 0px;
		}
	}
</style>
