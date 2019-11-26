import React from 'react'
import './Memoria.css'
import Correct from '../correct.wav'
import Fail from '../fail.wav'
import BotonOpcion from '../../identificate/BotonOpcion.js'

// var audioCorrect = new Audio(Correct);
// var audioFail = new Audio(Fail);
var numCartas = 0;

class Memoria extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //frameworks: ['angular2', 'vue', 'react', 'grunt', 'phantomjs', 'ember', 'babel', 'ionic', 'gulp', 'meteor', 'yeoman', 'yarn', 'nodejs', 'bower', 'browserify'],
            inicio: true,
            frameworks: [],
            duplicatedFrameworks: [],
            randomizedFrameworks: [],
            finalizedFrameworks: [],
            openedFrameworks: [],
            minutes: 3,
            seconds: 0,
            texto: '',
            popUpVisible: false,
            premio: 0
        }
        //this.start()
    }

    handleClick(name, index) {
        if (this.state.openedFrameworks.length === 2) {
            return;
        } else {
            let framework = {
                name,
                index
            }
            let finalizedFrameworks = this.state.finalizedFrameworks
            let frameworks = this.state.openedFrameworks
            finalizedFrameworks[index].close = false
            frameworks.push(framework)
            this.setState({
                openedFrameworks: frameworks,
                finalizedFrameworks: finalizedFrameworks
            })
            if (this.state.openedFrameworks.length === 2) {
                setTimeout(() => {
                    this.check()
                }, 750)
            }
        }
    }

    check() {
        let finalizedFrameworks = this.state.finalizedFrameworks
        if ((this.state.openedFrameworks[0].name === this.state.openedFrameworks[1].name) && (this.state.openedFrameworks[0].index !== this.state.openedFrameworks[1].index)) {
            finalizedFrameworks[this.state.openedFrameworks[0].index].complete = true
            finalizedFrameworks[this.state.openedFrameworks[1].index].complete = true
            // audioCorrect.currentTime = 0;
            // audioCorrect.play();
            numCartas--;
        } else {
            finalizedFrameworks[this.state.openedFrameworks[0].index].close = true
            finalizedFrameworks[this.state.openedFrameworks[1].index].close = true
            // audioFail.currentTime = 0;
            // audioFail.play();
        }
        if (numCartas === 0) {
            this.mostrarAlerta(1);
            this.finalizarMemoria();
        }
        this.setState({
            finalizedFrameworks,
            openedFrameworks: []
        })
    }

    start(items) {
        this.state.frameworks = []
        for (let i = 0; i < items.length; i++) {
            this.state.frameworks.push(items[i].urlImage);
        }

        console.log("Imagenes: " + this.state.frameworks)
        let finalizedFrameworks = [];
        this.state.duplicatedFrameworks = this.state.frameworks.concat(this.state.frameworks)
        this.state.randomizedFrameworks = this.shuffle(this.state.duplicatedFrameworks)
        this.state.randomizedFrameworks.map((name, index) => {
            finalizedFrameworks.push({
                name,
                close: true,
                complete: false,
                fail: false
            })
        })
        this.state.finalizedFrameworks = finalizedFrameworks
    }

    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array
    }

    mostrarAlerta(resultado) {
        //this.setState({ texto: mensaje, popUpVisible: true });
        setTimeout(() => {
            this.recibirPremio(this.state.premio, resultado);
        }, 2000)
    }

    recibirPremio(texto, resultado) {
        localStorage.setItem('resultadoPremio', resultado);
        localStorage.setItem('mensajePremio', texto);
        window.location.pathname = '/premio';
    }

    componentDidMount() {

        let localTelevisor = JSON.parse(localStorage.getItem("localTelevisor"));
        if (localTelevisor === null) {
            //alert("Por favor, seleccione primero un televisor.");
            window.location.pathname = "/configuracion";
        }
        console.log("Mi tele es: " + localTelevisor.idTelevisor)

        if (this.state.inicio === false)
            return;

        fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/juegos/memoria/televisor/${localTelevisor.idTelevisor}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data.items_memoria);
                this.start(data.items_memoria);
                numCartas = data.items_memoria.length;

                let segundos = data.duracion;
                let minutos = Math.floor(segundos / 60);
                segundos = segundos - minutos * 60;
                this.setState({ minutes: minutos, seconds: segundos, inicio: false, premio: data.monto })
                this.iniciarCronometro();

                this.forceUpdate();
            })
            .catch(console.log)

    }

    iniciarCronometro() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    this.recibirPremio('', 0);
                    this.finalizarMemoria();
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000);
    }

    finalizarMemoria() {
        var elems = document.querySelectorAll(".item-focusable");
        [].forEach.call(elems, function (el) {
            el.classList.remove("item-focusable");
            el.classList.remove("focused-item");
        });
        document.getElementById("boton-reintentar").className = "item-focusable focused-item";
        document.getElementById("boton-reintentar").focus();
        clearInterval(this.myInterval);
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        if (this.state.frameworks === null || this.state.frameworks.length === 0) {
            return (
                <div style={{ fontSize: '30px' }}>El juego no está implementado</div>
            )
        }

        const { minutes, seconds } = this.state
        return (
            <div id="app">
                <h1 className="timer">
                    <span style={{ color: '#ed217c' }}>Tiempo: </span>
                    <span >{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                </h1>
                <div className="playground">
                    {
                        this.state.finalizedFrameworks.map((framework, index) => {
                            return <Card framework={framework.name} click={() => { this.handleClick(framework.name, index) }} close={framework.close} complete={framework.complete} key={index} />
                        })
                    }
                </div>

                <div
                    className="modal modal-mapa"
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        margin: 'auto',
                        width: "45%",
                        height: "42%",
                        zIndex: 10,
                        backgroundColor: "black",
                        borderRadius: "20px",
                        boxShadow: "0px 0px 6px #ccc",
                        color: "#fff",
                        textAlign: 'center',
                        border: 'solid #ed217c 7px'
                    }}
                    data-attribute={!this.state.popUpVisible ? 'hidden' : ''}
                    hidden={!this.state.popUpVisible ? 'hidden' : ''}
                >
                    <p style={{ fontWeight: "bold", fontSize: '130px', lineHeight: '0px', marginTop: '90px', marginBottom: '60px' }}>{this.state.texto}</p>
                    <BotonOpcion id="boton-reintentar" texto='REINTENTAR' funClick={() => { window.location.reload(); }}></BotonOpcion>
                </div>

            </div>
        )
    }
}

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    clicked(framework) {
        this.props.click(framework)
    }
    render() {
        return (
            <div className={"item-focusable card" + (!this.props.close ? ' opened' : '') + (this.props.complete ? ' matched' : '')} onClick={() => this.clicked(this.props.framework)}>
                <div className="front">
                    ?
                </div>
                <div className="back">
                    <img src={this.props.framework} width={70} height={70} />
                </div>
            </div>
        )
    }
}

export default Memoria;