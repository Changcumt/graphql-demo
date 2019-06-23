# graphql-demo
a demo of graphql, server use nodejs, fe use react 

 ### [官方教程](https://graphql.cn/learn/)

### Koa 环境搭建过程  [koa文档](https://koa.bootcss.com/)
####1.搭建Koa基础

```
const Koa = require('koa');
const app = new Koa();

// logger middleware

app.use(async (ctx, next) => {
  await next();
  console.log(`${ctx.method} ${ctx.url} `);
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

####2. koa 路由配置
```
npm install koa-router koa-bodyparser
```

```
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());  // 解析request的body

const router = require('koa-router')()
router.get('/', async (ctx, next) => {
	// todo
})
app.use(router.routes());
app.listen(9000);

```

####3. 集成mongo DB
```
const db = mongoose.connect("mongodb://localhost/testDB")

var UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String
});
var User = mongoose.model('User',UserSchema);

// 新增数据
var user = {
  username: 'ydj',
  password: '123123',
  email: ''
}
var newUser = new User(user);
newUser.save();


```