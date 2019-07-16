import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import home from './webviews/home';
import Loadable from 'react-loadable';
import './app.scss';

const List = Loadable({
    loading() { return <div>Loading</div> },
    loader: () => import('./webviews/list'),
})

class App extends Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path = '/' component = { home } />
                    <Route path = '/list' component = { List } />
                </Switch>
            </Router>
        )
    }
}

export default App;