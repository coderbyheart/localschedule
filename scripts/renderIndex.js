const { html, getVersion } = require('./html')
const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')

console.log(
	html({
		VERSION: getVersion(),
		IS_PRODUCTION: JSON.stringify(true),
		SITE_DIR: process.env.SITE_DIR,
	}),
)
