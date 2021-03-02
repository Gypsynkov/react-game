import React, { Component } from 'react';

import './footer.css'
import logo from '../../assets/img/logo.jpg'

export default class Footer extends Component {
    constructor(props) {
        super();


    }

    render() {

        return (
            <div className='footer'>
                <div className='app_year'>
                    <span>2021</span>
                </div>
                <div className='app_logo'>
                    <a href="https://rs.school/js/"><img className="app_logo_rs" src={logo} alt="" /></a>
                </div>
                <div className='app_github'>
                    <i className="fab fa-github"></i>
                    <a href="https://github.com/Gypsynkov">Gypsynkov</a>
                </div>
            </div>
        )
    }
}

