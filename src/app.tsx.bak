import React, {Component, lazy, Suspense} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import home from './webviews/home';
import routes from './routes';
import './app.scss';

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
                        <Route exact key={i} path={`/${route}`} render={
                            props => {
                                let Component = lazy(() => import (`./webviews/${route}`));
                                return (<Component {...props} />)
                            }
                        }>
                        </Route>
                    ))}
                </Switch>
                </Suspense>
            </Router>
        )
    }
}

export default App;