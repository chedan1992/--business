<template>
    <view class="content">
        <img class="img" :src="key == 0 ? chenggong : shibai" />
        <view class="f36 mgb-50 center">提现失败</view>
        <view class="ljcz" @click="sumbit">返回提现</view>
    </view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
export default {
    components: {},
    mixins: [MescrollMixin],
    data() {
        return {
            key: '',
            chenggong: require('../static/chenggong.png'),
            shibai: require('../static/shibai.png')
        }
    },
    onReady() {},
    onLoad(data) {
        this.key = data.type
    },
    methods: {
        sumbit() {
            this.goislogin('../setPayPw/index')
        }
    }
}
</script>

<style lang="scss">
.content {
    padding: 0;
    .img {
        width: 160rpx;
        height: 160rpx;
        margin: 250rpx auto 40rpx auto;
    }
    .ljcz {
        width: 160rpx;
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
        color: #fff;
        background-color: #ff6e45;
        border-radius: 4px;
        margin: 40rpx auto;
        font-size: 26rpx;
    }
}
</style>
