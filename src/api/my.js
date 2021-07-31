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
