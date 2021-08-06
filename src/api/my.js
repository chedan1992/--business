/*
 **公用接口
 **
 ****/
import {request} from '../utils/fetch.js'
//获取商家帮助
export function getHelp(data) {
    return request({
        url: 'wxShopManager/getShopHelper',
        method: 'get',
        data: data,
        loading: true
    })
} //关于我们
export function aboutUs(data) {
    return request({
        url: 'wxShopManager/shopAboutUs',
        method: 'get',
        data: data,
        loading: true
    })
}
//添加子账户
export function addSubUsers(data) {
    return request({
        url: 'wxShopManager/addSubUsers',
        method: 'post',
        data: data,
        loading: true
    })
}
//获取子账户
export function getSubUsersByShopId(data) {
    return request({
        url: 'wxShopManager/getSubUsersByShopId',
        method: 'post',
        data: data,
        loading: true
    })
}
//发送验证码
export function sendcode(data) {
    return request({
        url: 'wxwebapi/sendcode',
        method: 'get',
        data: data,
        loading: false
    })
}
//验证当前手机
export function validatePhone(data) {
    return request({
        url: 'wxShopManager/validatePhone',
        method: 'post',
        data: data,
        loading: false
    })
}
//修改绑定手机
export function updatePhone(data) {
    return request({
        url: 'wxShopManager/updatePhone',
        method: 'post',
        data: data,
        loading: false
    })
}
