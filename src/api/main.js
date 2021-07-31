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
//获取账单
export function getAccountBillList(data) {
    return request({
        url: 'wxBill/getAccountBillList',
        method: 'get',
        data: data,
        loading: true
    })
}
//获取充值提现列表
export function getFlowerDetailed(data) {
    return request({
        url: 'withdrawalRrecharge/getFlowerDetailed',
        method: 'post',
        data: data,
        loading: true
    })
}
//充值
export function postRecharge(data) {
    return request({
        url: 'withdrawalRrecharge/postRecharge',
        method: 'post',
        data: data,
        loading: true
    })
}
