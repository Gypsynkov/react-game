import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Main from '../main/main'
import './app.css'

export default class App extends Component {

constructor (props){
    super();
    this.state = {
        music: true
    }

}

    render() {
       
        return (
            <div className='app' >
                <Header/>
                <Main/>
                <Footer/>
            </div>
        )
    }
}

