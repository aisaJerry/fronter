import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import home from './webviews/home';
import Loadable from 'react-loadable';
import './app.scss';

const List = Loadable({
    loading() { return <div>Loading</div> },
    loader: () => import('./webviews/list'),
})

class AppRoutes extends Component {
    render() {
        return (
                <Switch>
                    <Route exact path = '/' component = { home } />
                    <Route path = '/list' component = { List } />
                </Switch>
        )
    }
}
    
export default AppRoutes