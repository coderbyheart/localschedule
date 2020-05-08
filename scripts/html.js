const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')

const getVersion = () => {
	let v = 'unknown'
	const versionFile = path.join(process.cwd(), '.version')
	try {
		v = fs
			.readFileSync(versionFile)
			.toString()
			.trim()
	} catch (err) {
		console.error(`Failed to read ${versionFile}: ${err.message}.`)
		v = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')))
			.version
	}
	return v
}

const html = globals => {
	const html = fs.readFileSync(
		path.join(process.cwd(), 'web', 'index.html'),
		'utf-8',
	)
	const tpl = Handlebars.compile(html)
	return tpl({
		...globals,
	})
}

module.exports = {
	html,
	getVersion,
}
