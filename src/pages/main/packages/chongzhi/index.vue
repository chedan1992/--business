<template>
	<view class="content">
        <view class="tixian">
                <view class="tixian-left">
                    <view class="f26 color333">余额(元)</view>
                    <view class="f36 color333 mgt-36 bold">10000.00</view>
                </view>
                <button class="btn-tixian"  @click="goislogin('../tixian/index')">我要提现</button>
        </view>
        <view class="mgt-60 f26 pdl-30">充值金额(元)</view>
        <input type="text" maxlength="10" v-model="money" placeholder="请输入充值金额" placeholder-class="plh" class="pdl-30 mgt-48 f36" />
        <view class="f26 pdl-30 color333 mgt-83">充值金额最低为200元</view>
        <view class="ljcz">立即充值</view>
        <view class="mingxi"  @click="goislogin('../getDetail/index')">充值/提现明细</view>
	</view>
</template>

<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		components: {
		},
		mixins: [MescrollMixin],
		data() {
			return {
				key: '',
				listData: [],
                money:''
			}
		},
		onReady() {

		},
		methods: {


		}
	}
</script>

<style lang="scss">
	.content {
		padding: 0;
        .tixian{
            padding: 30rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .tixian-left{
            width: calc(100% - 160rpx);
            }
            .btn-tixian{
            width: 160rpx;
            height: 60rpx;
            line-height: 60rpx;
            background-color: #FF6E45;
            font-size: 13px;
            color: #fff;
            }
        }
        .ljcz{
            width: calc(100% - 60rpx);
            height: 80rpx;
            line-height: 80rpx;
            text-align: center;
            color: #fff;
            background-color: #FF6E45;
            border-radius: 4px;
            margin: 40rpx 30rpx;
        }
        .mingxi{
            color:#FF6E45;
            text-align: center;
        }
	}
</style>
