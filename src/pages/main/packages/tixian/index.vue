<template>
    <view class="content">
        <view class="flex-between pdl-30 pdr-30 pdb-20">
            <view class="item">
                <view class="f36 color333 mgt-50 bold">{{ listData.amount }}</view>
                <view class="f26 color333 mgt-41">可提现余额(元)</view>
            </view>
            <view class="item">
                <view class="f36 color333 mgt-50 bold">{{ listData.havingWithdrawAmount }}</view>
                <view class="f26 color333 mgt-41">已提现(元)</view>
            </view>
            <view class="item">
                <view class="f36 color333 mgt-50 bold">{{ listData.withdrawAmount }}</view>
                <view class="f26 color333 mgt-41">提现中(元)</view>
            </view>
        </view>
        <view class="tixian">
            <view class="tixian-left">
                <view class="f26 color333">提现金额(元)</view>
                <input type="text" maxlength="10" v-model="money" placeholder="请输入提现金额" placeholder-class="plh" class="mgt-48 f36" />
            </view>
            <view class="btn-tixian f24" @click="getAll()">全部提现</view>
        </view>
        <yomol-prompt :title="promptTitle" :inputType="promptInputType" ref="yomolPrompt" @onConfirm="seave"></yomol-prompt>
        <view class="ljcz" @click="sumbit">提交</view>
    </view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
import yomolPrompt from '../../../../components/yomol-prompt/yomol-prompt.vue'
export default {
    components: {
        yomolPrompt
    },
    mixins: [MescrollMixin],
    data() {
        return {
            key: '',
            listData: [],
            money: '',
            promptTitle: '提示',
            promptInputType: 'password'
        }
    },
    onReady() {},
    onShow() {
        this.getData()
    },
    methods: {
        getAll() {
            this.money = this.listData.amount
        },
        getData() {
            this.$api.main
                .getAmount({})
                .then(d => {
                    if (d.status == 1) {
                        this.listData = d.data
                    } else {
                        this.showToast({
                            title: d.msg,
                            icon: 'none'
                        })
                    }
                })
                .catch(e => {})
        },
        sumbit() {
            // this.goislogin('../setPayPw/index')
            if (this.money == 0 || this.money == '') {
                this.showToast({
                    title: '请输入提现金额',
                    icon: 'none'
                })
                return
            } else if (this.money > this.listData.amount) {
                this.showToast({
                    title: '提现金额不能大于可提现金额',
                    icon: 'none'
                })
                return
            }
            this.promptTitle = '支付密码' //提示名称
            this.$refs.yomolPrompt.show()
        },
        seave(e) {
            this.$api.main
                .postWithdrawal({
                    amount: this.money,
                    paypwd: e
                })
                .then(d => {
                    if (d.status == 1) {
                        this.showToast({
                            duration: 3000,
                            title: '提现成功'
                        }).then(r => {
                            this.goislogin('../tixianjieguo/index?type=0')
                        })
                    } else {
                        this.showToast({
                            title: d.msg,
                            icon: 'none'
                        })
                        //this.goislogin('../tixianjieguo/index?type=1')
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
