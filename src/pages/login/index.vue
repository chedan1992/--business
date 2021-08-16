<template>
    <view class="content">
        <view class="center">
            <image src="/static/logo.png" mode="aspectFill" class="logo"></image>
        </view>
        <button type="default" @click="getUserProfile" class="wxlogin">
            <view class="line">
                <view><image class="wxlogo" src="/static/weixin.png" mode="aspectFill"></image></view>
                <view><text>使用微信登录</text></view>
            </view>
        </button>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {}
    },
    onLoad(option) {
        this.dbSet('USER', {
            id: 1,
            telphone: '15701547716',
            nickname: '骑驴出山',
            gender: 2,
            province: '510000',
            city: '510100',
            dist: null,
            amount: 40,
            headimg: '/UploadFile/HeadImgLogo/63754352124505.jpg',
            isforbid: 0,
            isdelete: 0,
            createtime: '2020-09-30T11:33:54.763',
            paypwd: '123321',
            exprise: '2021-06-23T09:04:06.847',
            wxopenid: 'oByCw4mZX6_mhM5ZKT4G9Ws82V58'
        })
    },
    methods: {
        login: function() {
            this.back()
        },
        wxlogin() {
            return new Promise((resolve, reject) => {
                uni.login({
                    provider: 'weixin',
                    success(loginRes) {
                        resolve(loginRes)
                    }
                })
            })
        },
        getUserProfile() {
            let that = this
            // 获取用户信息
            if (uni.getUserProfile) {
                uni.getUserProfile({
                    desc: '用于完善会员资料',
                    async success(res) {
                        if (res.errMsg == 'getUserProfile:ok') {
                            let loginRes = await that.wxlogin()
                            let data = {
                                jscode: loginRes.code,
                                ...res.userInfo
                            }
                            that.$api.auth
                                .login(data)
                                .then(d => {
                                    if (d.status == 1) {
                                        if (!d.data.wxopenid) {
                                            that.showToast({
                                                title: JSON.stringify(d.data),
                                                icon: 'none'
                                            })
                                            return
                                        }
                                        let user = d.data
                                        that.dbSet('USER', that.formatUserInfo(user), data => {
                                            if (user.telphone) {
                                                that.back()
                                            } else {
                                                that.go('/pages/my/packages/bind/index')
                                            }
                                        })
                                    } else {
                                        that.showToast({
                                            title: d.msg,
                                            icon: 'none'
                                        })
                                    }
                                })
                                .catch(e => {
                                    console.log(e)
                                })
                        }
                    },
                    fail(error) {
                        console.log(error)
                    },
                    complete() {}
                })
            }
        }
    }
}
</script>

<style lang="scss">
.logo {
    width: 150rpx;
    height: 150rpx;
    margin-top: 100rpx;
}

.wxlogin {
    .line {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .wxlogo {
        width: 54rpx;
        height: 44rpx;
        margin-right: 20rpx;
    }

    margin: 80rpx 20rpx;
    padding: 10rpx;
    font-size: 40rpx;
    color: #ff6e44;
    border: 1px solid #ff6e44;
    border-radius: 80rpx;
}
</style>
