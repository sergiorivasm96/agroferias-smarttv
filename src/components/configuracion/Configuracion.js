import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTv } from '@fortawesome/free-solid-svg-icons'
import FeriaLista from './FeriaLista'
import { Link } from 'react-router-dom'
import '../styles/Configuracion.css'

class Configuracion extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            idFeriaActual: localStorage.getItem('idFeria'),
            textoFeriaActual: '',
            popUpVisible: false,
            nombreFeriaActual: localStorage.getItem('nombreFeria'),
            feriaSeleccionada: false
        }
        this.cambioFeria = this.cambioFeria.bind(this);
        this.seleccionarTelevisorSinFeria = this.seleccionarTelevisorSinFeria.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        let localTelevisor = localStorage.getItem("localTelevisor");
        let localTienda = localStorage.getItem("idFeria");

        if (localTelevisor === null) {
            alert("Por favor, seleccione una feria en configuración.");
        } else {
            if (localTelevisor === null) {
                alert("Por favor, seleccione primero un televisor.");
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    cambioFeria(feria) {
        const texto = 'Ha seleccionado la feria ' + feria.nombre;
        localStorage.setItem('idFeria', feria.idFeria);
        localStorage.setItem('nombreFeria', feria.nombre);
        localStorage.removeItem('localTelevisor');
        this.setState({ idFeriaActual: feria.idFeria, texto: texto, popUpVisible: true, feriaSeleccionada: true, nombreFeriaActual: feria.nombre }, () => {
            setTimeout(() => {
                this.setState({
                    popUpVisible: false
                });
            }, 3000);
        });
    }

    seleccionarTelevisorSinFeria() {
        const texto2 = 'Debe seleccionar una feria primero'
        this.setState({ texto: texto2, popUpVisible: true }, () => {
            setTimeout(() => {
                this.setState({
                    popUpVisible: false
                });
            }, 3000);
        });
    }

    render() {
        let button;
        let textoFeria;
        if (localStorage.getItem('idFeria')) {
            button = <Link to={{
                pathname: `/configuracion/${this.state.idFeriaActual}`
            }} >
                <button name={'seleccTienda'} style={buttonStyle} className='item-focusable btn-elegir-tv'>  <FontAwesomeIcon icon={faTv} size='6x' />  </button>
            </Link>

            textoFeria = 'Feria seleccionada: ' + this.state.nombreFeriaActual
        } else {
            button = <button style={buttonStyle} className='item-focusable' onClick={this.seleccionarTelevisorSinFeria}>  <FontAwesomeIcon icon={faTv} size='6x' />  </button>
            textoFeria = 'Seleccione una feria: '
        }

        return (
            <div style={{ paddingLeft: '90px' }}>
                <div style={{ fontSize: '40px', paddingTop: '2%' }}>
                    {textoFeria}
                </div>
                <FeriaLista cambioFeria={this.cambioFeria}></FeriaLista>
                <div style={{ fontSize: '40px', paddingTop: '5%' }}>
                    Posición del televisor en el mapa
                </div>
                {button}
                <div
                    className="modal-mapa"
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        margin: 'auto',
                        width: "35%",
                        height: "35%",
                        zIndex: 10,
                        backgroundColor: "#e6428b",
                        padding: "20px",
                        fontSize: "18px",
                        borderRadius: "20px",
                        boxShadow: "0px 0px 6px #ccc",
                        color: "#fff"
                    }}
                    data-attribute={!this.state.popUpVisible ? 'hidden' : ''}
                    hidden={!this.state.popUpVisible ? 'hidden' : ''}
                >
                    <p style={{ fontWeight: "bold", fontSize: '50px', marginTop: '20px' }}>{this.state.texto}</p>
                </div>
            </div>
        )
    }
}

const buttonStyle = {
    textAlign: 'center',
    borderRadius: 10,
    width: 120,
    height: 120,
    color: 'white',
    fondWeight: 'bold',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: '40%',
    marginTop: '2%'
}


export default Configuracion;