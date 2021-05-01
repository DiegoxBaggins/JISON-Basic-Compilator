import React, {Component} from 'react';

class Variable extends Component{


    render(){

        const {tipo, tipo2, id, linea, columna, ambito} = this.props.variable;
        return (
            <tr>
                <td>{tipo}</td>
                <td>{tipo2}</td>
                <td>{id}</td>
                <td>{linea}</td>
                <td>{columna}</td>
                <td>{ambito}</td>
            </tr>
        )
    }

}

export default Variable;