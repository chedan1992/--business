/**
 * Created by xnr on 20/2/24.
 */
//公用
import * as common from './common'
import * as auth from './auth'


const apiObj = {
    common,
	auth
}

const install = function(Vue) {
    if (install.installed) return
    install.installed = true
    Object.defineProperties(Vue.prototype, {
        $api: {
            get() {
                return apiObj
            }
        }
    })
}
export default {
    install
}