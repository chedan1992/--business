<template>
    <view class="content">
        <view class="flex-between borderb pd-30 bg-white">
            <view class="f30 bold">平台订单号：{{ listData.ordercode }}</view>
            <view class="f30 colorFF6E44">{{ listData.orderstatus | aa }}</view>
        </view>
        <view class="pd-30 bg-white">
            <view class="f26 pdb-30">订单时间：{{ listData.createtime }}</view>
            <view class="f26 pdb-30">外卖订单号：{{ listData.outerordercode }}</view>
            <view class="f26 pdb-30">外卖支付金额：{{ listData.sjpayprice }}元</view>
            <view class="f26">外卖平台：{{ listData.platform == 1 ? '美团' : '饿了么' }}</view>
        </view>
        <view class="pd-30 bg-white f30 bold mgt-20 borderb">
            活动信息
        </view>
        <view class="pd-30 bg-white active">
            <!-- <view class="status">
                <image src="/static/order/feihuiyuan.png" class="img"></image>
            </view> -->
            <view class="flex item">
                <view class="w120 h120 pdr-20 flex-center">
                    <image :src="listData.shoplogo ? ossFormat(listData.shoplogo) : img" class="w120 h120"></image>
                </view>
                <view class="wordW2">
                    <view class="f30 mgb-10 wordW">{{ listData.shopname }}</view>
                    <view class="flex-center">
                        <view class="wordW2 f24 color666">{{ listData.tips }}</view>
                    </view>
                </view>
            </view>
            <view class="f26 mgt-20 colorFF6E44 flex-center">
                <view class="borderr pdr-30">满{{ listData.full }}减{{ listData.sub }}</view>
                <view>
                    <image src="/static/order/phone.png" @click="call(listData.telphone)" class="w21 h26 mgl-30"></image>
                </view>
            </view>
        </view>
        <!-- <view class="pd-30 bg-white f30 bold mgt-20 borderb">
            审核信息
        </view>
        <view class="pd-30 flex flex-wrap imgs bg-white">
            <view class="width3">
                <image class="img" src="../../../main/packages/static/shop/logo.png"></image>
            </view>
            <view class="width3">
                <image class="img" src="../../../main/packages/static/shop/logo.png"></image>
            </view>
            <view class="width3">
                <image class="img" src="../../../main/packages/static/shop/logo.png"></image>
            </view>
            <view class="width3">
                <image class="img" src="../../../main/packages/static/shop/logo.png"></image>
            </view>
        </view> -->
        <view class="pd-30 bg-white f30 bold mgt-20 borderb">
            订单跟踪
        </view>
        <view class="pd-30 bg-white" v-for="(item, i) in listData.tracelist" :key="i">
            <view class="pdb-20">
                <view class="f26 lh40">{{ item.createtime }}</view>
                <view class="f26 lh40">{{ item.remark }}</view>
            </view>
        </view>
        <view class="fixed bottom0 pdt-20 pdb-20 bg-white dflex box" v-show="listData.orderstatus == 3">
            <view class="pdr-20 pdl-20">
                <button class="btn bg-white block h80 lh80" @click="onOpenPromptClick()">拒绝</button>
            </view>
            <view class="pdr-20">
                <button class="btn bg-FF6E44 colorfff block h80 lh80" @click="agreen()">通过</button>
            </view>
        </view>
        <yomol-prompt :title="promptTitle" :inputType="promptInputType" ref="yomolPrompt" @onConfirm="onPromptConfirm"></yomol-prompt>
    </view>
</template>

<script>
import yomolPrompt from '../../../../components/yomol-prompt/yomol-prompt.vue'
export default {
    filters: {
        aa(ele) {
            if (ele == 0) {
                return '取消'
            } else if (ele == 1) {
                return '下单'
            } else if (ele == 2) {
                return '已付款'
            } else if (ele == 3) {
                return '审核中'
            } else if (ele == 4) {
                return '返现中'
            } else if (ele == 5) {
                return '已完成'
            }
        }
    },
    components: {
        yomolPrompt
    },
    data() {
        return {
            key: '',
            id: 0,
            img: require('../../../main/packages/static/shop/logo.png'),
            listData: [],
            promptTitle: '提示',
            promptDefaultValue: '',
            promptInputType: 'text',
            promptFunc: '' //空值不执行
        }
    },
    onReady() {},
    onLoad(data) {
        this.id = data.orderId
        this.getData()
    },
    methods: {
        /*
         * 打开提示框
         */
        onOpenPromptClick() {
            this.promptTitle = '拒绝原因' //提示名称
            this.promptInputType = 'text' //输入类型 同Input组件
            this.$refs.yomolPrompt.show()
        },
        /*
         * 输入内容
         */
        onPromptConfirm(e) {
            let that = this
            that.$api.order
                .OrderJudge({
                    ordersid: that.id,
                    isagree: 0,
                    reason: e
                })
                .then(d => {
                    that.showToast({
                        duration: 3000,
                        title: '操作成功'
                    }).then(r => {
                        that.back()
                    })
                })
                .catch(e => {
                    console.log(e)
                })
        },
        call(phone) {
            uni.makePhoneCall({
                // 手机号
                phoneNumber: phone,

                // 成功回调
                success: res => {
                    console.log('调用成功!')
                },

                // 失败回调
                fail: res => {
                    console.log('调用失败!')
                }
            })
        },
        agreen() {
            let that = this
            uni.showModal({
                title: '提示',
                content: '您确定通过吗？',
                success: function(res) {
                    if (res.confirm) {
                        that.$api.order
                            .OrderJudge({
                                ordersid: that.id,
                                isagree: 1
                            })
                            .then(d => {
                                that.showToast({
                                    duration: 3000,
                                    title: '操作成功'
                                }).then(r => {
                                    that.back()
                                })
                            })
                            .catch(e => {
                                console.log(e)
                            })
                    } else if (res.cancel) {
                    }
                }
            })
        },
        getData() {
            this.$api.order
                .getOrderDetails({
                    ordersid: this.id
                })
                .then(d => {
                    //设置列表数据
                    //如果是第一页需手动置空列表
                    if (d.status == 1) {
                        this.listData = d.data
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
    padding-bottom: 150rpx;

    .active {
        position: relative;

        .status {
            left: 0px;
            top: 0px;
            position: absolute;
            z-index: 11;

            .img {
                height: 100rpx;
                width: 100rpx;
            }
        }

        .item {
            .w120 {
                width: 120rpx;
            }

            .h120 {
                height: 120rpx;
            }
        }
    }

    .imgs {
        .width3 {
            width: calc(100% / 3);
            margin-bottom: 20rpx;

            .img {
                width: 200rpx;
                height: 200rpx;
            }
        }
    }
}
</style>
