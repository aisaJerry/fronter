import React, {Component, lazy, Suspense} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom';
import home from './webviews/home';

let list = lazy(() => import (/* webpackChunkName: 'list' */ './webviews/list'));

const routes = [
    {
        path: '/list',
        component: lazy(() => import (/* webpackChunkName: 'list' */ './webviews/list'))
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
                <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path = '/' component = { home } ></Route>
                    <Route exact path = '/list' component = { list } ></Route>
                    {/* {routes.map((route, i)=>(
                        <Route exact key={i} path={route.path} render={props => (
                            <route.component {...props} />
                        )}></Route>
                    ))} */}
                </Switch>
                </Suspense>
            </Router>
        )
    }
}


ReactDOM.render(<App/>, document.getElementById('app'))