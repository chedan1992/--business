<template>
    <view class="content">
        <view>
            <uni-collapse accordion="true" v-if="listData != ''">
                <uni-collapse-item v-for="(item, i) in listData" :key="i" :title="item.question" size="30px">
                    <view style="padding: 30rpx;" class="f28">
                        {{ item.answer }}
                    </view>
                </uni-collapse-item>
            </uni-collapse>
        </view>
        <uni-view class="mescroll-empty" style="z-index: 99; top: 50px;" v-if="listData == ''">
            <uni-view>
                <uni-image class="empty-icon" style="height: 138px;">
                    <div style='background-image: url("/static/null.png"); background-size: 100% 100%; background-repeat: no-repeat;'></div>
                    <img src="/static/null.png" />
                    <uni-resize-sensor>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                    </uni-resize-sensor>
                </uni-image>
            </uni-view>
            <uni-view class="empty-tip">~ 空空如也 ~</uni-view>
            <!---->
        </uni-view>
    </view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue' // 注意.vue后缀不能省
import unIicons from '@/components/uni-icons/uni-icons.vue'
export default {
    components: {
        MescrollBody,
        unIicons
    },
    mixins: [MescrollMixin],
    data() {
        return {
            listData: []
        }
    },
    onReady() {},
    onLoad() {
        this.getList()
    },
    methods: {
        getList() {
            this.$api.my
                .getHelp({
                    openid: uni.getStorageSync('openId')
                })
                .then(d => {
                    //设置列表数据
                    //如果是第一页需手动置空列表
                    if (d.curPage == 1) this.listData = []
                    if (d.status == 1) {
                        this.listData = this.listData.concat(d.data)
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
    .mescroll-empty {
        box-sizing: border-box;
        width: 100%;
        padding: 50px 25px;
        text-align: center;
    }
    .mescroll-empty .empty-tip {
        margin-top: 10px;
        font-size: 12px;
        color: gray;
    }
    .empty-icon {
        width: 140px;
        height: 140px;
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
</style>
