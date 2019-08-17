const fs = require( 'fs')
const ini = require('ini' )
const updateInfo = ini.parse(fs.readFileSync ('./config/update.ini','UTF-8' ))
const update = updateInfo.date.update