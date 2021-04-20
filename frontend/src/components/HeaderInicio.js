import React, {Component} from 'react';
import logo from '../assets/images/logo.png'

class HeaderInicio extends Component{

    render(){

        return  (
            <header id="header">
                <div className="center">
                    { /*LOGO */}
                    <div id="logo">
                        <img src={logo} className="app-logo" alt="Logotipo"/>
                        <span id="brand"><strong> --Compras </strong>
                    </span>
                    </div>
                    { /*Menu */}
                    <div className="clearfix"> </div>
                </div>
            </header>
        );
    }
}

export default HeaderInicio;