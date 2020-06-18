import mongodb from 'mongodb'

const MongoClinent = mongodb.MongoClient

const url = 'mongodb://localhost:27017/edu'

export default (errLog, req, res, next) => {
  // { 错误名称： 错误信息：错误堆栈：　错误发生时间 }
  // 1. 打开连接
  MongoClinent.connect(url, (err, db) => {
    // 2. 操作数据库
    const mydb = db.db('需要引用的数据库名')
    mydb.collection('error_logs').insertOne(
      {
        name: errLog.name,
        message: errLog.message,
        stack: errLog.stack,
        time: new Date()
      },
      (err, result) => {
        res.json({
          err_code: 500,
          message: errLog.message
        })
      }
    )

    // 3. 关闭连接
    db.close()
  })
}
