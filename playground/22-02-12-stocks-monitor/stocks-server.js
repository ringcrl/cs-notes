// const sqlite3 = require('sqlite3');
// const { open } = require('sqlite');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
app.use(serve('./static'));
app.use(bodyParser());

(async () => {
  // const db = await open({
  //   filename: '/Users/ringcrl/Documents/saga/chenng/local.db',
  //   driver: sqlite3.Database,
  // });

  // router
  //   .post('/get', async (ctx) => {
  //     const { type } = ctx.request.body;
  //     let sql = 'SELECT * FROM t_notes';
  //     if (type) {
  //       sql = `SELECT * FROM t_notes WHERE type='${type}'`;
  //     }
  //     const result = await db.all(sql);
  //     ctx.body = result;
  //   })
  //   .post('/add', async (ctx) => {
  //     const { type, question, answer } = ctx.request.body;
  //     await db.run(`INSERT INTO t_notes VALUES (NULL, '${question}', '${answer}', '${type}')`);
  //     ctx.body = { status: 'ok' };
  //   })
  //   .post('/set', async (ctx) => {
  //     const {
  //       question, answer, type, id,
  //     } = ctx.request.body;
  //     await db.run(`UPDATE t_notes SET question='${question}', answer='${answer}', type='${type}' WHERE id=${id}`);
  //     ctx.body = { status: 'ok' };
  //   })
  //   .post('/del', async (ctx) => {
  //     const { id } = ctx.request.body;
  //     await db.run('DELETE FROM t_notes WHERE id = ?', id);
  //     ctx.body = { status: 'ok' };
  //   });

  console.log('http://127.0.0.1:9998');
  app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(9998);
})();
