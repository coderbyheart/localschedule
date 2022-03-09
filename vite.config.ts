import react from '@vitejs/plugin-react'
import fs from 'fs'
import Handlebars from 'handlebars'
import path from 'path'
import { defineConfig } from 'vite'

const {
	version,
	homepage,
	bugs: { url: issuesUrl },
} = JSON.parse(
	fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'),
)

const { short_name, name, theme_color, background_color } = JSON.parse(
	fs.readFileSync(path.join(process.cwd(), 'public', 'manifest.json'), 'utf-8'),
)

process.env.PUBLIC_VERSION = process.env.PUBLIC_VERSION ?? version ?? Date.now()
process.env.PUBLIC_HOMEPAGE = process.env.PUBLIC_HOMEPAGE ?? homepage
process.env.PUBLIC_ISSUES = issuesUrl
process.env.PUBLIC_MANIFEST_SHORT_NAME = short_name
process.env.PUBLIC_MANIFEST_NAME = name
process.env.PUBLIC_MANIFEST_THEME_COLOR = theme_color
process.env.PUBLIC_MANIFEST_BACKGROUND_COLOR = background_color

const replaceInIndex = (data: Record<string, string>) => ({
	name: 'replace-in-index',
	transformIndexHtml: (source: string): string => {
		const template = Handlebars.compile(source)
		return template(data)
	},
})

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		replaceInIndex({
			name,
			shortName: short_name,
			themeColor: theme_color,
			version,
		}),
	],
	base: `${(process.env.BASE_URL ?? '').replace(/\/+$/, '')}/`,
	preview: {
		host: 'localhost',
		port: 8080,
	},
	server: {
		host: 'localhost',
		port: 8080,
	},
	resolve: {
		alias: [
			{ find: 'app/', replacement: '/src/' },
			{ find: 'style/', replacement: '/src/style/' },
		],
	},
	build: {
		outDir: './build',
	},
	envPrefix: 'PUBLIC_',
})
