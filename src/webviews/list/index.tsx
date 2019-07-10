import React, {Component} from 'react';
import {Link} from 'react-router-dom';

interface IListState {
    text: string
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
            <div>
                <Link to='/'>go home</Link>
            </div>
        )
    }
}

export default List;