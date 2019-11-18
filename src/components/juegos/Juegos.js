import React from 'react'
import BotonOpcion from '../identificate/BotonOpcion.js'

class Juegos extends React.Component {
    
    handlerClickRuleta() {
        console.log('ruleta')
        window.location.pathname = "/juegos/ruleta"
    }

    handlerClickMemoria() {
        console.log('memoria')
        window.location.pathname = "/juegos/memoria"
    }

    handlerClickTrivia() {
        console.log('trivia')
        window.location.pathname = "/juegos/trivia"
    }

    render() {
        return (
            <div>
                <div style={{ marginLeft: '25%', marginTop: '10%', fontSize: '30px', textAlign: 'center', width: '50%' }}>
                    Por favor, elige uno de nuestros juegos.
                </div>
                <BotonOpcion texto='RULETA' funClick={this.handlerClickRuleta}></BotonOpcion>
                <BotonOpcion texto='MEMORIA' funClick={this.handlerClickMemoria}></BotonOpcion>
                <BotonOpcion texto='TRIVIA' funClick={this.handlerClickTrivia}></BotonOpcion>

            </div>
        )
    }
}

export default Juegos;
