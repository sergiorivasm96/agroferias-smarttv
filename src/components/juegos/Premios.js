import React from 'react';
import BotonOpcion from '../identificate/BotonOpcion.js'

import './Juegos.css'

var imgDinero = 'https://static3.depositphotos.com/1007373/239/i/450/depositphotos_2392001-stock-photo-give-me-money.jpg';

class Premios extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let resultado = parseInt(localStorage.getItem("resultadoPremio"));
        let mensaje = localStorage.getItem('mensajePremio');
        console.log(mensaje)

        let titulo = resultado === 1 ? "Felicitaciones!" : "Perdiste ☹";

        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1 className='titulosPremios'>
                        {titulo}</h1>

                    <h2>{resultado === 1 ? "Ganaste: \n" + "S/. " +  mensaje : ''}</h2>

                    <img style={{
                        width: '400px'
                    }}
                        src={imgDinero}></img>
                </div>
                <BotonOpcion texto='Regresar' funClick={regresar} ></BotonOpcion>
            </div>
        );
    }
}

function regresar() {
    localStorage.removeItem('mensajePremio');
    localStorage.removeItem('imagenPremio');
    window.history.back();
}

export default Premios;