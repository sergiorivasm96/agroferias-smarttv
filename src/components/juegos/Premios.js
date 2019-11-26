import React from 'react';
import axios from 'axios';
import BotonOpcion from '../identificate/BotonOpcion.js'

import './Juegos.css'

var imgDinero = 'https://static3.depositphotos.com/1007373/239/i/450/depositphotos_2392001-stock-photo-give-me-money.jpg';

class Premios extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let resultado = parseInt(localStorage.getItem("resultadoPremio"));
        let monto = parseFloat(localStorage.getItem('mensajePremio'));
        let usuario = parseInt(localStorage.getItem("idUsuario"));
        if (resultado === 1) {

            let obj = {
                "idCliente": usuario,
                "cambio": monto
            };

            axios.post('https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/usuario/cliente/aumentarSaldo', obj)
                .then(res => {
                    console.log(res.data.mensaje);
                })
                .then(() => {
                    console.log("Se aumentó el saldo del usuario " + usuario + " en " + monto);
                })
                .catch(console.log);
        }
    }


    render() {
        let resultado = parseInt(localStorage.getItem("resultadoPremio"));
        let mensaje = localStorage.getItem('mensajePremio');
        console.log(mensaje)

        let titulo = resultado === 1 ? "Felicitaciones!" : "Perdiste";

        return (
            <div>

                <div style={{ textAlign: 'center', marginTop: resultado === 1 ? '' : '15%' }}>
                    <h1 className='titulosPremios'>{titulo}</h1>

                    {resultado === 1 ?
                        <div style={{ marginTop: '-2%' }}>
                            <h2>Ganaste: S/. {mensaje} y se han <br></br> recargado a tu cuenta </h2>
                            <img style={{ width: '400px' }} src={imgDinero}></img>
                        </div>
                        :
                        ''}
                </div>

                <div style={{ marginTop: resultado === 1 ? '1%' : '5%' }}>
                    <BotonOpcion texto='Regresar' funClick={regresar} ></BotonOpcion>
                </div>

            </div>
        );
    }
}

function regresar() {
    localStorage.removeItem('mensajePremio');
    localStorage.removeItem('imagenPremio');
    //window.history.back();
    window.location.pathname = "/perfil";
}

export default Premios;