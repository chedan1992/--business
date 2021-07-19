<template>
	<view class="content">
		<evan-form :hide-required-asterisk="false" ref="form" :model="form" :rules="rules">
			<view class="bg-white pdl-15">
				<evan-form-item prop="shopName" label="旧密码" :label-style="labelStyle">
					<input type="password" maxlength="10" v-model="form.shopName" placeholder="请输入旧密码" placeholder-class="plh" class="adressInput f30"/>
				</evan-form-item>
				<evan-form-item prop="shopName" label="新密码" :label-style="labelStyle">
					<input type="password" maxlength="10" v-model="form.shopName" placeholder="请输入新密码" placeholder-class="plh" class="adressInput f30"/>
				</evan-form-item>
				<evan-form-item prop="shopName" label="确认密码" :label-style="labelStyle">
					<input type="password" maxlength="10" v-model="form.shopName" placeholder="重复新密码" placeholder-class="plh" class="adressInput f30" />
				</evan-form-item>
			</view>
		</evan-form>
		<view class="fixed dflex bottom10 pdb-20 center">
			<button class="btn bg-FF6E44 colorfff mgr-20 mgl-20 lh80 h80">提交</button>
		</view>
	</view>
</template>

<script>
	import unIicons from "@/components/uni-icons/uni-icons.vue";
	export default {
		components: {},
		data() {
			return {
				form: {
					shopName: ''
				},
				labelStyle: {
					color: '#333',
					fontSize: '30rpx',
					width: '160rpx',
				},
			}
		},
		onReady() {

		},
		methods: {}
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
	}
</style>
