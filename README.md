### 路由设计
 | 请求方法 | 请求路径 | 查询字符串 | 请求体 | 路径参数 | 作用 |
 | -------- | ------- | --------- | ------ | ------- | ---- |
 | GET----- | /advert | --------- | ------ | ------- | 渲染广告管理列表页 |
 | GET----- | /advert/add | ---- | ------ | ------- | 渲染添加广告页面 |
 | POST---- | /advert/add | ---- | image、link、start_time、end_time、title、create_time、last_modified | ------- | 处理添加广告请求 |


## mongoDB

- 一个计算机上可以有一个数据库服务实例
- 一个数据服务实例上可以有多个数据库
- 一个数据库中可以有多个集合
  + 集合根据数据的业务类型划分
  + 例如用户数据、商品信息数据、广告信息数据。。。
  + 对数据进行分门别类的存储
  + 集合在 MongoDB 中就类似于数组
- 一个集合中可以有多个文档
  + 文档在 MongoDB 中就是一个类似于 JSON 的数据对象
  + 文档对象是动态的，可以随意的 生成
  + 假如一个集合中
  + 为了便于管理，最好一个集合中存储的数据一定要保持文档结构的统一（数据完整性）

```json
{
  collection1: [
    { a: { age: 18, name: '', islit: []} }，
    { 文档2 }，
    { 文档3 }
  ],
  collection2: [
    { 文档1 }，
    { 文档2 }，
    { 文档3 }
  ],
  collection3: [
    { 文档1 }，
    { 文档2 }，
    { 文档3 }
  ],
}
```

## 在 Node 中使用 formidable 处理文件上传

## 分页

假设现在集合中有185 条数据：

- 每页展示 20 条数据
- 共分多少页
  + 185（totalCount）/ 20（pageSize） = 10(totalPage)
- 查看某一页数据如何计算（从哪到哪）
- 1 1 20
- 2 21 40
- 3 41 60
- n 从 ((n-1) * 20 +1) 开始  到 n*20
