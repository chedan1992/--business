<template>
    <view class="content">
        <uni-nav-bar color="#fff" leftIcon="arrowleft" :fixed="true" @clickLeft="back" :border="false" :statusBar="true" :backgroundColor="'#FF6E44'">
            <view class="center w-calc0" @click="goislogin('../../../selshop/index')">
                <text class="colorfff">{{ nowShop.shopname }}</text>
                <image class="w12 h8 mgl-10" src="/static/dropdown.png"></image>
            </view>
        </uni-nav-bar>
        <mescroll-body :ref="'mescrollRef'" @init="mescrollInit" @down="downCallback()" @up="upCallback()" :safearea="true">
            <view class="users">
                <view class="item bg-white borderb">
                    <view class="flex-between pd-30">
                        <view class="flex wordW">
                            <view class="w120 h120 pdr-20 flex-center">
                                <image src="/static/my/touxiang.png" class="w120 h120"></image>
                            </view>
                            <view class="wordW">
                                <view class="f30 mgb-20 wordW">张三</view>
                                <view class="f30 mgb-20 wordW">13123456789</view>
                            </view>
                        </view>
                    </view>
                    <view class="tr pdb-20">
                        <button class="btn mini-btn bg-white mgr-10">删除</button>
                        <button class="btn mini-btn bg-FF6E44 colorfff mgr-10">编辑</button>
                    </view>
                </view>
                <view class="item bg-white borderb">
                    <view class="flex-between pd-30">
                        <view class="flex wordW">
                            <view class="w120 h120 pdr-20 flex-center">
                                <image src="/static/my/touxiang.png" class="w120 h120"></image>
                            </view>
                            <view class="wordW">
                                <view class="f30 mgb-20 wordW">张三</view>
                                <view class="f30 mgb-20 wordW">13123456789</view>
                            </view>
                        </view>
                    </view>
                    <view class="tr pdb-20">
                        <button class="btn mini-btn bg-white mgr-10">删除</button>
                        <button class="btn mini-btn bg-FF6E44 colorfff mgr-10">编辑</button>
                    </view>
                </view>
            </view>
        </mescroll-body>
        <view>
            <movable-area class="fixed right100 bottom10 w0 h-calc100">
                <movable-view class="w100 h100" direction="vertical" :y="9999">
                    <template>
                        <image @click="go('../accountadd/index')" src="/static/main/add.png" class="w100 h100"></image>
                    </template>
                </movable-view>
            </movable-area>
        </view>
    </view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue' // 注意.vue后缀不能省
export default {
    components: {
        MescrollBody
    },
    mixins: [MescrollMixin],
    data() {
        return {
            nowShop: []
        }
    },
    onReady() {},
    onShow() {
        this.nowShop = uni.getStorageSync('chickNowShop')
    },
    methods: {
        // 下拉刷新的回调 (mixin默认resetUpScroll)
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

    .item {
        .w120 {
            width: 120rpx;
        }

        .h120 {
            height: 120rpx;
        }
    }
}
</style>
