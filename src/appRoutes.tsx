import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import home from './webviews/home';
import Loadable from '@loadable/component';
// import './app.scss';

const Loading = <h3>Loading...</h3>;
const List = Loadable(
    () => import('./webviews/list'),
    { fallback: Loading, }
  );

class AppRoutes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path = '/' component = { home } />
                <Route path = '/list' render={props => <List {...props}/>} />
            </Switch>
        )
    }
}
    
export default AppRoutes