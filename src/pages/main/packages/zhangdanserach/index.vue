<template>
    <view class="content">
        <mescroll-body :ref="'mescrollRef'" @init="mescrollInit" @down="downCallback()" @up="upCallback()" :safearea="true">
            <view class="bg-white pdb-100">
                <view id="search_date" class="flex-between w-calc0 pd-20 bg-white borderb">
                    <view class="flex-between inputs">
                        <view class="date lh60 h60">
                            <MyPicker class="center" mode="date" placeholder="选择时间" :value="d1" @change="getD1"></MyPicker>
                        </view>
                        <view class="w50 center">至</view>
                        <view class="date lh60 h60">
                            <MyPicker class="center" mode="date" placeholder="选择时间" :value="d2" @change="getD2"></MyPicker>
                        </view>
                        <button class="btn mini-btn bg-FF6E44 colorfff" @click="downCallback()">搜索</button>
                    </view>
                </view>
                <!-- <view id="search" class="flex-between w-calc40 pd-20 bg-white borderb">
					<view class="inputs">
						<input @confirm="search" placeholder-class="plh" maxlength="10" name="search" confirm-type="search" v-model="key"
						 type="text" placeholder="搜索店铺" class="serchInput" />
					</view>
					<view></view>
				</view> -->
                <view class="lh100 bg-white pdl-20 pdr-20 borderb">
                    <view class="dflex bordert">
                        <view class="">
                            <view class="f22">店铺名称</view>
                        </view>
                        <view class="center ">
                            <view class="f22">总单量</view>
                        </view>
                        <view class="center ">
                            <view class="f24">总返现</view>
                        </view>
                        <view class="center ">
                            <view class="f22">总佣金</view>
                        </view>
                        <view class="center ">
                            <view class="f22">结算</view>
                        </view>
                    </view>
                    <view class="dflex bordert" v-for="(item, i) in listData" :key="i">
                        <view class="">
                            <view class="f22">{{ item.shopname }}</view>
                        </view>
                        <view class="center ">
                            <view class="f22">{{ item.totalorder }}</view>
                        </view>
                        <view class="center ">
                            <view class="f22">{{ item.totalamount }}</view>
                        </view>
                        <view class="center ">
                            <view class="f22">{{ item.totalcommission }}</view>
                        </view>
                        <view class="center ">
                            <button class="btn mini-btn colorfff pdl-8 pdr-8 mgt-25" v-show="item.iscounter > 0">完成</button>
                            <button class="btn mini-btn bg-FF6E44 colorfff pdl-8 pdr-8 mgt-25" v-show="item.iscounter == 0" @click="overBill(item.shopid)">
                                结算
                            </button>
                        </view>
                    </view>
                </view>
            </view>
        </mescroll-body>
    </view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue' // 注意.vue后缀不能省
import unIicons from '@/components/uni-icons/uni-icons.vue'
import MyPicker from '@/components/m-picker.vue'
export default {
    components: {
        MescrollBody,
        unIicons,
        MyPicker
    },
    mixins: [MescrollMixin],
    data() {
        return {
            d1: '',
            d2: '',
            nowShop: [],
            listData: []
        }
    },
    onReady() {},
    onShow() {
        this.nowShop = uni.getStorageSync('chickNowShop')
    },
    methods: {
        // 下拉刷新的回调 (mixin默认resetUpScroll)
        getD1(e) {
            this.d1 = e
        },
        getD2(e) {
            this.d2 = e
        },
        overBill(id) {
            let today = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
            this.$api.main
                .PostCounterShopBill({
                    shopid: id,
                    datestr: today
                })
                .then(d => {
                    if (d.status == 1) {
                        this.showToast({
                            duration: 3000,
                            title: '结算成功'
                        }).then(r => {
                            this.downCallback()
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
        downCallback() {
            if (this.mescroll.optUp.use) {
                //重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
                this.mescroll.resetUpScroll()
            } else {
                setTimeout(() => {
                    this.mescroll.endSuccess()
                }, 500)
            }
        },
        // 上拉加载的回调
        upCallback() {
            this.getList()
        },
        getList() {
            let mescroll = this.mescroll
            mescroll.endBySize(0, 0)
            mescroll.endErr()
            this.$api.main
                .getAccountBillList({
                    pindex: mescroll.num,
                    psize: 10,
                    dt1: this.d1,
                    dt2: this.d2,
                    shopid: this.nowShop.shopid
                })
                .then(d => {
                    //设置列表数据
                    //如果是第一页需手动置空列表
                    if (mescroll.num == 1) this.listData = []
                    if (d.status == 1) {
                        this.listData = this.listData.concat(d.data)
                        let curPageLen = d.data.length
                        setTimeout(e => {
                            mescroll.endBySize(curPageLen, curPageLen)
                        }, 20)
                    } else {
                        mescroll.endErr()
                    }
                })
                .catch(e => {
                    mescroll.endErr()
                })
        }
    }
}
</script>

<style lang="scss">
.content {
    padding: 0;

    .w200 {
        width: 200rpx;
    }

    #search {
        .inputs {
            background: #f2f2f2;
            width: calc(100% - 200rpx);

            .serchInput {
                background: #f2f2f2;
                font-size: 13px;
                padding-left: 60rpx;
                width: 100%;
                background-image: url('/static/search.png');
                background-size: 30rpx 30rpx;
                background-repeat: no-repeat;
                background-position: 15rpx center;
                height: 60rpx;
                line-height: 60rpx;
            }

            .plh {
                font-size: 13px;
            }
        }
    }

    .inputs {
        width: calc(100% - 40rpx);

        .date {
            background: #f2f2f2;
            width: calc(50% - 90rpx);

            .serchInput {
                font-size: 13px;
            }

            .plh {
                font-size: 13px;
            }
        }
    }
}
</style>
