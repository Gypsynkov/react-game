import React, { Component } from 'react';
import Statistic from '../statistic/statistic'
import './main.css'
import pencils from '../../assets/sounds/pencil.mp3'
import win from '../../assets/sounds/win.mp3'
import draw from '../../assets/sounds/draw.mp3'
import reset from '../../assets/sounds/reset.mp3'


// window.onload = function () {
//     const currentState = localStorage.getItem('state')
//     const ourState = JSON.parse(currentState)
//     console.log(ourState)

// }


export default class Main extends Component {
    //     componentDidUpdate () {
    //         localStorage.setItem('state', JSON.stringify(this.state))
    //     }
    //     componentDidMount (){
    //         const currentState = localStorage.getItem('state')
    //     const ourState = JSON.parse(currentState)
    //     console.log(ourState.filds)
    //     // console.log('ok')
    //     this.setState({ count: ourState.count});
    //     this.setState({ count: ourState.count});

    //  ourState.filds.forEach((e)=>{
    //      if(e !=null && e.props.className == 'cross' ){
    //         console.log (e.props.className) 
    //         e = this.cross
    //      }

    //  })
    //  console.log(this.circle)
    //     }
    constructor(props) {
        super();

        this.state = {
            filds: Array(9).fill(null),
            count: 0,
            winnerX: 0,
            winnerO: 0,
            music: true,
        }

        this.gameState = 'Please X start'


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

    circle = <svg className='circle'>
        <circle r='30' cx='49' cy="49" stroke="red"
            strokeWidth='10' fill='none' strokeLinecap='round' />
    </svg>
    cross = <svg className='cross'>
        <line className='firstLine' x1='20' y1='20' x2="80" y2="80"
            stroke='blue' strokeWidth='10' strokeLinecap='round' />
        <line className='secondLine' x1='80' y1='20' x2="20" y2="80"
            stroke='blue' strokeWidth='10' strokeLinecap='round' />
    </svg>


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
                    this.gameState = 'Player X win!!!'
                    this.playAudio(win)
                    setTimeout(this.defaultGrid, 1000);
                } else if (a === this.drawElement(this.circle)) {
                    this.setState({ winnerO: this.state.winnerO + 1 })
                    this.gameState = 'Player O win!!!'
                    this.playAudio(win)
                    setTimeout(this.defaultGrid, 1000);
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
            this.gameState = (this.state.count % 2 === 0) ? "Player O must play" : 'Player X must play'

            this.setState({ count: this.state.count + 1 });
            this.setState({ filds: currentSqr });
            this.playAudio(pencils)


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
        this.setState({ filds: Array(9).fill(null) })
        this.setState({ count: 0 })
        this.gameState = 'Please X start'
        document.querySelectorAll('.one_grid').forEach((e) => {
            e.style.backgroundColor = 'white'
        })

    }
    // no winner func

    noWinner = () => {
        this.gameState = 'Oh, nobody win'
        document.querySelectorAll('.one_grid').forEach((e) => {
            e.style.backgroundColor = 'grey'
        })
        this.playAudio(draw)
        setTimeout(this.defaultGrid, 1000);

    }

    // play state block 

    // reset button 

    gameReseter = () => {
        this.playAudio(reset)
        this.setState({ filds: Array(9).fill(null) })
        this.setState({ count: 0 })
        //  this.gameState = 'No winner this round'
    }

    // play some sounds 

    playAudio = (sound) => {
        if (this.state.music) {
            this.audio = new Audio(sound);
            //this.audio.src = `../../assets/sounds/${sound}.mp3`;
            //this.audio.src = `./${sound}.mp3`;
            //this.audio.play().catch(() => this.audio.currentTime);
            // this.audio.src = '../pencil.mp3';
            this.audio.play().catch(() => this.audio.currentTime);
        }
        console.log('try')
    }
    // soundSwitcher 
    soundSwitcher = () => {
        if (this.state.music) {
            this.setState({ music: false });
       
        } else {
            this.setState({ music: true });
        }

        console.log('ok')
    }



    makeFilds = (arr) => {
        let elements = this.state.filds.map((item, index) => {
            return (
                <div className='one_grid' key={index} data={index} onClick={this.pointer}  >{this.state.filds[index]}</div>
            )
        })
        return elements
    }

    gameState = () => {
        return this.gameDiv = (this.state.count % 2 === 0) ? "Player X must play" : 'Player O must play'
    }


    render() {
        return (
            <div className="main_content">

                <div className="buttons_block">
                    <div className="button_retry">
                        <button onClick={this.gameReseter} type="button" className="btn btn-danger"> New Game </button>
                    </div>

                </div>

                <div className='main_play_filed'>
                    <div className='play_state'>{this.gameState}</div>

                    <div className='play_filed'> {this.makeFilds()} </div>
                    <div className='play_settings'>
                        <div className="button_vs_computer">
                            <button onClick={this.gameReseter} type="button" className="btn btn-success"> Play with  Computer</button>
                        </div>
                        <div className="button_vs_computer">
                            <button onClick={this.soundSwitcher} type="button" className="btn  btn-success"> Sound</button>
                        </div></div>
                </div>


                <div className='win_counter'><Statistic winnerX={this.state.winnerX} winnerO={this.state.winnerO} /></div>


            </div>
        )
    }
}

