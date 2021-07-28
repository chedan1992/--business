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
