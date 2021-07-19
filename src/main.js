import Vue from 'vue'
import App from './App'
import './css/comm.less';
import './css/comm.scss';

import store from './store'
Vue.prototype.$store = store
import {
	base_config,
	url_config,
	oss_config
} from './utils/config'
Vue.prototype.$config = {
	base_config,
	url_config,
	oss_config
}

import mixin from './utils/mixin.js'
Vue.mixin(mixin)

Vue.config.productionTip = false

App.mpType = 'app'
//接口导入
import api from './api/index.js';
Vue.use(api);
const app = new Vue({
	store,
	...App
})
app.$mount()
