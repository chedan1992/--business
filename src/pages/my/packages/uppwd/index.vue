<template>
    <view class="content">
        <evan-form :hide-required-asterisk="false" ref="form" :model="form" :rules="rules">
            <view class="bg-white pdl-15">
                <evan-form-item prop="paypwd" label="旧密码" :label-style="labelStyle">
                    <input type="password" maxlength="10" v-model="form.paypwd" placeholder="请输入旧密码" placeholder-class="plh" class="adressInput f30" />
                </evan-form-item>
                <evan-form-item prop="code" label="新密码" :label-style="labelStyle">
                    <input type="password" maxlength="10" v-model="form.code" placeholder="请输入新密码" placeholder-class="plh" class="adressInput f30" />
                </evan-form-item>
                <evan-form-item prop="newPw2" label="确认密码" :label-style="labelStyle">
                    <input type="password" maxlength="10" v-model="form.newPw2" placeholder="重复新密码" placeholder-class="plh" class="adressInput f30" />
                </evan-form-item>
            </view>
        </evan-form>
        <view class="fixed dflex bottom10 pdb-20 center">
            <button class="btn bg-FF6E44 colorfff mgr-20 mgl-20 lh80 h80" @tap="submit()">提交</button>
        </view>
    </view>
</template>

<script>
import unIicons from '@/components/uni-icons/uni-icons.vue'
export default {
    components: {},
    data() {
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.form.code) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            form: {
                paypwd: '',
                code: '',
                newPw2: ''
            },
            labelStyle: {
                color: '#333',
                fontSize: '30rpx',
                width: '160rpx'
            },
            rules: {
                paypwd: [
                    {
                        required: true,
                        message: '请输入旧密码'
                    },
                    {max: 6, min: 6, message: '密码长度为6位字符', trigger: 'blur'}
                ],
                code: [
                    {
                        required: true,
                        message: '请输入新密码'
                    },
                    {max: 6, min: 6, message: '密码长度为6位字符', trigger: 'blur'}
                ],
                newPw2: [
                    {
                        required: true,
                        message: '请输入确认密码'
                    },
                    {
                        validator: validatePass2,
                        trigger: 'blur',
                        required: true
                    },
                    {max: 6, min: 6, message: '密码长度为6位字符', trigger: 'blur'}
                ]
            }
        }
    },
    onReady() {},
    methods: {
        submit() {
            this.$refs.form.validate().then(res => {
                if (res) {
                    console.log(this.form)
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
