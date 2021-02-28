import React, { Component } from 'react';
import './statistic.css'



export default class Statistic extends Component {

constructor (props){
    super();
    this.state = {
        arr: 0
    }

}

    render() {
       const winnX = this.props.winnerX;
       const winnO = this.props.winnerO;
    
        return (
            <div className='statistic' >
            <div className="winCount">
                <span>Player X: {winnX}</span>
                </div>
            <div className="winCount">
                <span>Player 0: {winnO}</span>
                </div>
            </div>
        )
    }
}

