<template>
    <view class="content">
        <evan-form :hide-required-asterisk="false" ref="form" :model="form" :rules="rules">
            <view class="bg-white pdl-15">
                <evan-form-item prop="telphone" label="新手机号" :label-style="labelStyle">
                    <input type="phone" maxlength="11" v-model="form.telphone" placeholder="请输入新手机号" placeholder-class="plh" class="adressInput f30" />
                </evan-form-item>
                <evan-form-item prop="code" label="获取验证码" :label-style="labelStyle">
                    <view class="flex-between adressInput">
                        <view class="plh f30" style="width:calc(100% - 210rpx)">
                            <input type="phone" maxlength="10" v-model="form.code" placeholder="请输入验证码" placeholder-class="plh" class="f30" />
                        </view>
                        <view>
                            <button class="btn bg-FF6E44 colorfff lh70 h70 block" style="display: block;" :disabled="index == 1" @click="sendCode()">
                                {{ index == 1 ? '重新发送' : '发送验证码' }}
                            </button>
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
                telphone: '',
                code: ''
            },
            labelStyle: {
                color: '#333',
                fontSize: '30rpx',
                width: '180rpx'
            },
            rules: {
                telphone: [
                    {
                        required: true,
                        message: '请输入11位手机号'
                    },
                    {
                        pattern: '^1\\d{10}$',
                        message: '手机号格式不正确'
                    }
                ],
                code: [
                    {
                        required: true,
                        message: '请输入验证码'
                    }
                ]
            },
            index: 0
        }
    },
    onReady() {},
    methods: {
        submit() {
            this.$refs.form.validate().then(res => {
                if (res) {
                    this.$api.my
                        .updatePhone({
                            telphone: this.form.telphone,
                            code: this.form.code
                        })
                        .then(d => {
                            if (d.status == 1) {
                                this.back(2)
                            } else {
                                this.showToast({
                                    title: d.msg,
                                    icon: 'none'
                                })
                            }
                        })
                        .catch(e => {
                            console.log(e)
                        })
                }
            })
        },
        sendCode() {
            this.$api.common
                .smsSend({
                    phone: this.form.telphone
                })
                .then(d => {
                    if (d.status == 1) {
                        this.showToast({
                            duration: 3000,
                            title: '发送成功'
                        }).then(r => {
                            this.index = 1
                            setTimeout(() => {
                                this.index = 0
                            }, 60000)
                        })
                    } else {
                        this.showToast({
                            title: d.msg,
                            icon: 'none'
                        })
                    }
                })
                .catch(e => {
                    console.log(e)
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
