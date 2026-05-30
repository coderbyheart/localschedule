import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import unicorn from 'eslint-plugin-unicorn'
import preferArrow from 'eslint-plugin-prefer-arrow'
import prettier from 'eslint-config-prettier'
import globals from 'globals'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const tsconfigRootDir = dirname(fileURLToPath(import.meta.url))

export default [
	{ ignores: ['build/**', 'coverage/**', 'e2e-tests-out/**'] },
	js.configs.recommended,
	...tsPlugin.configs['flat/recommended'],
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: { projectService: true, tsconfigRootDir },
			globals: { ...globals.browser, ...globals.node },
		},
		plugins: {
			unicorn,
			'prefer-arrow': preferArrow,
		},
		rules: {
			'@typescript-eslint/explicit-function-return-type': ['off'],
			'@typescript-eslint/no-explicit-any': ['off'],
			'@typescript-eslint/await-thenable': ['error'],
			'@typescript-eslint/no-extraneous-class': ['error'],
			'@typescript-eslint/no-floating-promises': ['error'],
			'@typescript-eslint/no-for-in-array': ['error'],
			'@typescript-eslint/no-require-imports': ['error'],
			'@typescript-eslint/no-this-alias': ['error'],
			'@typescript-eslint/no-unnecessary-type-assertion': ['error'],
			'@typescript-eslint/no-useless-constructor': ['error'],
			'@typescript-eslint/prefer-for-of': ['error'],
			'@typescript-eslint/prefer-function-type': ['error'],
			'@typescript-eslint/prefer-includes': ['error'],
			'@typescript-eslint/prefer-readonly': ['error'],
			'@typescript-eslint/prefer-regexp-exec': ['error'],
			'@typescript-eslint/prefer-string-starts-ends-with': ['error'],
			'@typescript-eslint/promise-function-async': ['error'],
			'@typescript-eslint/require-array-sort-compare': ['error'],
			'@typescript-eslint/restrict-plus-operands': ['error'],
			'@typescript-eslint/strict-boolean-expressions': ['error'],
			'@typescript-eslint/prefer-nullish-coalescing': ['error'],
			'@typescript-eslint/prefer-optional-chain': ['error'],
			'@typescript-eslint/switch-exhaustiveness-check': ['error'],
			'prefer-promise-reject-errors': ['error'],
			'unicorn/prefer-string-slice': ['error'],
			'prefer-arrow/prefer-arrow-functions': ['error'],
			'object-shorthand': ['error'],
		},
	},
	{
		// Ambient declarations legitimately use the broad `Function` type.
		files: ['**/*.d.ts'],
		rules: {
			'@typescript-eslint/no-unsafe-function-type': ['off'],
		},
	},
	{
		// node:test's describe()/it() return promises that the runner awaits.
		files: ['**/*.spec.{ts,tsx}'],
		rules: {
			'@typescript-eslint/no-floating-promises': ['off'],
		},
	},
	prettier,
]
