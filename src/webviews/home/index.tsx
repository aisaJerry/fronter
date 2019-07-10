import React, {Component} from 'react';

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
            <div className={this.state.className} onClick={this.goList}>{text}</div>
        )
    }
}

export default Home;