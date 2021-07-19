let base_config = "https://www.neibuyongde.com/"
let url_config = "https://www.neibuyongde.com/"
let oss_config = "https://www.neibuyongde.com/"

if (process.env.NODE_ENV === 'development') {
	// 开发环境
	base_config ='https://www.neibuyongde.com/' 
	url_config = 'https://www.neibuyongde.com/'
	//url_config = 'http://192.168.0.96:8888/'
} else {
	// 生产环境
	base_config ='https://www.neibuyongde.com/' 
	url_config = 'https://www.neibuyongde.com/'
}

export {
	base_config,
	url_config,
	oss_config
}
