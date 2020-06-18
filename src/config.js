import { join } from 'path'

export default {
  viewPath: join(__dirname, '../views'),
  node_modules_path: join(__dirname,'../node_modules'),
  public_path: join(__dirname, '../public'),
  uploadDir: join(__dirname, '../public/uploads')
}
// exports.foo = 'bar'
// exports.f = function() {

// }
// exports.num = 10

// export const foo = 'bar'
// export const f = function () {

// }
// export const num = 10

// const foo = 'bar'
// const f = function () {}
// const num = 10

// export { foo, f, num }

// export default function () {
//   console.log('fff')
// }
