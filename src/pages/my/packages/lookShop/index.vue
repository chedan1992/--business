<template>
    <view class="content">
        <evan-form :hide-required-asterisk="false">
            <view class="bg-white pdl-15">
                <evan-form-item label="添加店铺" :label-style="labelStyle">
                    <view class="flex-between adressInput" @click="go('../addShop/index')">
                        <view class="plh f30">
                            点击选择店铺
                        </view>
                        <view>
                            <uni-icons type="arrowright" size="10"></uni-icons>
                        </view>
                    </view>
                </evan-form-item>
            </view>
        </evan-form>
        <view class="bg-white pdl-15 mgt-30">
            <view class="borderb pdt-30 pdb-30">
                <view class="f26">已添加店铺</view>
            </view>
            <view class="borderb pdt-30 pdb-30" v-for="(item, e) in shopList" :key="e">
                <view class="f30">{{ item.shopname }}</view>
            </view>
        </view>
    </view>
</template>

<script>
import unIicons from '@/components/uni-icons/uni-icons.vue'
export default {
    components: {},
    data() {
        return {
            shopList: [],
            labelStyle: {
                color: '#333',
                fontSize: '30rpx',
                width: '200rpx'
            }
        }
    },
    onReady() {},
    onShow() {
        this.shopList = uni.getStorageSync('addShop')
        console.log(uni.getStorageSync('addShop'))
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
