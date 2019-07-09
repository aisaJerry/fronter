import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

interface IButtonState {
    text: String,
    isOn: Boolean
}

interface IButtonProp {}

class Button extends React.Component <IButtonProp, IButtonState> {
    constructor (props: IButtonProp) {
        super(props);
        this.state = {
            isOn: false, 
            text: 'hello'
        }
    }
    showThis(p:string) {
        console.log(this);
        console.log(p)
    }
    render() {
        const text = this.state.text;
        return (
            <h1 onClick={this.showThis.bind(this, '123')}>{text}</h1>
        )
    }
}

ReactDOM.render(<Button/>, document.getElementById('app'))