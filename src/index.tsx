import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class Button extends React.Component {
    render() {
        return (
            <h1>Hello, React</h1>
        )
    }
}

ReactDOM.render(<Button/>, document.getElementById('app'))