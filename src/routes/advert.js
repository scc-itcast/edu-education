import express from 'express'
import Advert from '../models/advert'
import formidable from 'formidable'
import config from '../config'
import { basename } from 'path'

const router = express.Router()

router.get('/advert', (req, res, next) => {
  const page = Number.parseInt(req.query.page, 10)
  const pageSize = 5

  Advert.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec((err, adverts) => {
      if (err) {
        return next(err)
      }
      Advert.count((err, count) => {
        if (err) {
          return next(Err)
        }
        const totalPage = Math.ceil(count / pageSize) //总页码 = 总记录数 / 每页显示大小
        res.render('advert_list.html', {
          adverts,
          totalPage,
          page,
        })
      })
    })
})

router.get('/advert/add', (req, res, next) => {
  res.render('advert_add.html')
})

// POST /advert/add
// body: { title, image, link, start_time, end_time }
router.post('/advert/add', (req, res, next) => {
  //  1.  接受表单提交的数据
  // const body = req.body

  const form = formidable({ multiples: true })
  form.uploadDir = config.uploadDir /// 配置 formidable 文件上传接受路径
  form.keepExtensions = true // 配置保持文件原始的扩展名

  // fields 就是接收到的表单中的普通数据字段
  // files 就是表单中文件上传上来的一些文件信息，例如文件大小，上传上来的文件路径
  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err)
    }
    const body = fields
    body.image = basename(files.image.path)

    //  2. 操作数据库
    const advert = new Advert({
      title: body.title,
      image: body.image,
      link: body.link,
      start_time: body.start_time,
      end_time: body.end_time,
    })
    advert.save((err, result) => {
      if (err) {
        return next(err)
      }
      res.json({
        err_code: 0,
      })
    })
  })

  //  2. 操作数据库
  // const advert = new Advert({
  //   title: body.title,
  //   image: body.image,
  //   link: body.link,
  //   start_time: body.start_time,
  //   end_time: body.end_time,
  // })
  // advert.save((err, result) => {
  //   if (err) {
  //     return next(err)
  //   }
  //   res.json({
  //     err_code: 0,
  //   })
  // })

  //#region
  // MongoClinent.connect(url, (err, db) => {
  //   if (err) {
  //     return next(err)
  //   }
  //   // 2. 操作数据库
  //   const mydb = db.db('需要引用的数据库名')
  //   mydb.collection('adverts').insertOne(req.body, (err, result) => {
  //     if (err) {
  //       throw err
  //     }
  //     console.log(result)
  //     res.json({
  //       err_code: 0,
  //     })
  //   })

  //   // 3. 关闭连接
  //   db.close()
  // })
  //#endregion
})

router.get('/advert/list', (req, res, next) => {
  Advert.find((err, docs) => {
    if (err) {
      return next(err)
    }
    res.json({
      err_code: 0,
      result: docs,
    })
  })
})
//  /advert/1
//  /advert/2
//  /advert/3
router.get('/advert/one/:advertId', (req, res, next) => {
  // res.end(req.params)
  // res.end(`路径参数ID为： ${req.params.advertId}`)
  Advert.findById(req.params.advertId, (err, result) => {
    if (err) {
      return next(err)
    }
    res.json({
      err_code: 0,
      result: result,
    })
  })
})

router.post('/advert/edit', (req, res, next) => {
  Advert.findById(req.body.id, (err, advert) => {
    if (err) {
      return next(err)
    }
    const body = req.body
    advert.title = body.title
    advert.image = body.image
    advert.link = body.link
    advert.start_time = body.start_time
    advert.end_time = body.end_time
    advert.last_modified = Date.now()
    //  这里的 save 因为内部有一个 _id 所以这里不会新增数据的，而是更新已有的数据
    advert.save((err, result) => {
      if (err) {
        return next(err)
      }
      res.json({
        err_code: 0,
      })
    })
  })
})

router.get('/advert/remove/:advertId', (req, res, next) => {
  Advert.remove({ _id: req.params.advertId }, (err) => {
    if (err) {
      return next(err)
    }
    res.json({
      err_code: 0,
    })
  })
})

export default router
