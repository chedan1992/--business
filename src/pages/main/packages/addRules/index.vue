<template>
    <view class="content">
        <view class="bg-white pdl-15 mgt-30">
            <checkbox-group @change="checkboxChange">
                <label class="width100 flex pd-30 borderb" v-for="(item, e) in items" :key="e">
                    <view class="mgr-20">
                        <checkbox style="transform:scale(0.8)" :value="item" :checked="select.indexOf(item) > -1" />
                    </view>
                    <view class="f30">{{ item }}</view>
                </label>
            </checkbox-group>
        </view>
        <view class="fixed bottom0">
            <button class="btn bg-FF6E44 colorfff lh80 h80 block" @click="submit()">确认添加</button>
        </view>
    </view>
</template>

<script>
import unIicons from '@/components/uni-icons/uni-icons.vue'
export default {
    components: {},
    data() {
        return {
            items: [],
            labelStyle: {
                color: '#333',
                fontSize: '30rpx',
                width: '200rpx'
            },
            selectId: [],
            select: [],
            key: ''
        }
    },
    onReady() {},
    onLoad() {
        this.select = uni.getStorageSync('addRules')
        this.getList()
    },
    methods: {
        getList() {
            this.$api.active
                .getActivityRules({})
                .then(d => {
                    if (d.status == 1) {
                        this.items = d.data
                    } else {
                        this.showToast({
                            title: d.msg,
                            icon: 'none'
                        })
                    }
                })
                .catch(e => {})
        },
        checkboxChange: function(e, i) {
            let values = e.detail.value
            let items = this.items.concat()
            this.select = []
            this.items = items.map(e => {
                if (values.indexOf(e) > -1) {
                    //e.checked = true
                    this.select.push(e)
                } else {
                    //e.checked = false
                }
                return e
            })
        },
        submit() {
            if (this.select == '') {
                this.showToast({
                    title: '请选择要添加的规则',
                    icon: 'none'
                })
                return
            } else {
                uni.setStorageSync('addRules', this.select)
                this.back()
            }
        }
    }
}
</script>

<style lang="scss">
.content {
    padding: 0;

    .adressInput {
        height: 40px;
        line-height: 40px;
        width: 90%;
        margin-left: 5%;
    }

    .serchInput {
        width: 100%;
        height: 60rpx;
        line-height: 60rpx;
    }

    .btn {
        border: 0px;
        border-radius: 0px;
    }
}
</style>
