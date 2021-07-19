<template>
	<view class="content">
		<evan-form :hide-required-asterisk="false" ref="form" :model="form" :rules="rules">
			<view class="bg-white pdl-15">
				<evan-form-item label="店铺logo" :label-style="labelStyle">
					<view class="flex-center pdb-20">
						<view class="">
							<zhtx-uploadImg class="bglogo" :other="e" @uploadSuccess="uploadSuccess" :width="50" :height="50" :uImgList="uImgList"
							 :limit="1">
							</zhtx-uploadImg>
						</view>
						<view class="f30 color999 pdl-20">点击上传logo</view>
					</view>
				</evan-form-item>
				<evan-form-item prop="shopName" label="店铺名称" :label-style="labelStyle">
					<input type="text" maxlength="10" v-model="form.shopName" placeholder="请输入店铺名称" placeholder-class="plh" class="adressInput f30" />
				</evan-form-item>
				<evan-form-item prop="shopName" label="店铺分类" :label-style="labelStyle">
					<view class="flex-between adressInput">
						<view class="plh f30">
							正餐／小吃
						</view>
						<view>
							<image src="../static/shop/arrow.png" class="w9 h15  mgr-20"></image>
						</view>
					</view>
				</evan-form-item>
				<evan-form-item prop="shopName" label="美团链接" :label-style="labelStyle">
					<input type="text" maxlength="10" v-model="form.shopName" placeholder="请输入美团链接" placeholder-class="plh" class="adressInput f30" />
				</evan-form-item>
				<evan-form-item prop="shopName" label="饿了么链接" :label-style="labelStyle">
					<input type="text" maxlength="10" v-model="form.shopName" placeholder="请输入饿了么链接" placeholder-class="plh" class="adressInput f30" />
				</evan-form-item>
				<evan-form-item prop="shopName" label="省市" :label-style="labelStyle">
					<view class="flex-between adressInput">
						<view class="plh f30">
							选择省／市
						</view>
						<view>
							<image src="../static/shop/arrow.png" class="w9 h15  mgr-20"></image>
						</view>
					</view>
				</evan-form-item>
				<evan-form-item prop="shopName" label="店铺地址" :label-style="labelStyle">
					<view class="flex-between adressInput">
						<view class="plh f30">
							请选择店铺地址
						</view>
						<view>
							<image src="../static/shop/arrow.png" class="w9 h15  mgr-20"></image>
						</view>
					</view>
				</evan-form-item>
			</view>
		</evan-form>
		<view class="fixed bottom10 pdb-20 center">
			<view class="btn bg-FF6E44 lh80 h80 colorfff" @tap="save()">提交</view>
		</view>
	</view>
</template>

<script>
	import zhtxUploadImg from '@/components/zhtx-uploadImg/zhtx-uploadImg.vue';
	export default {
		components: {
			zhtxUploadImg
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
		width: 320px;
	}
</style>
