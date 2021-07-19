<template>
	<view class="content">
		<evan-form :hide-required-asterisk="false" ref="form" :model="form" :rules="rules">
			<view class="bg-white pdl-15">
				<evan-form-item prop="shopName" label="平台" :label-style="labelStyle">
					<view class="flex-center adressInput">
						<view class="flex-center">
							<image class="w30 h30" src="../static/shop/check1.png"></image>
						</view>
						<view class="f30 color333 pdl-20">美团</view>
						<view class="flex-center pdl-20">
							<image class="w30 h30" src="../static/shop/check1.png"></image>
						</view>
						<view class="f30 color333 pdl-20">饿了么</view>
					</view>
				</evan-form-item>
				<evan-form-item prop="shopName" label="总数量" :label-style="labelStyle">
					<input type="text" maxlength="10" v-model="form.shopName" placeholder="请输入总数量" placeholder-class="plh" class="adressInput f30" />
				</evan-form-item>
				<evan-form-item prop="shopName" label="条件" :label-style="labelStyle">
					<view class="dflex">
						<view class="flex-center">
							<text class="color333 mgr-10">满</text>
							<input type="text" maxlength="10" v-model="form.shopName" placeholder="多少" placeholder-class="plh" class="adressInput f30" /></view>
						<view class="flex-center">
							<text class="color333 mgr-10">减</text>
							<input type="text" maxlength="10" v-model="form.shopName" placeholder="多少" placeholder-class="plh" class="adressInput f30" /></view>
					</view>
				</evan-form-item>
				<evan-form-item prop="shopName" label="开始日期" :label-style="labelStyle">
					<view class="flex-between adressInput">
						<view class="plh f30 w-calc20">
							<MyPicker mode="date" placeholder="选择日期" :value="form.shopName"></MyPicker>
						</view>
						<view>
							<image src="../static/shop/arrow.png" class="w9 h15 mgr-20"></image>
						</view>
					</view>
				</evan-form-item>
				<evan-form-item prop="shopName" label="结束日期" :label-style="labelStyle">
					<view class="flex-between adressInput">
						<view class="plh f30 w-calc20">
							<MyPicker mode="date" placeholder="选择日期" :value="form.shopName"></MyPicker>
						</view>
						<view>
							<image src="../static/shop/arrow.png" class="w9 h15 mgr-20"></image>
						</view>
					</view>
				</evan-form-item>
				<evan-form-item prop="shopName" label="活动时间" :label-style="labelStyle">
					<view class="flex-between w-calc0">
						<view class="flex-center w-calc29">
							<view class="flex-between flex-center w-calc20">
								<MyPicker mode="time" placeholder="选择时间" :value="'10:12'"></MyPicker>
								<view>
									<image src="../static/shop/arrow.png" class="w9 h15"></image>
								</view>
							</view>
							<view class="lh15 h15 flex-center mgr-10 mgl-10">至</view>
							<view class="flex-center w-calc20">
								<MyPicker mode="time" placeholder="选择时间" :value="'10:12'"></MyPicker>
							</view>
						</view>
						<view>
							<image src="../static/shop/arrow.png" class="w9 h15 mgr-20"></image>
						</view>
					</view>
				</evan-form-item>
				<evan-form-item prop="shopName" label="活动规则" :label-style="labelStyle">
					<view class="flex-between adressInput">
						<view class="plh f30 w-calc20">
						</view>
						<view>
							<image src="../static/shop/arrow.png" class="w9 h15 mgr-20"></image>
						</view>
					</view>
				</evan-form-item>
				<evan-form-item prop="shopName" label="描述" :label-style="labelStyle">
					<input type="text" maxlength="10" v-model="form.shopName" placeholder="请输入描述" placeholder-class="plh" class="adressInput f30" />
				</evan-form-item>
			</view>
		</evan-form>
		<view class="pd-30 f28">
			平台佣金4*数量20=80元 提示：本次活动需抵扣20*30元=600元，请保证余额充足。<br><text class="colorFF6E44">当前余额：100元，请充值</text>
			<view class="colorFF6E44 mgt-30">点击去充值</view>
		</view>
		<view class="fixed bottom0">
			<button class="btn bg-FF6E44 colorfff lh80 h80 border-radius0 block">提交审核</button>
		</view>
	</view>
</template>

<script>
	import MyPicker from "@/components/m-picker.vue"
	export default {
		components: {
			MyPicker
		},
		data() {
			return {
				uImgList: [],
				labelStyle: {
					color: '#333',
					fontSize: '30rpx',
					width: '200rpx',
				},
				form: {
					shopName: "",
				},
				rules: {
					shopName: [{
						required: true,
						message: '请输入店铺名称'
					}]
				}
			}
		},
		onLoad(data) {},
		onReady() {},
		methods: {
			save() {
				this.$refs.form.validate().then((res) => {
					if (res) {
						this.form.regionId = this.region[2][this.regionIds[2]].regionId;
						if (this.form.addressId == 0) {
							this.add();
						} else {
							this.edit();
						}
					}
				})
			},
			add() {
				this.$api.address.add(this.form).then(d => {
					if (d.code == 1) {
						this.showToast({
							duration: 3000,
							title: '保存成功'
						}).then(r => {
							this.back();
						});
					} else {
						this.showToast({
							title: d.msg,
							icon: 'none'
						})
					}
				}).catch(e => {})
			},
			edit() {
				this.$api.address.edit(this.form).then(d => {
					if (d.code == 1) {
						this.showToast({
							duration: 3000,
							title: '保存成功'
						}).then(r => {
							this.back();
						});
					} else {
						this.showToast({
							title: d.msg,
							icon: 'none'
						})
					}
				}).catch(e => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0;

		.bglogo {
			background-image: url('../static/shop/logo.png');
			background-size: 100% 100%;
		}

		.boder-bottom {
			border-bottom: 1px solid #DEDEDE;
		}

		.adressInput {
			height: 40px;
			line-height: 40px;
			width: 100%;
		}
	}

	.btn {
		width: 100%;

		&.border-radius0 {
			border-radius: 0;
		}
	}
</style>
