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
        requestBody: 'body',
        loading: true
    })
}
//删除活动
export function deleteActivity(data) {
    return request({
        url: 'wxActivity/deleteActivity',
        method: 'get',
        data: data,
        loading: true
    })
}
//更改活动状态
export function updateStatusActivity(data) {
    return request({
        url: 'wxActivity/updateStatusActivity',
        method: 'get',
        data: data,
        loading: true
    })
}
//获取添加活动规则
export function getActivityRules(data) {
    return request({
        url: 'wxActivity/getActivityRules',
        method: 'get',
        data: data,
        loading: true
    })
}
//获取活动信息
export function getActivityById(data) {
    return request({
        url: 'wxActivity/getActivityById',
        method: 'get',
        data: data,

        loading: true
    })
}
//修改活动
export function updateActivity(data) {
    return request({
        url: 'wxActivity/updateActivity',
        method: 'post',
        data: data,
        requestBody: 'body',
        loading: true
    })
}
