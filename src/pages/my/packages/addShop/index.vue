<template>
    <view class="content">
        <view id="search" class="flex-between pd-30 bg-white borderb">
            <view class="inputs" style="background-color:#F2F2F2;width:calc(100% - 140rpx)">
                <input
                    @confirm="search"
                    placeholder-class="plh"
                    name="search"
                    confirm-type="search"
                    v-model="key"
                    type="text"
                    placeholder="搜索店铺"
                    class="serchInput pdl-20"
                />
            </view>
            <view><button class="btn bg-FF6E44 colorfff w140 h60 lh60" style="border-radius:0" @click="getList()">搜索</button></view>
        </view>
        <view class="bg-white pdl-15 mgt-30">
            <checkbox-group @change="checkboxChange">
                <label class="width100 flex pd-30 borderb" v-for="item in items" :key="item.shopid">
                    <view class="mgr-20">
                        <checkbox color="white" style="transform:scale(0.8)" :value="item.shopid" :checked="selectId.indexOf(item.shopid) > -1" />
                    </view>
                    <view class="f30">{{ item.shopname }}</view>
                </label>
            </checkbox-group>
        </view>
        <view class="fixed bottom0">
            <button class="btn bg-FF6E44 colorfff lh80 h80 border-radius0 block" @click="submit()">确认添加</button>
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
        this.getList()
    },
    methods: {
        getList() {
            this.selectId = []
            let data = uni.getStorageSync('addShop')
            if (data != '') {
                data.forEach(item => {
                    if (item.checked == true) {
                        this.selectId.push(item.shopid)
                    }
                })
            }
            this.$api.shopAdmin
                .shopList({
                    current: 1,
                    size: 10000,
                    isselect: 0,
                    keyword: this.key
                })
                .then(d => {
                    console.log(d)
                    //设置列表数据
                    //如果是第一页需手动置空列表
                    this.items = []
                    if (d.status == 1) {
                        this.items = this.items.concat(d.data)
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
        },
        checkboxChange: function(e, i) {
            let values = e.detail.value,
                items = this.items,
                that = this,
                select = []
            this.selectId = values
            //设置选中
            for (var i = 0, lenI = items.length; i < lenI; ++i) {
                const item = items[i]
                if (values.includes(item.shopid)) {
                    that.$set(item, 'checked', true)
                } else {
                    that.$set(item, 'checked', false)
                }
            }
            //通过选中提取数据
            this.items.forEach(item => {
                if (item.checked == true && values.indexOf(item.shopid) > -1) {
                    select.push(item)
                }
            })
            this.select = select
        },
        submit() {
            if (this.select == '') {
                this.showToast({
                    title: '请选择要添加的店铺',
                    icon: 'none'
                })
                return
            } else {
                uni.setStorageSync('addShop', this.select)
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
}
</style>
