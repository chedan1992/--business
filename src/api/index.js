/**
 * Created by xnr on 20/2/24.
 */
//公用
import * as common from './common'
import * as auth from './auth'
import * as my from './my'
import * as shopAdmin from './shopAdmin'
import * as main from './main'
import * as order from './order'
import * as active from './active'
const apiObj = {
    common,
    auth,
    my,
    shopAdmin,
    main,
    order,
    active
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
