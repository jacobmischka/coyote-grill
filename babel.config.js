/* eslint-env node */

module.exports = api => {

	api.cache.forever();

	return {
		"presets": [
			["@babel/preset-env", {
				"targets": {
					"browsers": [
						"> 1%",
						"last 2 versions"
					]
				},
				"debug": true,
				"modules": false
			}],
			["@babel/preset-react", {
				"pragma": "h"
			}]
		],
		"plugins": [
			"styled-jsx/babel",
			"@babel/plugin-syntax-dynamic-import",
			"babel-plugin-object-values-to-object-keys"
		]
	};
};
