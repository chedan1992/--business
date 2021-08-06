<template>
    <view class="content">
        <evan-form :hide-required-asterisk="false" ref="form" :model="form" :rules="rules">
            <view class="bg-white pdl-15">
                <evan-form-item prop="shopName" label="平台" :label-style="labelStyle">
                    <view class="flex-center adressInput">
                        <checkbox-group @change="checkboxChange" class="flex-between">
                            <label class="width100 flex pd-30 borderb">
                                <view class="mgr-20">
                                    <checkbox color="white" style="transform:scale(0.8)" :value="1" />
                                </view>
                                <view class="f30">美团</view>
                            </label>
                            <label class="width100 flex pd-30 borderb">
                                <view class="mgr-20">
                                    <checkbox color="white" style="transform:scale(0.8)" :value="2" />
                                </view>
                                <view class="f30">饿了么</view>
                            </label>
                        </checkbox-group>
                    </view>
                </evan-form-item>
                <evan-form-item prop="shopName" label="总数量" :label-style="labelStyle">
                    <input
                        type="text"
                        maxlength="10"
                        v-model="form.maxnumber"
                        placeholder="请输入总数量"
                        @blur="updateStatusActivity()"
                        placeholder-class="plh"
                        class="adressInput f30"
                    />
                </evan-form-item>
                <evan-form-item prop="shopName" label="条件" :label-style="labelStyle">
                    <view class="dflex">
                        <view class="flex-center">
                            <text class="color333 mgr-10">满</text>
                            <input type="text" maxlength="10" v-model="form.full" placeholder="多少" placeholder-class="plh" class="adressInput f30"
                        /></view>
                        <view class="flex-center">
                            <text class="color333 mgr-10">减</text>
                            <input type="text" maxlength="10" v-model="form.sub" placeholder="多少" placeholder-class="plh" class="adressInput f30"
                        /></view>
                    </view>
                </evan-form-item>
                <evan-form-item prop="shopName" label="开始日期" :label-style="labelStyle">
                    <view class="flex-between adressInput">
                        <view class="plh f30 w-calc20">
                            <MyPicker mode="date" placeholder="选择日期" :value="form.starttime" @change="starttime"></MyPicker>
                        </view>
                        <view>
                            <image src="../static/shop/arrow.png" class="w9 h15 mgr-20"></image>
                        </view>
                    </view>
                </evan-form-item>
                <evan-form-item prop="shopName" label="结束日期" :label-style="labelStyle">
                    <view class="flex-between adressInput">
                        <view class="plh f30 w-calc20">
                            <MyPicker mode="date" placeholder="选择日期" :value="form.endtime" @change="endtime"></MyPicker>
                        </view>
                        <view>
                            <image src="../static/shop/arrow.png" class="w9 h15 mgr-20"></image>
                        </view>
                    </view>
                </evan-form-item>
                <evan-form-item prop="shopName" label="活动时间" :label-style="labelStyle">
                    <view class="flex-between w-calc0">
                        <view class="flex-center w-calc29">
                            <view class="flex-between flex-center w-calc20">
                                <MyPicker mode="time" placeholder="选择时间" :value="form.todaystarttime" @change="todaystarttime"></MyPicker>
                                <view>
                                    <image src="../static/shop/arrow.png" class="w9 h15"></image>
                                </view>
                            </view>
                            <view class="lh15 h15 flex-center mgr-10 mgl-10">至</view>
                            <view class="flex-center w-calc20">
                                <MyPicker mode="time" placeholder="选择时间" :value="form.todayendtime" @change="todayendtime"></MyPicker>
                            </view>
                        </view>
                        <view>
                            <image src="../static/shop/arrow.png" class="w9 h15 mgr-20"></image>
                        </view>
                    </view>
                </evan-form-item>
                <!-- <evan-form-item prop="shopName" label="投放量" :label-style="labelStyle">
                    <input type="text" maxlength="10" v-model="form.maxnumber" placeholder="请输入投放量" placeholder-class="plh" class="adressInput f30" />
                </evan-form-item> -->
                <evan-form-item prop="shopName" label="描述" :label-style="labelStyle">
                    <input type="text" maxlength="10" v-model="form.remark" placeholder="请输入描述" placeholder-class="plh" class="adressInput f30" />
                </evan-form-item>
            </view>
        </evan-form>
        <view class="pd-30 f28">
            平台佣金4*数量20=80元 提示：本次活动需抵扣20*30元=600元，请保证余额充足。<br /><text class="colorFF6E44">当前余额：100元，请充值</text>
            <view class="colorFF6E44 mgt-30">点击去充值</view>
        </view>
        <view class="fixed bottom0">
            <button class="btn bg-FF6E44 colorfff lh80 h80 border-radius0 block" @click="save()">提交审核</button>
        </view>
    </view>
</template>

<script>
import MyPicker from '@/components/m-picker.vue'
export default {
    components: {
        MyPicker
    },
    data() {
        return {
            uImgList: [],
            labelStyle: {
                color: '#333',
                fontSize: '30rpx',
                width: '200rpx'
            },
            form: {
                activityId: 0,
                platformtype: '',
                full: '',
                sub: '',
                starttime: '',
                endtime: '',
                todaystarttime: '',
                todayendtime: '',
                remark: '',
                maxnumber: ''
            },
            rules: {
                platformtype: [
                    {
                        required: true,
                        message: '请选择平台'
                    }
                ],
                full: [
                    {
                        required: true,
                        message: '请输入满金额'
                    }
                ],
                sub: [
                    {
                        required: true,
                        message: '请输入减金额'
                    }
                ],
                starttime: [
                    {
                        required: true,
                        message: '请输入活动开始日期'
                    }
                ],
                endtime: [
                    {
                        required: true,
                        message: '请输入活动结束日期'
                    }
                ],
                todaystarttime: [
                    {
                        required: true,
                        message: '请输入活动开始时间'
                    }
                ],
                todayendtime: [
                    {
                        required: true,
                        message: '请输入活动结束时间'
                    }
                ],
                remark: [
                    {
                        required: true,
                        message: '请输入描述'
                    }
                ],
                maxnumber: [
                    {
                        required: true,
                        message: '请输入总数量'
                    }
                ]
            }
        }
    },
    onLoad(data) {},
    onReady() {},
    methods: {
        checkboxChange: function(e, i) {
            let values = e.detail.value
            this.form.platformtype = values
        },
        todayendtime(e) {
            this.form.todayendtime = e
        },
        todaystarttime(e) {
            this.form.todaystarttime = e
        },
        starttime(e) {
            this.form.starttime = e
        },
        endtime(e) {
            this.form.endtime = e
        },
        save() {
            this.$refs.form.validate().then(res => {
                if (res) {
                    if (this.form.activityId == 0) {
                        let data = []
                        this.form.platformtype.forEach(e => {
                            data.push({
                                shopId: uni.getStorageSync('chickNowShop').shopid,
                                platformtype: e,
                                full: this.form.full,
                                sub: this.form.sub,
                                maxnumber: this.form.maxnumber,
                                starttime: this.form.starttime,
                                endtime: this.form.endtime,
                                todaystarttime: this.form.todaystarttime,
                                todayendtime: this.form.todayendtime,
                                remark: this.form.remark
                            })
                        })

                        this.add(data)
                        console.log(this.form)
                    } else {
                        this.edit()
                    }
                }
            })
        },
        add(data) {
            this.$api.active
                .postActivity(data)
                .then(d => {
                    if (d.status == 1) {
                        this.showToast({
                            duration: 3000,
                            title: '保存成功'
                        }).then(r => {
                            this.back()
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
        edit() {
            this.$api.address
                .edit(this.form)
                .then(d => {
                    if (d.status == 1) {
                        this.showToast({
                            duration: 3000,
                            title: '保存成功'
                        }).then(r => {
                            this.back()
                        })
                    } else {
                        this.showToast({
                            title: d.msg,
                            icon: 'none'
                        })
                    }
                })
                .catch(e => {})
        }
    }
}
</script>

<style lang="scss" scoped>
.content {
    padding: 0;

    .bglogo {
        background-image: url('../static/shop/logo.png');
        background-size: 100% 100%;
    }

    .boder-bottom {
        border-bottom: 1px solid #dedede;
    }

    .adressInput {
        height: 40px;
        line-height: 40px;
        width: 100%;
    }
}

.btn {
    width: 100%;

    &.border-radius0 {
        border-radius: 0;
    }
}
</style>
