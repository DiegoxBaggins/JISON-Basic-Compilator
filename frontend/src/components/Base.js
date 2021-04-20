import React, {Component} from 'react';
import axios from 'axios';
import Header from "./Header";

const Server = "http://localhost:3000";

class Base extends Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            text1: 'Programa aqui',
            text2: ''
        };

        this.handleChange1 = this.handleChange2.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    onFileChange = event => {
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
    };

    handleChange1 (event) {
        this.setState({text1: event.target.value});
    }

    handleChange2 (event) {
        this.setState({text2: event.target.value});
    }

    ConsultarDatos = async(e) => {
        e.preventDefault();
        let usuario = {
        }
        console.log(usuario)
        await axios.post(`${Server}/ingresar`, usuario).then( (response) => {
            console.log(response.data);
            let respuesta = response.data
            if (respuesta === "F"){
                alert("Datos erroneos");
            }else{
                if (respuesta === "A"){
                    localStorage.setItem('DPI',this.dpiRef.current.value);
                    localStorage.setItem('Tipo',"Admin");
                    this.setState({
                        redirect: "/admin"
                    })
                }else{
                    localStorage.setItem('DPI',this.dpiRef.current.value);
                    localStorage.setItem('Tipo',"Usuario");
                    this.setState({
                        redirect: "/Home"
                    })
                }
            }
        });
    }

    render(){

        return (
            <div className="center-2">
                <Header/>
                <div className="subheader">
                    <h3> Compilador en linea </h3>
                    <input type="file" onChange={this.onFileChange} className="btn-upload" />
                    <button  className="btn-upload"> Abrir </button>
                    <input type="button" value="Guardar"  className="btn-upload"/>
                    <br/>
                </div>
                <input type="button" value="Nueva Pestana"  className="btn-upload"/>
                <input type="button" value="Cerrar Pestana"  className="btn-upload"/>
                <br/>
                <div className="div-txt">
                    <label htmlFor="txt1">Entrada:</label>
                    <textarea id="txt1" value={this.state.text1} onChange={this.handleChange1} className="txtArea"/>
                </div>
                <div className="div-medio">
                    <input type="button" value="Compilar"  className="btn-upload"/>
                    <input type="button" value="Reporte AST"  className="btn-upload"/>
                    <input type="button" value="Gramaticas"  className="btn-upload"/>
                </div>
                <div className="div-txt">
                    <label htmlFor="txt2">Salida:</label>
                    <textarea id="txt2" value={this.state.text2} onChange={this.handleChange2} className="txtArea" readOnly/>
                </div>
                <div className="clearfix"> </div>
                <h2>Tabla de errores</h2>
            </div>
        )
    }

}

export default Base;