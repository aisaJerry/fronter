const Koa = require('koa');
const Router = require('koa-router');
const fs = require("fs");
const ServerRenderer = require("./render");
const app = new Koa();
const router = new Router();
const static = require('koa-static');

let bundle = require("../dist/server-bundle.json");
let clientManifest = require("../dist/react-loadable.json");
let template = fs.readFileSync("./src/template.html", "utf-8");

let renderer = new ServerRenderer(bundle, template, clientManifest);

app.use(static(__dirname, "../dist"));
router.get('*', async (ctx) => {
    renderer.renderToString(ctx.req, {}).then(({error, html}) => {
      // if (error) {
      //   if (error.url) {
      //     res.redirect(error.url);
      //   } else if (error.code) {
      //     res.status(error.code).send("error code：" + error.code);
      //   }
      // }
      ctx.body = html;
    })

});
 
app.use(router.routes());
app.listen(3001);