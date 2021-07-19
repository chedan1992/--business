/**
 * Created by xnr on 19/12/30.
 */

export function isvalidUsername(str) {
	const valid_map = ['admin', 'editor']
	return valid_map.indexOf(str.trim()) >= 0
}
/* 邮箱校验*/
export function validateeMail(str) {
	//const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
	const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
	return reg.test(str)
}
/* 合法uri*/
export function validateURL(textval) {
	const urlregex =
		/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
	return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
	const reg = /^[a-z]+$/
	return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
	const reg = /^[A-Z]+$/
	return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
	const reg = /^[A-Za-z]+$/
	return reg.test(str)
}


var isPhone = /^1\d{10}$/
var isMob = /^((\+?86)|(\(\+86\)))?(1[0-9]{10})$/;
// 电话号码校验
export function validateTelephone(value) {
	return isMob.test(value)
}

// 手机号码校验
export function validateMobilePhone(value) {
	return isPhone.test(value)
}
// 验证码校验
export function validateCode(rule, value, callback) {
	if (rule.required || (value && value !== '')) {
		var isCode = /^[0-9]{6}$/;
		if (!isCode.test(value)) {
			callback(new Error('请输入6位数字'))
		} else {
			callback()
		}
	} else {
		callback()
	}
}

// 密码校验
var pattern = /^[a-zA-Z0-9]{6,20}$/ ///(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,20}$/
export function validatePass(rule, value, callback) {
	if (value === '') {
		callback(new Error('请输入密码'))
	} else if (!pattern.test(value)) {
		callback(new Error('字母，数字，长度为6-20个字符'))
	} else {
		callback()
	}
}

// 校验小数后2位
export function floatValidate(rule, value, callback) {
	if (rule.required || (value && value !== '')) {
		var pattern = /^([0-9]\d?(\.\d{1,2})?|100)$/
		if (!pattern.test(value)) {
			callback(new Error('请输入保留100以内的小数点后2位数字'))
		} else {
			callback()
		}
	} else {
		callback()
	}
}

// 校验单价，精确到小数点后2位
export function unitPriceValidate(rule, value, callback) {
	if (rule.required || (value && value !== '')) {
		var pattern = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/
		if (!pattern.test(value)) {
			callback(new Error('请输入整数或者保留两位小数'))
		} else {
			callback()
		}
	} else {
		callback()
	}
}

// 校验总价，精确到小数点后5位
export function totalPriceValidate(rule, value, callback) {
	if (rule.required || (value && value !== '')) {
		var pattern = /(^[1-9]\d*(\.\d{1,5})?$)|(^0(\.\d{1,5})?$)/
		if (!pattern.test(value)) {
			callback(new Error('请输入整数或者保留五位小数'))
		} else {
			callback()
		}
	} else {
		callback()
	}
}

// 校验单重，精确到小数点后2位
export function unitWeightValidate(rule, value, callback) {
	if (rule.required || (value && value !== '')) {
		var pattern = /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/
		console.log('pattern=' + pattern)
		console.log('value=' + value)
		if (!pattern.test(value)) {
			callback(new Error('请输入整数或者保留两位小数'))
		} else {
			callback()
		}
	} else {
		callback()
	}
}

// 正数校验
export function positiveNumValidate(rule, value, callback) {
	var pattern = /^(\+)?\d+(\.\d+)?$/
	if (rule.required || (value && value !== '')) {
		if (!pattern.test(value)) {
			callback(new Error('请输入正数'))
		} else {
			callback()
		}
	} else {
		callback()
	}
}

// 整数校验
export function integerNumValidate(rule, value, callback) {
	var pattern = /^(\+)?\d+$/
	if (rule.required || (value && value !== '')) {
		if (!pattern.test(value)) {
			callback(new Error('请输入正整数'))
		} else {
			callback()
		}
	} else {
		callback()
	}
}

import {
	oss_config
} from './config.js'
const format = {
	DateFormat(timestamp, formats) {
		// formats格式包括
		// 1. Y-m-d
		// 2. Y-m-d H:i:s
		// 3. Y年m月d日
		// 4. Y年m月d日 H时i分
		formats = formats || 'Y-m-d';
		var d = this.DateObj(timestamp);
		return formats.replace(/Y|m|d|H|i|s/ig, function(matches) {
			return ({
				Y: d.year,
				m: d.month,
				d: d.day,
				H: d.hour,
				i: d.minite,
				s: d.second
			})[matches];
		});
	},
	DateObj(timestamp) {
		var zero = function(value) {
			if (value < 10) {
				return '0' + value;
			}
			return value;
		};
		if (typeof(timestamp) == typeof("")) {
			timestamp = timestamp.replace(/-/g, "/").replace(/\.0/g, "")
		}
		var myDate = timestamp ? new Date(timestamp) : new Date();
		var year = myDate.getFullYear();
		var month = zero(myDate.getMonth() + 1);
		var day = zero(myDate.getDate());
		var hour = zero(myDate.getHours());
		var minite = zero(myDate.getMinutes());
		var second = zero(myDate.getSeconds());
		return {
			year,
			month,
			day,
			hour,
			minite,
			second
		}
	},
	OssFormat(uri, type) {
		if (!uri)
			return "";
		if (uri.length >= 4 && uri.indexOf("http") > -1)
			return uri;
		var url = oss_config + uri;
		if (type) {
			switch (type) {
				case 'd':
					url += '';
					break;
				case 'l':
					url += "/";
					url += '800';
					break;
				case 'f':
					url += "/";
					url += '400';
					break;
				case 'm':
					url += "/";
					url += '250';
					break;
				case 's':
					url += "/";
					url += '120';
					break;
			}
		}
		return url;
	}
}

export {
	format
}
