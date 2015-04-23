# koa-ssacl

Easily set the ssacl actor from koa

Automatically manages the CLS namespace for ssacl/sequelize allowing you to simply do:

```js
koa.use(function *(next) {
  this.actor = this.request.user.id;
  yield next;
});

koa.use(require('koa-ssacl')());
```

Note if already using sequelize with CLS koa-ssacl will automatically use that namespace instead of generating it's own.
