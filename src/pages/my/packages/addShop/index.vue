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
            <view><button class="btn bg-FF6E44 colorfff w140 h60 lh60" style="border-radius:0">搜索</button></view>
        </view>
        <view class="bg-white pdl-15 mgt-30">
            <checkbox-group @change="checkboxChange">
                <label class="width100 flex pd-30 borderb" v-for="item in items" :key="item.value">
                    <view class="mgr-20">
                        <checkbox color="white" style="transform:scale(0.8)" :value="item.value" :checked="selectId.indexOf(item.value) > -1" />
                    </view>
                    <view class="f30">{{ item.name }}</view>
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
            items: [
                {
                    value: '1',
                    name: '美国'
                },
                {
                    value: '2',
                    name: '中国'
                },
                {
                    value: '3',
                    name: '巴西'
                },
                {
                    value: '4',
                    name: '日本'
                },
                {
                    value: '5',
                    name: '英国'
                },
                {
                    value: '6',
                    name: '法国'
                }
            ],
            labelStyle: {
                color: '#333',
                fontSize: '30rpx',
                width: '200rpx'
            },
            selectId: []
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
                        this.selectId.push(item.value)
                    }
                })
            }
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
                if (values.includes(item.value)) {
                    that.$set(item, 'checked', true)
                } else {
                    that.$set(item, 'checked', false)
                }
            }
            //通过选中提取数据
            this.items.forEach(item => {
                if (item.checked == true && values.indexOf(item.value) > -1) {
                    select.push(item)
                }
            })
            uni.setStorageSync('addShop', select)
        },
        submit() {
            if (this.select == '') {
                this.showToast({
                    title: '请选择要添加的店铺',
                    icon: 'none'
                })
                return
            } else {
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
