import React, { Component } from 'react';
import Main from '../main/main'



export default class App extends Component {

constructor (props){
    super();
    this.state = {
        arr: null
    }

}

    render() {
       
        return (
            <div className='app' >
                <Main/>
            </div>
        )
    }
}

