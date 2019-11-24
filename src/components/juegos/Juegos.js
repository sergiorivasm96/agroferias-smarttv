import React from 'react'
import BotonOpcion from '../identificate/BotonOpcion.js'

class Juegos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ruleta: '',
            memoria: '',
            trivia: ''
        }
    }

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

    componentDidMount() {
        let localTelevisor = JSON.parse(localStorage.getItem("localTelevisor"));
        if (localTelevisor === null) {
            window.location.pathname = "/configuracion";
        }

        //Ruleta
        fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/juegos/ruleta/televisor/${localTelevisor.idTelevisor}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                if (data === null || data.items_ruleta === null || data.items_ruleta.length === 0)
                    this.setState({ ruleta: 'none' });
            })
            .catch(err => {
                console.log(err);
                this.setState({ ruleta: 'none' });
            })

        //Memoria
        fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/juegos/memoria/televisor/${localTelevisor.idTelevisor}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                if (data === null || data.items_memoria === null || data.items_memoria.length === 0)
                    this.setState({ memoria: 'none' });
            })
            .catch(err => {
                console.log(err);
                this.setState({ memoria: 'none' });
            })

        //Trivia
        fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/juegos/trivia/televisor/${localTelevisor.idTelevisor}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                if (data === null || data.preguntas === null || data.preguntas.length === 0)
                    this.setState({ trivia: 'none' });
            })
            .catch(err => {
                console.log(err);
                this.setState({ trivia: 'none' });
            })
    }

    render() {
        if (this.state.ruleta === 'none' && this.state.memoria === 'none' && this.state.trivia === 'none')
            return (
                <div style={{ marginLeft: '25%', marginTop: '10%', fontSize: '30px', textAlign: 'center', width: '50%' }}>
                    No hay juegos implementados.
                </div>
            )

        return (
            <div>
                <div style={{ marginLeft: '25%', marginTop: '10%', fontSize: '30px', textAlign: 'center', width: '50%' }}>
                    Por favor, elige uno de nuestros juegos.
                </div>
                <BotonOpcion mostrar={this.state.ruleta} texto='RULETA' funClick={this.handlerClickRuleta}></BotonOpcion>
                <BotonOpcion mostrar={this.state.memoria} texto='MEMORIA' funClick={this.handlerClickMemoria}></BotonOpcion>
                <BotonOpcion mostrar={this.state.trivia} texto='TRIVIA' funClick={this.handlerClickTrivia}></BotonOpcion>

            </div>
        )
    }
}

export default Juegos;
