/*
 **订单接口
 **
 ****/
import {request} from '../utils/fetch.js'
//获取订单列表
export function getOrdersByShopId(data) {
    return request({
        url: 'wxOrders/getOrdersByShopId',
        method: 'post',
        data: data,
        loading: true
    })
}
//获取订单详情
export function getOrderDetails(data) {
    return request({
        url: 'wxOrders/getOrderDetails',
        method: 'get',
        data: data,
        loading: true
    })
}
//审核订单
export function OrderJudge(data) {
    return request({
        url: 'wxOrders/OrderJudge',
        method: 'post',
        data: data,
        loading: true
    })
}
