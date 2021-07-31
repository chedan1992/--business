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
                    <input type="text" maxlength="10" v-model="form.uname" placeholder="请输入姓名" placeholder-class="plh" class="adressInput f30" />
                </evan-form-item>
                <evan-form-item prop="shopName" label="姓名" :label-style="labelStyle">
                    <input type="text" maxlength="10" v-model="form.realname" placeholder="请输入姓名" placeholder-class="plh" class="adressInput f30" />
                </evan-form-item>

                <evan-form-item prop="shopName" label="手机号" :label-style="labelStyle">
                    <input type="phone" maxlength="11" v-model="form.linkmethod" placeholder="请输入手机号" placeholder-class="plh" class="adressInput f30" />
                </evan-form-item>
                <evan-form-item prop="shopName" label="查看店铺" :label-style="labelStyle">
                    <view class="flex-between adressInput" @click="go('../lookShop/index')">
                        <view class="plh f30">
                            {{ form.shopids == '' ? '点击选择店铺' : '点击修改店铺' }}
                        </view>
                        <view>
                            <uni-icons type="arrowright" size="10"></uni-icons>
                        </view>
                    </view>
                </evan-form-item>
                <evan-form-item prop="shopName" label="权限" :label-style="labelStyle">
                    <view class="flex-center adressInput" style="height:auto">
                        <checkbox-group @change="checkboxChange" class="flex-between" style="flex-wrap:wrap">
                            <label class="width100 flex">
                                <view class="mgr-20">
                                    <checkbox color="white" style="transform:scale(0.8)" :value="1" />
                                </view>
                                <view class="f30">充值提现</view>
                            </label>
                            <label class="width100 flex">
                                <view class="mgr-20">
                                    <checkbox color="white" style="transform:scale(0.8)" :value="2" />
                                </view>
                                <view class="f30">店铺管理</view>
                            </label>
                            <label class="width100 flex">
                                <view class="mgr-20">
                                    <checkbox color="white" style="transform:scale(0.8)" :value="3" />
                                </view>
                                <view class="f30">订单管理</view>
                            </label>
                            <label class="width100 flex">
                                <view class="mgr-20">
                                    <checkbox color="white" style="transform:scale(0.8)" :value="4" />
                                </view>
                                <view class="f30">账单流水</view>
                            </label>
                        </checkbox-group>
                    </view>
                </evan-form-item>
            </view>
        </evan-form>
        <!-- <view class="pd-30 f28"> 提示：本次活动需抵扣20*30元=600元，<br /><text class="colorFF6E44">请保证余额充足。</text> </view> -->
        <view class="fixed dflex bottom10 pdb-20 center">
            <button class="btn bg-FF6E44 colorfff mgr-20 mgl-20 lh80 h80" @click="save()">保存</button>
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
                shopName: '',
                actions: '',
                linkmethod: '',
                uname: '',
                realname: '',
                shopids: '',
                skid: 0
            },
            labelStyle: {
                color: '#333',
                fontSize: '30rpx',
                width: '200rpx'
            },
            rules: {
                actions: [
                    {
                        required: true,
                        message: '请选择权限'
                    }
                ],
                linkmethod: [
                    {
                        required: true,
                        message: '请输入电话号码'
                    }
                ],
                uname: [
                    {
                        required: true,
                        message: '请输入用户名'
                    }
                ],
                realname: [
                    {
                        required: true,
                        message: '请输入真实姓名'
                    }
                ],
                shopids: [
                    {
                        required: true,
                        message: '选择店铺'
                    }
                ]
            }
        }
    },
    onReady() {},
    onShow() {
        let shopList = uni.getStorageSync('addShop'),
            data = []
        shopList.forEach(e => {
            data.push(e.shopid)
        })
        this.form.shopids = data.join(',')
    },
    methods: {
        checkboxChange: function(e, i) {
            let values = e.detail.value
            this.form.actions = values
        },
        save() {
            this.$refs.form.validate().then(res => {
                if (res) {
                    if (this.form.skid == 0) {
                        this.add()
                    } else {
                        this.edit()
                    }
                }
            })
        },
        add() {
            this.$api.my
                .addSubUsers(this.form)
                .then(d => {
                    if (d.status == 1) {
                        uni.setStorageSync('addShop', '')
                        this.showToast({
                            duration: 3000,
                            title: '保存成功'
                        }).then(r => {
                            this.back()
                        })
                    } else {
                        this.showToast({
                            title: d.msg,
                            icon: 'none'
                        })
                    }
                })
                .catch(e => {})
        },
        edit() {
            this.$api.address
                .edit(this.form)
                .then(d => {
                    if (d.status == 1) {
                        this.showToast({
                            duration: 3000,
                            title: '保存成功'
                        }).then(r => {
                            this.back()
                        })
                    } else {
                        this.showToast({
                            title: d.msg,
                            icon: 'none'
                        })
                    }
                })
                .catch(e => {})
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
