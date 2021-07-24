<template>
    <view class="content">
        {{ listData }}
    </view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
export default {
    components: {},
    mixins: [MescrollMixin],
    data() {
        return {
            listData: ''
        }
    },
    onReady() {},
    onLoad() {
        this.getList()
    },
    methods: {
        getList() {
            this.$api.my
                .aboutUs({
                    openid: uni.getStorageSync('openId')
                })
                .then(d => {
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
    padding: 40rpx;
}
</style>
