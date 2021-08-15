/*
 **公用接口
 **
 ****/
import {
	request
} from '../utils/fetch.js'

export function login(data) {
    return request({
        url: 'wxwebApi/smallProAuth',
        method: 'post',
        data: data,
        loading: true
    })
}
export function smallProcessDecrypt(data) {
    return request({
        url: 'wxwebApi/smallProcessDecrypt',
        method: 'post',
        data: data,
        loading: true
    })
}

export function register(data) {
    return request({
        url: 'wxwebApi/register',
        method: 'post',
        data: data,
        loading: true
    })
}