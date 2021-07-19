<template>
	<view class="content">
		<evan-form :hide-required-asterisk="false" ref="form" :model="form" :rules="rules">
			<view class="bg-white pdl-15">
				<evan-form-item prop="phone" label="手机号" :label-style="labelStyle">
					<input type="phone" maxlength="11" v-model="form.phone" placeholder="请输入手机号" placeholder-class="plh" class="adressInput f30" />
				</evan-form-item>
				<evan-form-item prop="code" label="获取验证码" :label-style="labelStyle">
					<view class="flex-between adressInput">
						<view class="plh f30">
							<input type="number" maxlength="6" v-model="form.code" placeholder="请输入验证码" placeholder-class="plh" class="f30" />
						</view>
						<view>
							<view class="tr h21 lh21" style="width: 108px;">
								<mTimer style="display: inline-block;" @endTimer="endTimer" :timespan="timespan">
									<template v-slot:content="{ hms }">
										<span class="colorCC2B20 f16" @tap="send()">{{hms&&hms.second>0?hms.second+'s后重新获取':'获取验证码'}}</span>
									</template>
								</mTimer>
							</view>
						</view>
					</view>
				</evan-form-item>
			</view>
		</evan-form>
		<view class="fixed dflex bottom10 pdb-20 center">
			<button class="btn bg-FF6E44 colorfff mgr-20 mgl-20 lh80 h80" @click="register">提交</button>
		</view>
	</view>
</template>

<script>
	import unIicons from "@/components/uni-icons/uni-icons.vue";
	import mTimer from '@/components/m-timer.vue';
	export default {
		components: {
			mTimer
		},
		data() {
			return {
				form: {
					phone: '',
					code: '',
				},
				timespan: 0,
				labelStyle: {
					color: '#333',
					fontSize: '30rpx',
					width: '170rpx',
				},
				rules: {
					phone: [{
						required: true,
						message: '请输入11位手机号'
					}, {
						pattern: '^1\\d{10}$',
						message: '手机号格式不正确'
					}],
					code: [{
						required: true,
						message: '请输入验证码'
					}]
				},
			}
		},
		onReady() {

		},
		methods: {
			endTimer() {
				this.timespan = 0;
			},
			register() {
				this.$refs.form.validate().then((res) => {
					if (res) {
						this.$api.auth.register(this.form).then(d => {
							if (d.status == 1) {
								this.showToast({
									title: '操作成功',
									icon: 'none'
								})
								this.back(2)
							} else {
								this.showToast({
									title: d.msg,
									icon: 'none'
								})
							}
						}).catch((e) => {
							console.log(e);
						})
					}
				})
			},
			send() {
				this.$refs.form.validateField(['phone'], (res) => {
					if (res) {
						if (this.timespan == 0) {
							this.$api.common.smsSend(this.form).then(d => {
								if (d.status == 1) {
									this.showToast({
										title: '验证码发送成功，请注意查收',
										icon: 'none'
									})
									this.timespan = 60;
								} else {
									this.showToast({
										title: d.msg,
										icon: 'none'
									})
								}
							}).catch((e) => {
								console.log(e);
							})
						}
					}
				})
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
	}
</style>
