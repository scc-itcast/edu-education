import queryString from 'querystring'

export default (req, res, next) => {
  if (req.method.toLowerCase() === 'get') {
    console.log('进入 body-parser 了')
    return next()
  }
  // 如果是普通表单POST，则咱们自己处理 application/x-www-form-urlencoded
  // 如果是有文件的POST，则咱们不处理 multipart/form-data; boundary=----WebKitFormBoundarylWDBmxBFhL0ABlfs
  // console.log(req.headers)
  if ( req.headers['content-type'].startsWith('multipart/form-data') ) {
    return next()
  }

  let data = ''
  req.on('data', (chunks) => {
    data += chunks
  })
  req.on('end', () => {
    // console.log(data)
    req.body = queryString.parse(data)
    next()
  })
}
