import React, { Component } from 'react';
import './statistic.css'



export default class Statistic extends Component {

constructor (props){
    super();
    this.state = {
        arr: 0
    }

}

    render(props) {
        const check = this.props.counter
        return (
            <div className='statistic' >
              {check}
            </div>
        )
    }
}

