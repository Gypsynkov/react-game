import React, { Component } from 'react';
import Statistic from '../statistic/statistic'
import './main.css'




export default class Main extends Component {

    constructor(props) {
        super();

        this.state = {
            filds: Array(9).fill(null),
            count: 0,
            winnerX: 0,
            winnerO: 0

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
        this.circle = <svg className='circle'>
            <circle r='30' cx='49' cy="49" stroke="red"
                strokeWidth='10' fill='none' strokeLinecap='round' />
        </svg>
        this.cross = <svg className='cross'>
            <line className='firstLine' x1='20' y1='20' x2="80" y2="80"
                stroke='blue' strokeWidth='10' strokeLinecap='round' />
            <line className='secondLine' x1='80' y1='20' x2="20" y2="80"
                stroke='blue' strokeWidth='10' strokeLinecap='round' />
        </svg>

        this.check = ["Hello"]

    }

    drawElement = (element) => {
        return (
            element
        )
    }
    // code about winner combo
    winCombo = () => {

        let a = (this.state.count % 2 === 0) ? this.drawElement(this.cross) : this.drawElement(this.circle);

        for (let i = 0; i < this.winLine.length; i++) {
            let line = this.winLine[i];
            if (this.state.filds[line[0]] === a
                && this.state.filds[line[1]] === a
                && this.state.filds[line[2]] === a) {
                this.hover(line)
                setTimeout(this.defaultGrid, 1000);

                if (a === this.drawElement(this.cross)) {
                    this.setState({ winnerX: this.state.winnerX + 1 })
                    console.log('Winner X')
                } else if (a === this.drawElement(this.circle)) {
                    this.setState({ winnerO: this.state.winnerO + 1 })
                    console.log('Winner 0')
                }

            } else if (this.state.count === 8) {
                this.noWinner();
            }
        }

    }

    // code with point element on grid
    pointer = (e) => {
        let data = e.target.getAttribute('data');
        let currentSqr = this.state.filds;
        console.log(currentSqr);
        if (currentSqr[data] === null) {
            currentSqr[data] = (this.state.count % 2 === 0) ? this.drawElement(this.cross) : this.drawElement(this.circle);

            this.setState({ count: this.state.count + 1 });
            this.setState({ filds: currentSqr });
            console.log(this.state.count)


        }
        else {
            console.log('bad idea')
        }

        this.winCombo();

    }

    // code for hover grid for win combo

    hover = (a) => {
        console.log(...a)
        a.forEach((item) => {
            document.querySelectorAll('.one_grid').forEach((e) => {
                if (item == e.getAttribute('data')) {
                    e.style.backgroundColor = 'green'
                }
            });
        })
    }

    // reboot grid in EndGame

    defaultGrid = () => {
        this.setState({filds:Array(9).fill(null)})
                this.setState({count: 0})
        document.querySelectorAll('.one_grid').forEach((e)=>{
            e.style.backgroundColor = 'white'
        })
    }
// no winner func

noWinner = () => {
    document.querySelectorAll('.one_grid').forEach((e)=>{
        e.style.backgroundColor = 'grey'
    })
    setTimeout(this.defaultGrid, 1000);
    
}



    makeFilds = (arr) => {
        let elements = this.state.filds.map((item, index) => {
            return (
                <div className='one_grid' key={index} data={index} onClick={this.pointer}  >{this.state.filds[index]}</div>
            )
        })
        return elements
    }


    render() {
        return (
            <div className='play_filed' >
                {this.makeFilds()}
                <Statistic winnerX={this.state.winnerX} winnerO={this.state.winnerO} />
            </div>
        )
    }
}

