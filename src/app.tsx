import * as React from "react";
import { Switch } from "react-router-dom";
import router from "./routes";
import NestedRoute from "./NestedRoute";

class App extends React.Component {
  public render() {
    return (
      <div>
        <div className="title">This is a react ssr demo</div>
        <div className="view">
          <Switch>
            {
              router.map((route, i) =>
                <NestedRoute key={i} {...route} />
              )
            }
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
