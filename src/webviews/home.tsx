import React, {Component} from 'react';

interface IHomeState {
    text: String
}

interface IHomeProp {
    history: any
}

class Home extends Component <IHomeProp, IHomeState> {
    constructor(props: IHomeProp) {
        super(props);
        this.state = {
            text: 'go detail'
        }
        this.goList = this.goList.bind(this);
    }

    goList() {
        this.props.history.push('/list');
    }

    render() {
        const text = this.state.text;
        return (
            <div onClick={this.goList}>{text}</div>
        )
    }
}

export default Home;