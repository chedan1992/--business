/*
 **活动
 **
 ****/
import {request} from '../utils/fetch.js'
//获取活动列表
export function getActivityList(data) {
    return request({
        url: 'wxActivity/getActivityList',
        method: 'get',
        data: data,
        loading: true
    })
}
//获取添加活动
export function postActivity(data) {
    return request({
        url: 'wxActivity/postActivity',
        method: 'post',
        data: data,
        loading: true
    })
}
