const path = require('path')
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const pxtoviewport = require('postcss-px-to-viewport');

module.exports = {
	parser: require('postcss-comment'),
	plugins: [
		require('postcss-import')({
			resolve(id, basedir, importOptions) {
				if (id.startsWith('~@/')) {
					return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3))
				} else if (id.startsWith('@/')) {
					return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2))
				} else if (id.startsWith('/') && !id.startsWith('//')) {
					return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1))
				}
				return id
			}
		}),
		require('autoprefixer')({
			remove: process.env.UNI_PLATFORM !== 'h5'
		}),
		pxtoviewport({
			viewportWidth: 375
		}),
		pxtorem({
			rootValue: 37.5,
			propList: ['*']
		}),
		require('@dcloudio/vue-cli-plugin-uni/packages/postcss')
	]
}
