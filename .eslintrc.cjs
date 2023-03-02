module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:jest/recommended',
		'plugin:jest/style',
		'plugin:testing-library/react',
		'plugin:storybook/recommended'
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		tsconfigRootDir: './',
		project: ['./tsconfig.json']
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/display-name': 'off',
		'react/prop-types': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'@typescript-eslint/no-floating-promises': 'off'
	},
	parser: '@typescript-eslint/parser',
	settings: {
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true
			}
		}
	}
}
