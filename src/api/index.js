/**
 * Created by xnr on 20/2/24.
 */
//公用
import * as common from './common'
import * as auth from './auth'
import * as my from './my'
import * as shopAdmin from './shopAdmin'
const apiObj = {
    common,
    auth,
    my,
    shopAdmin
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
