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
        console.log(this.props)
       //const check = this.props.check //console.log(this.props)
       const winnX = this.props.winnerX;
       const winnO = this.props.winnerO;
    
        return (
            <div className='statistic' >
            <div><span>Player X: {winnX}</span></div>
            <div><span>Player 0: {winnO}</span></div>
            </div>
        )
    }
}

