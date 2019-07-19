const Koa = require('koa');
const Router = require('koa-router');
const fs = require("fs");
const ServerRenderer = require("./render");
const path = require("path");
// const app = new Koa();
// const router = new Router();
// const static = require('koa-static');

const express = require("express");
const app = express();

let bundle = require("../dist/server-bundle.json");
let clientManifest = require("../dist/react-loadable.json");
let template = fs.readFileSync("./src/template.html", "utf-8");

let renderer = new ServerRenderer(bundle, template, clientManifest);

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.get('*', (req, res) => {
    renderer.renderToString(req, {}).then(({error, html}) => {
      if (error) {
        if (error.url) {
          res.redirect(error.url);
        } else if (error.code) {
          res.status(error.code).send("error code：" + error.code);
        }
      }
      res.send(html);
    })

});
 
// app.use(router.routes());
app.listen(3001, () => {
  console.log("Your app is running");
});