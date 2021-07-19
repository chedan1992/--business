import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		hasLogin: false,
		email: '',
		user:null,
		regData: null, // 注册表单
		regSchool: null
	},
	getters: { // 可以看做是state的计算属性，类似于组件中的data月computed
		islogin(state) {
			var r = uni.getStorageSync('hasLogin');
			return r ? true : false;
		},
		getEmail(state) {
			var email = uni.getStorageSync('email');
			return email;
		},
		getUser(state) {
			var user = uni.getStorageSync('user');
			return user ? user : null
		}
	},
	mutations: {
		setEmail(state, email) {
			state.email = email;
			uni.setStorageSync('email', email);
		},
		login(state, user) {
			state.user = user || null;
			state.hasLogin = true;
			uni.setStorageSync('hasLogin', true);
			uni.setStorageSync('user', user);
		},
		logout(state) {
			state.user = null;
			state.hasLogin = false;
			uni.setStorageSync('hasLogin', false);
			uni.clearStorageSync('uniToken');
			uni.clearStorageSync('user');
		},
		regDataSet(state, regData) {
			state.regData = regData;
		},
		regSchoolSet(state, regSchool) {
			state.regSchool = regSchool;
		}
	}
})

export default store
