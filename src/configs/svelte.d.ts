import type { Linter } from 'eslint'

export interface SvelteOptions {
	typescript?: boolean
	useStylistic?: boolean
}

export function svelte(options?: SvelteOptions): Linter.Config[]
