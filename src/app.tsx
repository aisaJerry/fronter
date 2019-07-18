import React, {Component} from 'react';
import { HashRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes';

class App extends Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return(
            <Router>
                <AppRoutes/>
            </Router>
        )
    }
}

export default App;