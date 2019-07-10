import React, {Component, lazy, Suspense} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.scss';

let home = lazy(() => import (/* webpackChunkName: 'home' */ './webviews/home'));

const routes = [
    {
        path: '/list',
        component: lazy(() => import (/* webpackChunkName: 'list' */ './webviews/list'))
    }
]

class App extends Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return(
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path = '/' component = { home } ></Route>
                    {routes.map((route, i)=>(
                        <Route exact key={i} path={route.path} render={props => (
                            <route.component {...props} />
                        )}></Route>
                    ))}
                </Switch>
                </Suspense>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))