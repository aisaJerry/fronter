import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { loadableReady } from '@loadable/component';
import Root from './app';

const createApp = (Component) => {
    // 获取服务端初始化的state，创建store
    const App = () => {
      return (
          <Router>
            <Component />
          </Router>
      );
    };
    return <App />;
  }

loadableReady(() => {
    ReactDOM.hydrate(createApp(Root), document.getElementById("app"));
});