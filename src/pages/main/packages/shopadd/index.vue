<template>
    <view class="content">
        <evan-form :hide-required-asterisk="false" ref="form" :model="form" :rules="rules">
            <view class="bg-white pdl-15">
                <evan-form-item label="店铺logo" :label-style="labelStyle">
                    <view class="flex-center pdb-20">
                        <view class="">
                            <zhtx-uploadImg class="bglogo" @uploadSuccess="uploadSuccess" :width="50" :height="50" :uImgList="uImgList" :limit="1">
                            </zhtx-uploadImg>
                        </view>
                        <view class="f30 color999 pdl-20">点击上传logo</view>
                    </view>
                </evan-form-item>
                <evan-form-item prop="shopName" label="店铺名称" :label-style="labelStyle">
                    <input type="text" maxlength="10" v-model="form.shopName" placeholder="请输入店铺名称" placeholder-class="plh" class="adressInput f30" />
                </evan-form-item>
                <evan-form-item prop="onecategory" label="店铺分类" :label-style="labelStyle">
                    <view class="flex-between adressInput" v-if="catList != ''">
                        <picker @change="bindPickerChange" :value="index" :range="catList" :range-key="'categoryname'">
                            <view class="plh f30">
                                {{ catList[index].categoryname }}
                            </view>
                        </picker>

                        <view>
                            <image src="../static/shop/arrow.png" class="w9 h15  mgr-20"></image>
                        </view>
                    </view>
                </evan-form-item>
                <!-- <evan-form-item prop="shopName" label="美团链接" :label-style="labelStyle">
                    <input type="text" maxlength="10" v-model="form.shopName" placeholder="请输入美团链接" placeholder-class="plh" class="adressInput f30" />
                </evan-form-item>
                <evan-form-item prop="shopName" label="饿了么链接" :label-style="labelStyle">
                    <input type="text" maxlength="10" v-model="form.shopName" placeholder="请输入饿了么链接" placeholder-class="plh" class="adressInput f30" />
                </evan-form-item> -->
                <evan-form-item prop="region" label="省市区" :label-style="labelStyle">
                    <view class="flex-between adressInput" @tap="openPicker()">
                        <view class="plh f30">
                            {{ form.region != '' ? form.region : '选择省／市/区' }}
                        </view>
                        <view>
                            <image src="../static/shop/arrow.png" class="w9 h15  mgr-20"></image>
                        </view>
                    </view>
                </evan-form-item>
                <evan-form-item prop="address" label="店铺地址" :label-style="labelStyle">
                    <view class="flex-between widht100" @tap="clickHandle()">
                        <view class="plh f30">
                            {{ form.address != '' ? form.address : '请选择店铺地址' }}
                        </view>
                        <view>
                            <image src="../static/shop/arrow.png" class="w9 h15  mgr-20"></image>
                        </view>
                    </view>
                </evan-form-item>
            </view>
        </evan-form>
        <view class="fixed bottom10 pdb-20 center">
            <view class="btn bg-FF6E44 lh80 h80 colorfff" @tap="save()">提交</view>
        </view>
        <lotus-address v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
    </view>
</template>

<script>
import zhtxUploadImg from '@/components/zhtx-uploadImg/zhtx-uploadImg.vue'
import lotusAddress from '../../../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue'
export default {
    components: {
        zhtxUploadImg,
        'lotus-address': lotusAddress
    },
    data() {
        return {
            index: 0,
            uImgList: [],
            labelStyle: {
                color: '#333',
                fontSize: '30rpx',
                width: '200rpx'
            },
            form: {
                shopName: '',
                shopId: 0,
                onecategory: 0,
                region: '',
                address: ''
            },
            rules: {
                shopName: [
                    {
                        required: true,
                        message: '请输入店铺名称'
                    }
                ],
                region: [
                    {
                        required: true,
                        message: '请选择省市区'
                    }
                ],
                address: [
                    {
                        required: true,
                        message: '请选择店铺地址'
                    }
                ],
                onecategory: [
                    {
                        required: true,
                        message: '请选择店铺分类'
                    }
                ]
            },
            latitude: '',
            longitude: '',
            lotusAddressData: {
                visible: false,
                provinceName: '',
                cityName: '',
                townName: ''
            },
            catList: []
        }
    },
    onLoad(data) {
        if (data.id) {
            this.form.shopId = data.id
            this.getDetail()
            console.log(this.form.shopId)
        }

        this.getCat()
    },
    onReady() {},
    methods: {
        bindPickerChange(e) {
            this.index = e.target.value
            this.form.onecategory = this.catList[this.index].id
        },
        getCat() {
            this.$api.shopAdmin
                .getCategory({})
                .then(d => {
                    console.log(d)
                    if (d.status == 1) {
                        this.catList = d.data
                        this.onecategory = d.data[0].id
                    }
                })
                .catch(e => {
                    console.log(e, 1)
                })
        },
        save() {
            this.$refs.form.validate().then(res => {
                if (res) {
                    //this.form.regionId = this.region[2][this.regionIds[2]].regionId;
                    this.add()
                }
            })
        },
        add() {
            let data = {
                shoplogo: this.uImgList.join(','),
                shopname: this.form.shopName,
                onecategory: this.form.onecategory,
                provinceid: this.lotusAddressData.provinceid,
                cityid: this.lotusAddressData.cityid,
                distid: this.lotusAddressData.distid,
                shopaddress: this.form.address,
                lat: this.latitude,
                lon: this.longitude,
                shopid: this.form.shopId
            }
            if (this.form.shopId > 0) {
                data.id = this.form.shopId
            }
            console.log(data)
            this.$api.shopAdmin
                .addShop(data)
                .then(d => {
                    console.log(d)
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
                .catch(e => {
                    console.log(e, 1)
                })
        },
        getDetail() {
            this.$api.shopAdmin
                .getShopDetailsById({shopid: this.form.shopId})
                .then(d => {
                    if (d.status == 1) {
                        this.uImgList.push(d.data.shoplogo)
                        this.form.shopName = d.data.shopname
                        this.form.address = d.data.shopaddress
                        console.log(d.data)
                        //this.catList = d.data
                        //this.onecategory = d.data[0].id
                    }
                })
                .catch(e => {
                    console.log(e, 1)
                })
        },
        clickHandle() {
            uni.chooseLocation({
                keyword: this.form.address,
                success: res => {
                    this.longitude = res.longitude
                    this.latitude = res.longitude
                    this.form.address = res.address
                }
            })
        },
        //打开picker
        openPicker() {
            this.lotusAddressData.visible = true
        },
        //回传已选的省市区的值
        choseValue(res) {
            //res数据源包括已选省市区与省市区code
            console.log(res)
            this.lotusAddressData.visible = res.visible //visible为显示与关闭组件标识true显示false隐藏
            //res.isChose = 1省市区已选 res.isChose = 0;未选
            if (res.isChose) {
                this.lotusAddressData.provinceName = res.province //省
                this.lotusAddressData.provinceid = res.provinceCode
                this.lotusAddressData.cityName = res.city //市
                this.lotusAddressData.cityid = res.cityCode
                this.lotusAddressData.townName = res.town //区
                this.lotusAddressData.distid = res.townCode
                this.form.region = `${res.province} ${res.city} ${res.town}` //region为已选的省市区的值
            }
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
    width: 320px;
}
</style>
