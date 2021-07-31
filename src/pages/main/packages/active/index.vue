<template>
    <view class="content">
        <uni-nav-bar color="#fff" leftIcon="arrowleft" @clickLeft="back" :fixed="true" :border="false" :statusBar="true" :backgroundColor="'#FF6E44'">
            <view class="center w-calc0" @click="goislogin('../../../selshop/index')">
                <text class="colorfff">{{ nowShop.shopname }}</text>
                <image class="w12 h8 mgl-10" src="/static/dropdown.png"></image>
            </view>
        </uni-nav-bar>
        <view ref="nav" id="nav" class="bg-white borderb">
            <mTab flex="dflex" :lineWidth="40" id="category" :tab-data="categoryData" :tab-cur-index="categoryCur" @change="toggleCategory"></mTab>
        </view>
        <swiper :current="categoryCur" :duration="300" @animationfinish="animationFinish" class="myswiper" :style="{height: get_height(86, true)}">
            <swiper-item v-for="(item, i) in categoryData" :key="i" class="my-swiper-item">
                <mescroll-uni
                    :ref="'mescrollRef' + i"
                    @init="mescrollInit"
                    @down="downCallback(i)"
                    @up="upCallback(i)"
                    :safearea="true"
                    :fixed="false"
                    :bottombar="false"
                >
                    <!-- // @init="mescrollInit" @down="downCallback" @up="upCallback"为固定值,不可删改(与mescroll-mixins保持一致)
					// :down="downOption" :up="upOption" 绝大部分情况无需配置
					// :top="顶部偏移量" :bottom="底部偏移量" :topbar="状态栏" :safearea="安全区" (常用)
					// 字节跳动小程序 ref="mescrollRef" 必须配置
					// 此处支持写入原生组件 -->
                    <view class="item bg-white borderb">
                        <view class="status">
                            <image src="../static/active/bohui.png" class="img"></image>
                        </view>
                        <view class="flex pd-30">
                            <view class="w120 h120 pdr-20 flex-center">
                                <image src="../static/shop/logo.png" class="w120 h120"></image>
                            </view>
                            <view class="wordW2">
                                <view class="f30 mgb-10 wordW">东门高端料理，宝宝们入股不亏</view>
                                <view class="flex-center">
                                    <view class="wordW2 f24 color666">五星好评，20字以上，2-4张图片（记得上传到 小程序）</view>
                                </view>
                            </view>
                        </view>
                        <view class="pdl-30 pdb-30">
                            <view class="colorFF6E44 f12 mgb-10">总共200单，剩余100单</view>
                            <view class="flex flex-between">
                                <view class="color999 f12"> 2021-05-26至2021-06-30 <br />每日09:00-12:00 </view>
                                <view>
                                    <button class="btn mini-btn bg-white mgr-10">禁用</button>
                                    <button class="btn mini-btn bg-FF6E44 colorfff mgr-10">重新提交</button>
                                </view>
                            </view>
                        </view>
                    </view>
                </mescroll-uni>
            </swiper-item>
        </swiper>
        <view>
            <movable-area class="fixed right100 bottom10 w0 h-calc100">
                <movable-view class="w100 h100" direction="vertical" :y="9999">
                    <template>
                        <image @click="go('../activeadd/index')" src="../static/active/add.png" class="w100 h100"></image>
                    </template>
                </movable-view>
            </movable-area>
        </view>
    </view>
</template>

<script>
import mTab from '@/components/m-tab'
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue' // 注意.vue后缀不能省
export default {
    components: {
        mTab,
        MescrollUni
    },
    mixins: [MescrollMixin],
    data() {
        return {
            key: '',
            categoryCur: 0,
            categoryData: [
                {
                    name: '全部',
                    typeId: 0,
                    listData: []
                },
                {
                    name: '待审核',
                    typeId: 1,
                    listData: []
                },
                {
                    name: '未开始',
                    typeId: 2,
                    listData: []
                },
                {
                    name: '进行中',
                    typeId: 3,
                    listData: []
                },
                {
                    name: '已结束',
                    typeId: 4,
                    listData: []
                }
            ],
            nowShop: []
        }
    },
    onReady() {},
    onShow() {
        this.nowShop = uni.getStorageSync('chickNowShop')
    },
    methods: {
        // mescroll组件初始化的回调,可获取到mescroll对象
        mescrollInit(mescroll) {
            if (this.mescrolls.length == 0) {
                this.mescroll = mescroll
                if (mescroll) {
                    this.mescrolls.push(mescroll)
                }
                this.mescrollInitByRef() // 兼容字节跳动小程序
            } else {
                if (mescroll) {
                    this.mescrolls.push(mescroll)
                }
            }
        },
        // 以ref的方式初始化mescroll对象 (兼容字节跳动小程序: http://www.mescroll.com/qa.html?v=20200107#q26)
        mescrollInitByRef() {
            if (!this.mescroll || !this.mescroll.resetUpScroll) {
                let mescrollRef = this.$refs['mescrollRef' + this.categoryCur]
                if (mescrollRef) {
                    this.mescroll = mescrollRef.mescroll
                    this.mescrolls.push(this.mescroll)
                }
            }
        },
        // 下拉刷新的回调 (mixin默认resetUpScroll)
        downCallback(i) {
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
        upCallback(index) {
            // mixin默认延时500自动结束加载
            this.getList(index)
        },
        getList(index) {
            let mescroll = this.mescrolls[index]
            let pageData = this.categoryData[index]
            mescroll.endBySize(0, 0)
            this.$api.active
                .getActivityList({
                    pindex: mescroll.num,
                    psize: mescroll.size,
                    shopid: this.nowShop.shopid,
                    key: this.key,
                    status: pageData.typeId
                })
                .then(d => {
                    //设置列表数据
                    //如果是第一页需手动置空列表
                    if (d.curPage == 1) pageData.listData = []
                    if (d.status == 1) {
                        pageData.listData = pageData.listData.concat(d.data)
                        let curPageLen = d.data.length
                        this.$set(this.categoryData, index, pageData)
                        setTimeout(e => {
                            mescroll.endBySize(curPageLen, d.totalCount)
                        }, 20)
                    } else {
                        mescroll.endErr()
                    }
                })
                .catch(e => {
                    mescroll.endErr()
                })
        },
        toggleCategory(e, i) {
            this.categoryCur = i
            this.mescroll = this.mescrolls[this.categoryCur]
            console.log(this.mescroll)
        },
        // 页面滑动切换事件
        animationFinish(e) {
            setTimeout(() => {
                this.categoryCur = e.detail.current
                this.mescroll = this.mescrolls[this.categoryCur]
                //console.log(this.mescroll)
            }, 0)
        }
    }
}
</script>

<style lang="scss">
.content {
    padding: 0;

    .item {
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
        .w120 {
            width: 120rpx;
        }

        .h120 {
            height: 120rpx;
        }

        .color17B97A {
            color: #17b97a;
        }

        .colorFF2E42 {
            color: #ff2e42;
        }
    }
}
</style>
