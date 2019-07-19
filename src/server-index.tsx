import * as React from "react";
import { StaticRouter } from "react-router-dom";
import router from "./routes";
import Root from "./app";

const createApp = (context, url) => {
  const App: any = () => {
    return (
        <StaticRouter context={context} location={url}>
          <Root />
        </StaticRouter>
    )
  }
  return <App />;
}

export {
  createApp,
  router
};