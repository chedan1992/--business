<template>
    <view class="content">
        <evan-form :hide-required-asterisk="false" ref="form" :model="form" :rules="rules">
            <view class="plh f30 pdl-15 lh100">
                原手机号：131****6789
            </view>
            <view class="bg-white pdl-15">
                <evan-form-item prop="code" label="获取验证码" :label-style="labelStyle">
                    <view class="flex-between adressInput">
                        <view class="plh f30">
                            <input type="phone" maxlength="10" v-model="form.code" placeholder="请输入验证码" placeholder-class="plh" class="f30" />
                        </view>
                        <view>
                            <button class="btn bg-FF6E44 colorfff lh70 h70 block" style="display: block;">发送验证码</button>
                        </view>
                    </view>
                </evan-form-item>
            </view>
        </evan-form>
		<view class="fixed dflex bottom10 pdb-20 center">
            <button class="btn bg-FF6E44 colorfff mgr-20 mgl-20 lh80 h80" @click="submit()">提交</button>
        </view>
    </view>
</template>

<script>
import unIicons from '@/components/uni-icons/uni-icons.vue'
export default {
    components: {},
    data() {
        return {
            form: {
                code: ''
            },
            labelStyle: {
                color: '#333',
                fontSize: '30rpx',
                width: '180rpx'
            },
            rules: {
                code: [
                    {
                        required: true,
                        message: '请输入验证码'
                    }
                ]
            }
        }
    },
    onReady() {},
    methods: {
        submit() {
            this.$refs.form.validate().then(res => {
                if (res) {
                    this.go('../phone-new/index')
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
