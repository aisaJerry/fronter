import React, {Component} from 'react';
import { Button } from 'antd';

interface IHomeState {
    text: string,
    className: string,
}

interface IHomeProp {
    history: any
}

class Home extends Component <IHomeProp, IHomeState> {
    constructor(props: IHomeProp) {
        super(props);
        this.state = {
            text: 'go detail',
            className: 'red'
        }
        this.goList = this.goList.bind(this);
    }

    goList() {
        this.props.history.push('/list');
    }

    render() {
        const text = this.state.text;
        return (
            <div>
                <div className={this.state.className} onClick={this.goList}>
                    {text}
                </div>
                <Button type="primary">Button</Button>
            </div>
        )
    }
}

export default Home;