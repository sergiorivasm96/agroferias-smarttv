import React from 'react';
import BotonOpcion from '../identificate/BotonOpcion.js'

import './Juegos.css'

class Premios extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let mensaje = localStorage.getItem('mensajePremio');
        let imagen = localStorage.getItem('imagenPremio');

        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1 className='titulosPremios'>
                        Felicitaciones!</h1>

                    <h2>{mensaje}</h2>

                    <img style={{
                        width: '400px'
                    }}
                        src={imagen}></img>
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