// const express = require('express')
import express from 'express'
import config from './config'
import nunjucks from 'nunjucks'
import indexRouter from './routes/index'
import advertRouter from './routes/advert'
import queryString from 'querystring'
import bodyParser from './middelwares/body-parser'
import errLog from './middelwares/error_log'

// import { foo, f, num } from './config'
// import * as config from './config'

// import defaultConfig from './config'
// import { foo } from './config'
// import * as allConfig from './config'

// console.log(`default: ${defaultConfig},foo: ${foo},all: ${allConfig}`)

const app = express()
app.use('/node_modules', express.static(config.node_modules_path))
app.use('/public', express.static(config.public_path))

nunjucks.configure(config.viewPath, {
  autoescape: true,
  express: app,
  noCache: true
})

// console.log(foo, f, num)
// console.log(config);

app.set('views', config.viewPath)
app.set('view engine', 'ejs')

app.use(bodyParser)

app.use(indexRouter)
app.use(advertRouter)

app.use(errLog)

app.listen(3000, () => {
  console.log('sver is running at port 3000...')
})
