<template>
	<view class="content">
        <view class="tab">
            <view class="f30 item itemleft" :class="{'check':activeTab==0}" @click="changTab(0)">充值明细</view>
            <view class="f30 item itemright" :class="{'check':activeTab==1}" @click="changTab(1)">提现明细</view>
        </view>
        <mescroll-body :ref="'mescrollRef'" @init="mescrollInit" @down="downCallback()" @up="upCallback()" :safearea="true">
			<view id="search" class="flex-between w-calc40 pd-20 bg-white borderb">
				<view class="flex-between inputs">
					<view class="date lh60 h60">
						<MyPicker class="center" mode="date" placeholder="选择时间" :value="1"></MyPicker>
					</view>
					<view class="w50 center">至</view>
					<view class="date lh60 h60">
						<MyPicker class="center" mode="date" placeholder="选择时间" :value="1"></MyPicker>
					</view>
				</view>
				<view>
					<button class="btn mini-btn bg-FF6E44 colorfff lh60 h60">查询</button>
				</view>
			</view>
			<view class="contenter">
                <view class="items" v-if="activeTab==0">
                    <view class="itemtop">
                        <img src="../static/weixin.png" class="w76 h76" />
                        <view class="w-calc76 pdl-30">
                            <view class="flex-between">
                                <view class="f24">充值金额:¥600</view>
                                <view class="f24">实际到账:¥0</view>
                            </view>
                            <view class="flex-between mgt-20">
                                <view class="f24">订单编号:2480150160326</view>
                                <view class="colorFF2E42 f24">充值失败</view>
                            </view>
                        </view>
                    </view>
                    <view class="flex-between mgt-19">
                        <view class="color999 f24">下单时间:2020-06-10 14:00</view>
                        <view class="color999 f24">到账时间:2020-06-12 14:00</view>
                    </view>
                    <view class="colorFF2E42 mgt-30 f24">原因：微信账户余额不足，充值失败</view>
                </view>
                <view class="items" v-if="activeTab==1">
                    <view class="itemtop">
                        <img src="../static/weixin.png" class="w76 h76" />
                        <view class="w-calc76 pdl-30">
                            <view class="flex-between">
                                <view class="f24">提现金额:¥600</view>
                                <view class="f24">实际到账:¥0</view>
                            </view>
                            <view class="flex-between mgt-20">
                                <view class="f24">订单编号:2480150160326</view>
                                <view class="colorFF2E42 f24">提现失败</view>
                            </view>
                        </view>
                    </view>
                    <view class="flex-between mgt-19">
                        <view class="color999 f24">下单时间:2020-06-10 14:00</view>
                        <view class="color999 f24">到账时间:2020-06-12 14:00</view>
                    </view>
                    <view class="colorFF2E42 mgt-30 f24">原因：户余额不足，提现失败</view>
                </view>
            </view>
		</mescroll-body>
	</view>
</template>

<script>
import mTab from "@/components/m-tab";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"; // 注意.vue后缀不能省
	import unIicons from "@/components/uni-icons/uni-icons.vue";
	import MyPicker from "@/components/m-picker.vue"
	export default {
		components: {
			mTab,
			MescrollBody,
			unIicons,
			MyPicker
		},
		mixins: [MescrollMixin],
		data() {
			return {
                activeTab:0,
                key: '',
				listData: []
			}
		},
		onReady() {

		},
		methods: {
                changTab(e){
                    this.activeTab = e
                },
                // 下拉刷新的回调 (mixin默认resetUpScroll)
			downCallback() {
				if (this.mescroll.optUp.use) {
					//重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
					this.mescroll.resetUpScroll()
				} else {
					setTimeout(() => {
						this.mescroll.endSuccess();
					}, 500)
				}
			},
			// 上拉加载的回调
			upCallback() {
				this.getList();
			},
			getList() {
				let mescroll = this.mescroll;
				mescroll.endBySize(0, 0);
				mescroll.endErr();
				// this.$api.article.help({
				// 	current: mescroll.num,
				// 	size: 10,
				// 	key: this.key
				// }).then(d => {
				// 	//设置列表数据
				// 	//如果是第一页需手动置空列表
				// 	if (d.curPage == 1) this.listData = [];
				// 	if (d.code == 1) {
				// 		this.listData = this.listData.concat(d.data);
				// 		let curPageLen = d.data.length;
				// 		setTimeout((e) => {
				// 			mescroll.endBySize(curPageLen, d.totalCount);
				// 		}, 20)
				// 	} else {
				// 		mescroll.endErr();
				// 	}
				// }).catch(e => {
				// 	mescroll.endErr();
				// })
			}

		}
	}
</script>

<style lang="scss">
	.content {
		padding: 0;
        .tab{
            width: calc(100% - 60rpx);
            margin: 15rpx 30rpx;
            height: 70rpx;
            line-height: 70rpx;
            border-radius: 8px;
            display: flex;
            border: 1px solid #DDDDDD;
            .item{
                width: 50%;
                text-align: center;
            }
            .itemleft{
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
            }
            .itemright{
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
            }
            .check{
                background-color: #FF6E45;
                color: #fff;
            }
        }
        .inputs {
			width: calc(100% - 150rpx);

			.date {
				background: #F2F2F2;
				width: calc(50% - 45rpx);

				.serchInput {
					font-size: 13px;
				}

				.plh {
					font-size: 13px;
				}
			}
		}
        .contenter{
            border-top: 1px solid #DDDDDD;
            padding: 30rpx;
            .items{
                padding: 40rpx 0;
                border-bottom: 1px solid #DDDDDD;
            }
            .itemtop{
                display: flex;
                align-items: center;
                height: 76rpx;
            }
        }
	}
</style>
