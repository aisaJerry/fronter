const Koa = require('koa');
const Router = require('koa-router');
const SSR = require('../../distSSR/ssr.js');
console.log(SSR);
SSR.preloadAll();
const app = new Koa();
const router = new Router();
const s = new SSR();

router.get('*', async (ctx) => {
 //根据路由，渲染不同的页面组件
 const rendered = s.render(ctx.url);
  
 const html = `
  <!DOCTYPE html>
   <html lang="en">
   <head>
    <meta charset="UTF-8">
   </head>
   <body>
    <div id="app">${rendered.html}</div>
    <script type="text/javascript" src="/runtime.js"></script>
    ${rendered.scripts.join()}
    <script type="text/javascript" src="/app.js"></script>
   </body>
  </html>
 `;
 ctx.body = html;
});
 
app.use(router.routes());
app.listen(3000, '0.0.0.0');