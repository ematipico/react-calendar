module.exports = {
	env: {
		browser: true,
		es6: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:react/recommended',
		'prettier',
		'prettier/@typescript-eslint',
		'prettier/react'
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: 'module',
		project: './tsconfig.json'
	},
	plugins: ['react', '@typescript-eslint', 'prettier'],
	rules: {
		indent: ['error', 'tab', {
			"SwitchCase": 1
		}],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		"@typescript-eslint/explicit-function-return-type": "off",
		"react/prop-types": "off"

	}
};
