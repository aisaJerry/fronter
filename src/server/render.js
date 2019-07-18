import path from 'path';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import AppRoutes from '../appRoutes.tsx';

function render(url, data = {}) {
  let file = path.resolve('./react-loadable.json');
  const extractor = new ChunkExtractor({ statsFile: file});
  const jsx = extractor.collectChunks(
    <StaticRouter location={url}>
      <AppRoutes initialData={data} />
    </StaticRouter>
  );
  const html = ReactDOMServer.renderToString(jsx);
  const renderedScriptTags = extractor.getScriptTags();
  const renderedLinkTags = extractor.getLinkTags();
  const renderedStyleTags = extractor.getStyleTags();
  return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>React App</title>
          ${renderedLinkTags}
          ${renderedStyleTags}
        </head>
        <body>
          <div id="app">${html}</div>
          <script type="text/javascript">window.__INITIAL_DATA__ = ${JSON.stringify(
            initialData
          )}</script>
          ${renderedScriptTags}
        </body>
      </html>
    `;
}

export default render;
