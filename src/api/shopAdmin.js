/*
 **店铺管理
 **
 ****/
import {request} from '../utils/fetch.js'
//获取店铺列表
export function shopList(data) {
    return request({
        url: 'wxwebApi/GetAllShopList',
        method: 'get',
        data: data,
        loading: true
    })
}
//添加店铺
export function addShop(data) {
    return request({
        url: 'wxShopManager/addShop',
        method: 'post',
        data: data,
        loading: true
    })
}
//获取店铺分类
export function getCategory(data) {
    return request({
        url: 'wxShopManager/getCategory',
        method: 'post',
        data: data,
        loading: true
    })
}
