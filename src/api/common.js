/*
 **公用接口
 **
 ****/
import {
	request,
	uploadFile
} from '../utils/fetch.js'


/**
 **服务器图片上传
 *****
 * 
 */
export function uploadServer(data) {
    return uploadFile({
        url: '/img/upload/server/img',
        method: 'post',
        data: data,
        loading: true
    })
}

/**
 **服务器图片上文件
 *****
 * 
 */
export function uploadServerFile(data) {
    return uploadFile({
        url: '/img/upload/server/file',
        method: 'post',
        data: data,
        loading: true
    })
}

/**
 * @param {type	类型 0其他1注册2重置密码3修改手机号,phone	手机号} data
 * 发送验证码
 */
export function smsSend(data) {
	return request({
		url: 'wxwebApi/sendcode',
		method: 'post',
		data: data,
		loading: true
	})
}
/**
 * @param {type	类型 0其他1注册2重置密码3修改手机号,phone	手机号,code	验证码} data
 * 校验验证码
 */
export function smsCheck(data) {
	return request({
		url: 'wxShopManager/validatePhone',
		method: 'post',
		data: data,
		loading: true
	})
}
