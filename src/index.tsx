import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class Button extends React.Component {
    constructor (props: Object) {
        super(props);
        this.state = {
            isOn: false
        }
    }
    showThis(p:string) {
        console.log(this);
        console.log(p)
    }
    render() {
        return (
            <h1 onClick={this.showThis.bind(this, '123')}>Hello</h1>
        )
    }
}

ReactDOM.render(<Button/>, document.getElementById('app'))