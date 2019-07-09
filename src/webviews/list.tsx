import React, {Component} from 'react';

interface IListState {
    text: String
}

interface IListProp {}

class List extends Component <IListProp, IListState> {
    constructor(props: IListProp) {
        super(props);
        this.state = {
            text: 'list'
        }
    }

    render() {
        const text = this.state.text;
        return (
            <div>{text}</div>
        )
    }
}

export default List;