/**
 * Created by xnr on 20/05/26.
 */

import {format, dbSet, dbGet, dbDelete} from './tool.js'

const extend = {
    data() {
        let user = this.dbGet('USER')

        let nowShop = uni.getStorageSync('chickNowShop')
        return {
            nowShop: nowShop,
            USER: user,
            islogin: user ? true : false
        }
    },
    onShareAppMessage() {
        //用户点击右上角分享
    },
    onUnload() {
        //监听页面卸载
    },
    props: {},
    methods: {
        formatUserInfo(user) {
            return user
        },
        dbSet(key, value, fn) {
            return dbSet(key, value, fn)
        },
        dbGet(key, fn) {
            return dbGet(key, fn)
        },
        dbDelete(key, fn) {
            return dbDelete(key, fn)
        },
        htmlFormat(htmlText) {
            if (htmlText) {
                let str = htmlText.replace(/<img[^>]*>/gi, function(match, capture) {
                    // return match.replace(/(<img[^>]*)(\/?>)/gi, "$1width='100%' $2") // 添加width="100%"
                    return match.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/gi, 'style="max-width:100%;height:auto;"') // 替换style
                })
                return str
            }
            return ''
        },
        get_height(h, isbar) {
            let barh = isbar ? uni.getSystemInfoSync().statusBarHeight : 0
            h = h ? h : 44
            console.log(barh)
            return uni.getSystemInfoSync().windowHeight - barh - h + 'px'
        },
        ossFormat(url, type) {
            return format.OssFormat(url, type)
        },
        dateFormat(date, type) {
            return format.DateFormat(date, type)
        },
        errorImg() {
            return ''
        },
        go(url) {
            if (url) {
                uni.navigateTo({
                    url: url
                })
            }
        },
        goislogin(r) {
            if (this.islogin == false) {
                this.showModal({
                    title: '提示',
                    content: '您还未登录，快去登录吧'
                }).then(r => {
                    if (r.confirm) {
                        this.go('/pages/login/index')
                    }
                })
            } else {
                if (this.USER.telphone) {
                    this.go(r)
                } else {
                    this.showModal({
                        title: '提示',
                        content: '您还未绑定手机号，快去绑定吧'
                    }).then(r => {
                        if (r.confirm) {
                            this.go('/pages/my/packages/bind/index')
                        }
                    })
                }
            }
        },
        goTop(url) {
            uni.reLaunch({
                url: url
            })
        },
        back(i) {
            uni.navigateBack({
                delta: i ? i : 1
            })
        },
        showToast(data) {
            return new Promise((reject, resolve) => {
                data.success = function() {
                    reject()
                }
                data.file = function() {
                    resolve()
                }
                uni.showToast(data)
            })
        },
        showModal(data) {
            return new Promise((reject, resolve) => {
                data.success = function(res) {
                    reject(res)
                }
                data.file = function() {
                    resolve()
                }
                uni.showModal(data)
            })
        },
        showPopup(id) {
            this.$refs[id].open()
        },
        closePopup(id) {
            this.$refs[id].close()
        }
    }
}

export default extend
