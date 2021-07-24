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
}
export function aboutUs(data) {
    return request({
        url: 'wxShopManager/shopAboutUs',
        method: 'get',
        data: data,
        loading: true
    })
}
