import React, {Component} from 'react';

interface IHomeState {
    text: String
}

interface IHomeProp {}

class Home extends Component <IHomeProp, IHomeState> {
    constructor(props: IHomeProp) {
        super(props);
        this.state = {
            text: 'page'
        }
    }

    render() {
        const text = this.state.text;
        return (
            <div>{text}</div>
        )
    }
}

export default Home;