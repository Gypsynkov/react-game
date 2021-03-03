import React, { Component } from 'react';
import Statistic from '../statistic/statistic'
import './main.css'
import pencils from '../../assets/sounds/pencil.mp3'
import win from '../../assets/sounds/win.mp3'
import draw from '../../assets/sounds/draw.mp3'
import reset from '../../assets/sounds/reset.mp3'
import error from '../../assets/sounds/error.mp3'


// window.onload = function () {
//     const currentState = localStorage.getItem('state')
//     const ourState = JSON.parse(currentState)
//     console.log(ourState)

// }


export default class Main extends Component {
    componentDidUpdate() {
        localStorage.setItem('state', JSON.stringify(this.state))
    }
    componentDidMount() {
        const currentState = localStorage.getItem('state')
        const ourState = JSON.parse(currentState)
        this.setState({
            winnerX: ourState.winnerX,
            winnerO: ourState.winnerO,
            musicState: ourState.musicState,
            music: ourState.music,
        });

    }
    constructor(props) {
        super();

        this.state = {
            filds: Array(9).fill(null),
            count: 0,
            winnerX: 0,
            winnerO: 0,
            music: true,
            musicState: 'ON'
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
        <circle r='30' cx='49' cy="49" stroke="yellow"
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
        if (currentSqr[data] === null) {
            currentSqr[data] = (this.state.count % 2 === 0) ? this.drawElement(this.cross) : this.drawElement(this.circle);
            this.gameState = (this.state.count % 2 === 0) ? "Player O must play" : 'Player X must play'

            this.setState({
                count: this.state.count + 1,
                filds: currentSqr
            });
            this.playAudio(pencils)


        }
        else {
            console.log('bad idea')
            this.playAudio(error)
        }

        this.winCombo();

    }



    // code for hover grid for win combo

    hover = (a) => {
        a.forEach((item) => {
            document.querySelectorAll('.one_grid').forEach((e) => {
                if (item == e.getAttribute('data')) {
                    e.style.backgroundColor = 'red'
                    e.style.opacity = 0.9
                }
            });
        })
    }

    // reboot grid in EndGame

    defaultGrid = () => {
        this.setState({
            filds: Array(9).fill(null),
            count: 0
        })
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

    roundReseter = () => {
        this.playAudio(reset)
        this.gameState = 'Please X start'
        this.setState({
            filds: Array(9).fill(null),
            count: 0
        })

    }
    // reset count button 

    countReseter = () => {
        this.playAudio(reset)
        this.setState({
            winnerX: 0,
            winnerO: 0
        })
    }

    // play some sounds 

    playAudio = (sound) => {
        if (this.state.music) {
            this.audio = new Audio(sound);
            this.audio.play().catch(() => this.audio.currentTime);
        }
    }
    // soundSwitcher 
    soundSwitcher = () => {
        if (this.state.music) {
            this.setState({
                music: false,
                musicState: 'OFF'
            });


        } else {
            this.setState({
                music: true,
                musicState: 'ON'
            });
        }
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
                        <button onClick={this.roundReseter} type="button" className="btn btn-danger"> Reset round</button>
                    </div>
                    <div className='play_state'>{this.gameState}</div>
                    <div className="button_retry">
                        <button onClick={this.countReseter} type="button" className="btn btn-danger"> Reset count</button>
                    </div>
                </div>

                <div className='main_play_filed'>

                    <div className='win_counter'><Statistic winnerX={this.state.winnerX} winnerO={this.state.winnerO} /></div>
                    <div className='play_filed'> {this.makeFilds()} </div>
                    <div className='play_settings'>
                        <div className="button_sound">
                            <button onClick={this.soundSwitcher} type="button" className="btn  btn-success"> Sound is {this.state.musicState} </button>
                        </div>
                    </div>
                </div>





            </div>
        )
    }
}

