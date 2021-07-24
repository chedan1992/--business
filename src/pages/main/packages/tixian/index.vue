<template>
    <view class="content">
        <view class="flex-between pdl-30 pdr-30 pdb-20">
            <view class="item">
                <view class="f36 color333 mgt-50 bold">10000.00</view>
                <view class="f26 color333 mgt-41">可提现余额(元)</view>
            </view>
            <view class="item">
                <view class="f36 color333 mgt-50 bold">1200.00</view>
                <view class="f26 color333 mgt-41">已提现(元)</view>
            </view>
            <view class="item">
                <view class="f36 color333 mgt-50 bold">0</view>
                <view class="f26 color333 mgt-41">提现中(元)</view>
            </view>
        </view>
        <view class="tixian">
            <view class="tixian-left">
                <view class="f26 color333">提现金额(元)</view>
                <input type="text" maxlength="10" v-model="money" placeholder="请输入充值金额" placeholder-class="plh" class="mgt-48 f36" />
            </view>
            <view class="btn-tixian f24">全部提现</view>
        </view>
        <view class="ljcz" @click="sumbit">提交</view>
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
            listData: [],
            money: ''
        }
    },
    onReady() {},
    methods: {
        sumbit() {
            // this.goislogin('../setPayPw/index')
            this.goislogin('../tixianjieguo/index?type=0')
        }
    }
}
</script>

<style lang="scss">
.content {
    padding: 0;
    .item {
        width: 33%;
        height: 200rpx;
        text-align: center;
    }
    .tixian {
        padding: 30rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .tixian-left {
            width: calc(100% - 160rpx);
        }
        .btn-tixian {
            color: #ff6e45;
        }
    }
    .ljcz {
        width: calc(100% - 60rpx);
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        color: #fff;
        background-color: #ff6e45;
        border-radius: 4px;
        margin: 40rpx 30rpx;
    }
}
</style>
