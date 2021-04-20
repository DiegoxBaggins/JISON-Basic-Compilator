import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import InicioSesion from "./components/InicioSesion";



class Router extends Component{

    render(){
        return (
            <BrowserRouter>
                {/* Configurar rutas y paginas*/}
                <Switch>
                    <Route exact path="/" component={InicioSesion} />
                </Switch>

            </BrowserRouter>
        );
    }
}

export default Router;