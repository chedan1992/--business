<template>
    <view class="content">
        <uni-nav-bar color="#fff" leftIcon="arrowleft" :fixed="true" @clickLeft="back" :border="false" :statusBar="true" :backgroundColor="'#FF6E44'">
            <view class="center w-calc0">
                <text class="colorfff">新增子用户</text>
            </view>
        </uni-nav-bar>
        <evan-form :hide-required-asterisk="false" ref="form" :model="form" :rules="rules">
            <view class="bg-white pdl-15">
                <evan-form-item prop="shopName" label="自用户名" :label-style="labelStyle">
                    <input type="text" maxlength="10" v-model="form.shopName" placeholder="请输入姓名" placeholder-class="plh" class="adressInput f30" />
                </evan-form-item>
                <evan-form-item prop="shopName" label="姓名" :label-style="labelStyle">
                    <input type="text" maxlength="10" v-model="form.shopName" placeholder="请输入姓名" placeholder-class="plh" class="adressInput f30" />
                </evan-form-item>

                <evan-form-item prop="shopName" label="手机号" :label-style="labelStyle">
                    <input type="phone" maxlength="10" v-model="form.shopName" placeholder="请输入手机号" placeholder-class="plh" class="adressInput f30" />
                </evan-form-item>
                <evan-form-item prop="shopName" label="查看店铺" :label-style="labelStyle">
                    <view class="flex-between adressInput" @click="go('../lookShop/index')">
                        <view class="plh f30">
                            点击选择店铺
                        </view>
                        <view>
                            <uni-icons type="arrowright" size="10"></uni-icons>
                        </view>
                    </view>
                </evan-form-item>
                <evan-form-item prop="shopName" label="权限" :label-style="labelStyle">
                    <view class="flex-between adressInput">
                        <view class="plh f30">
                            请选择选择
                        </view>
                        <view>
                            <uni-icons type="arrowright" size="10"></uni-icons>
                        </view>
                    </view>
                </evan-form-item>
            </view>
        </evan-form>
        <view class="pd-30 f28"> 提示：本次活动需抵扣20*30元=600元，<br /><text class="colorFF6E44">请保证余额充足。</text> </view>
        <view class="fixed dflex bottom10 pdb-20 center">
            <button class="btn bg-FF6E44 colorfff mgr-20 mgl-20 lh80 h80">保存</button>
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
                shopName: ''
            },
            labelStyle: {
                color: '#333',
                fontSize: '30rpx',
                width: '200rpx'
            }
        }
    },
    onReady() {},
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
