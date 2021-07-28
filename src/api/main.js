/*
 **首页
 **
 ****/
import {request} from '../utils/fetch.js'
//获取商家端首页数据信息
export function GetHomePageData(data) {
    return request({
        url: 'wxwebApi/GetHomePageData',
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
