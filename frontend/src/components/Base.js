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
            text2: 'Resultado'
        };

        this.handleChange1 = this.handleChange1.bind(this);
    }

    TextFile = () => {
        let texto = this.state.text2;
        const element = document.createElement("a");
        const file = new Blob([texto], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "programa.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    onFileChange = event => {
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
    };

    onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        axios.post(`${Server}/compilador/archivo`, formData).then( (response) =>{
            this.setState({
                text1 : response.data
            });
        });
    };

    compilar = () => {
        let texto = {
            text: this.state.text1
        }
        axios.post(`${Server}/compilador/texto`, texto).then( (response) =>{
            this.setState({
                text2: response.data
            })
        });
    }

    handleChange1 (event) {
        this.setState({text1: event.target.value});
    }

    handleChange2 (event) {
        this.setState({text2: event.target.value});
    }

    render(){

        return (
            <div className="center-2">
                <Header/>
                <div className="subheader">
                    <h3> Compilador en linea </h3>
                    <input type="file" onChange={this.onFileChange} className="btn-upload" />
                    <button  className="btn-upload" onClick={this.onFileUpload}> Abrir </button>
                    <input type="button" value="Guardar" onClick={this.TextFile} className="btn-upload"/>
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
                    <input type="button" value="Compilar"  onClick={this.compilar} className="btn-upload"/>
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