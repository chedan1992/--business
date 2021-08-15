let base_config = 'https://shop.laiyangni.com/'
let url_config = 'https://shop.laiyangni.com/'
let oss_config = 'https://shop.laiyangni.com'

// AppSecret:c75fe1d14d1b3e4e9c551a8df72a779e
// AppID:wxf5446a8f97590937

if (process.env.NODE_ENV === 'development') {
    // 开发环境
    base_config = 'https://shop.laiyangni.com/'
    url_config = 'https://shop.laiyangni.com/'
    //url_config = 'http://192.168.0.96:8888/'
} else {
    // 生产环境
    base_config = 'https://shop.laiyangni.com/'
    url_config = 'https://shop.laiyangni.com/'
}

export {base_config, url_config, oss_config}
