import React, { Component } from 'react';
import './main.css'




export default class Main extends Component {

    constructor(props) {
        super();

        this.state = {
            filds: Array(9).fill(null),
            count: 0,

        }

        this.winLine = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6],
        ]

    }

    winCombo = () => {

        let a = (this.state.count % 2 === 0) ? 'X' : 'O';

        for (let i = 0; i < this.winLine.length; i++) {
            let line = this.winLine[i];
            if (this.state.filds[line[0]] === a
                && this.state.filds[line[1]] === a
                && this.state.filds[line[1]] === a) {
                    this.setState({filds:Array(9).fill(null)})
                    this.setState({count: 0})
                console.log(a + 'win')
            }
        }

    }
    pointer = (e) => {
        let data = e.target.getAttribute('data');
        console.log(data)
        let currentSqr = this.state.filds;
        console.log(currentSqr);
        if (currentSqr[data] === null) {
            currentSqr[data] = (this.state.count % 2 === 0) ? 'X' : 'O';
            this.setState({ count: this.state.count + 1 });
            this.setState({ filds: currentSqr });


        }
        else {
            console.log('bad idea')
        }

        this.winCombo();

    }
    makeFilds = (arr) => {
        let elements = this.state.filds.map((item, index) => {
            return (
                <div className='one_grid' key={index} data={index} onClick={this.pointer} >{this.state.filds[index]}</div>
            )
        })
        return elements
    }


    render() {
        return (
            <div className='play_filed' >
                {this.makeFilds()}
            </div>
        )
    }
}

