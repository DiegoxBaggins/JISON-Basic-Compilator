import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Base from "./components/Base";



class Router extends Component{

    render(){
        return (
            <BrowserRouter>
                {/* Configurar rutas y paginas*/}
                <Switch>
                    <Route exact path="/" component={Base} />
                </Switch>

            </BrowserRouter>
        );
    }
}

export default Router;