const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

const SSR = require('../../distSSR/ssr.js');

router.get('*', async (ctx) => {
 const rendered = SSR.render(ctx.url);
 ctx.body = rendered;

});
 
app.use(router.routes());
app.listen(3000, '0.0.0.0');