import React, {Component} from 'react';

class Header extends Component{

    render(){

        return  (
            <header id="header">
                <div className="center">
                    <div id="logo">
                        <span id="brand"><strong> TypeSty </strong></span>
                    </div>
                    <div className="clearfix"> </div>
                </div>
            </header>
        );
    }
}

export default Header;