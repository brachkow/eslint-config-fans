import parserTypescript from '@typescript-eslint/parser'
import pluginSvelte from 'eslint-plugin-svelte'
import parserSvelte from 'svelte-eslint-parser'
import { GLOB_SVELTE } from '../globs.js'
import { defineConfig } from '../utils/index.js'

export function svelte(options = {}) {
	const { typescript = false, useStylistic = false } = options

	const svelteRecommendedRules = pluginSvelte.configs['flat/recommended']
		.reduce((previous, current) => ({
			...previous,
			...current.rules,
		}), {})

	return defineConfig([
		{
			name: 'fans/svelte',
			files: [GLOB_SVELTE],
			plugins: {
				svelte: pluginSvelte,
			},
			languageOptions: {
				parser: parserSvelte,
				parserOptions: {
					extraFileExtensions: ['.svelte'],
					parser: typescript ? parserTypescript : undefined,
				},
				sourceType: 'module',
			},
			processor: pluginSvelte.processors.svelte,
			rules: {
				...svelteRecommendedRules,

				// Disabled for compatibility with external formatters (Prettier, oxfmt, etc.)
				...useStylistic
					? {}
					: {
							'svelte/indent': 'off',
							'svelte/html-self-closing': 'off',
						},
			},
		},
	])
}
