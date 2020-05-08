declare module '*.svg' {
	const content: React.StatelessComponent<React.SVGAttributes<SVGElement>>
	export default content
}
/**
 * This string is replaced through webpack.
 */
declare const GLOBAL_VERSION: string

/**
 * This string is replaced through webpack.
 */
declare const GLOBAL_IS_PRODUCTION: boolean

/**
 * The GitHub URL of this project
 */
declare const GLOBAL_GITHUB_URL: string
