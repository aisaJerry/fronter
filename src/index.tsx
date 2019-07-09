import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import home from './webviews/home';
import list from './webviews/list';

const routes = [
    {
        path: '/list',
        component: list
    }
]

interface IAppState {}

interface IAppProp {}

class App extends Component <IAppProp, IAppState> {
    constructor (props: IAppProp) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path = '/' component = { home } ></Route>
                    {/* {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))} */}
                    {routes.map((route, i)=>(
                        <Route exact key={i} path={route.path} render={props => (
                            <route.component {...props} />
                        )}></Route>
                    ))}
                </Switch>
            </Router>
        )
    }
}

// function RouteWithSubRoutes(route: any) {
//     return (
//       <Route
//         path={route.path}
//         render={props => (
//           // pass the sub-routes down to keep nesting
//           <route.component {...props} routes={route.routes} />
//         )}
//       />
//     );
// }

ReactDOM.render(<App/>, document.getElementById('app'))