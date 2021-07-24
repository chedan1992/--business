<template>
    <view class="mian">
        <view class="title bg-FF6E44 colorfff f28 lh80 h80 dflex pdl-30 pdr-30">
            <view class="flex-center wordW">
                <view class="w26 h26 pdr-10 flex-center">
                    <image src="../../static/main/prompt.png" class="w26 h26 "></image>
                </view>
                <view class="wordW">您有一个新订单待审核</view>
            </view>
            <view class="tr flex-right wordW" @click="goislogin('../selshop/index')">
                <view class="wordW">小龙坎北京路店</view>
                <view class="w12 h8 pdl-10 flex-center">
                    <image src="../../static/dropdown.png" class="w12 h8 "></image>
                </view>
            </view>
        </view>
        <view class="notice bg-FFF2E8 f24 lh60 h60 flex-between pdl-30 pdr-30">
            <view class="flex-center wordW">
                <view class="w23 h20 pdr-10 flex-center">
                    <image src="../../static/main/notice.png" class="w23 h20"></image>
                </view>
                <view class="wordW">您好，欢迎使用新版云客服</view>
            </view>
            <view class="w12 h8 pdl-10 flex-center">
                <image src="../../static/main/close.png" class="w18 h18"></image>
            </view>
        </view>
        <view class="pdr-30 pdl-30 pdb-50 flex flex-wrap menu bg-white">
            <view class="center width3" @click="goislogin('packages/active/index')">
                <view>
                    <image class="w60 h60" src="../../static/main/huodong.png"></image>
                </view>
                <view class="mgt-28 f24 ">店铺活动</view>
            </view>
            <view class="center width3" @click="goTop('/pages/order/index')">
                <view>
                    <image class="w60 h60" src="../../static/main/dingdan.png"></image>
                </view>
                <view class="mgt-28 f24 ">订单</view>
            </view>
            <view class="center width3" @click="goislogin('packages/zhangdan/index')">
                <view>
                    <image class="w60 h60" src="../../static/main/zhangdan.png"></image>
                </view>
                <view class="mgt-28 f24 ">账单</view>
            </view>
            <view class="center width3" @click="goislogin('packages/chongzhi/index')">
                <view>
                    <image class="w60 h60" src="../../static/main/tixian.png"></image>
                </view>
                <view class="mgt-28 f24 ">充值/提现</view>
            </view>
            <view class="center width3" @click="goislogin('packages/liushuijilu/index')">
                <view>
                    <image class="w60 h60" src="../../static/main/liushuijilu.png"></image>
                </view>
                <view class="mgt-28 f24 ">流水明细</view>
            </view>
            <view class="center width3" @click="goislogin('packages/shop/index')">
                <view>
                    <image class="w60 h60" src="../../static/main/dianpu.png"></image>
                </view>
                <view class="mgt-28 f24 ">店铺管理</view>
            </view>
        </view>
        <view class="pd-30 flex-center">
            <image class="w6 h30" src="../../static/main/bar.png"></image>
            <view class="f30 mgl-20">数据统计</view>
        </view>
        <view class="pd-30 pdl-80 flex flex-wrap static">
            <view class="width2">
                <view class="f26">
                    待审核订单
                </view>
                <view class="mgt-28 f36 bold">20</view>
            </view>
            <view class="width2">
                <view class="f26">
                    已完成订单
                </view>
                <view class="mgt-28 f36 bold">20</view>
            </view>
            <view class="width2">
                <view class="f26">
                    待审核活动
                </view>
                <view class="mgt-28 f36 bold">20</view>
            </view>
            <view class="width2">
                <view class="f26">
                    进行中的活动
                </view>
                <view class="mgt-28 f36 bold">20</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            islogin: true
        }
    },
    onLoad() {},
    onReady() {},
    onShow() {},
    methods: {}
}
</script>

<style lang="scss">
.mian {
    .title {
    }

    .notice {
        color: #9f7b58;
    }

    .menu {
        .width3 {
            margin-top: 50rpx;
            width: calc(100% / 3);
        }
    }

    .static {
        .width2 {
            margin-bottom: 50rpx;
            width: calc(100% / 2);
        }
    }
}
</style>
