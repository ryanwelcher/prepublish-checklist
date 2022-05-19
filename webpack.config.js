const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
module.exports = {
	...defaultConfig,
	entry: {
		plugin: './src/plugin',
		admin: './src/admin',
	},
};
