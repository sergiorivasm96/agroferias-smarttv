import React from 'react';
import Correct from '../correct.wav'
import Fail from '../fail.wav'
import BotonOpcion from '../../identificate/BotonOpcion.js'

var audioCorrect = new Audio(Correct);
var audioFail = new Audio(Fail);

class Popup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: 'start',
            title: 'Bienvenido a la Trivia',
            text: 'Selecciona las opciones en las pantallas que aparecerán a continuación.',
            buttonText: 'Iniciar',
            styleButton: "none",
            audio: null
        };

        this.popupHandle = this.popupHandle.bind(this);
    }

    popupHandle() {
        let { time } = this.state;

        if (time === 'start') {
            this.setState({
                time: 'end',
                title: 'Felicitaciones!',
                buttonText: 'Reiniciar'
            });

            this.props.startQuiz();
        } else {
            window.location.pathname = '/premio';
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("recibe: " + nextProps.final)
        if (nextProps.final) {
            /* setTimeout(() => {
                window.location.reload();
            }, 6000); */
            let titulo;
            let audioFin;
            if (this.props.score === this.props.total) {
                titulo = 'Felicitaciones!';
                audioFin = audioCorrect;
                setTimeout(() => {
                    this.recibirPremio(this.props.premio, 1);
                }, 5000)
            } else {
                titulo = 'Lo lamento ☹️';
                audioFin = audioFail;
                setTimeout(() => {
                    this.recibirPremio('', 0);
                }, 5000)
            }
            audioFin.currentTime = 0;
            audioFin.play();
            this.setState({
                styleButton: '',
                title: titulo,
                text: 'Has terminado la trivia. <br /> Obtuviste: <strong>' + this.props.score + '</strong> de <strong>' + this.props.total + '</strong> respuestas correctas.'
            });
        }
    }

    recibirPremio(texto, resultado) {
        localStorage.setItem('resultadoPremio', resultado);
        localStorage.setItem('mensajePremio', texto);
        window.location.pathname = '/premio';
    }

    createMarkup(text) {
        return { __html: text };
    }

    componentDidMount() {
        if (this.props.final) {
            this.setState({
                text: 'Has terminado la trivia. <br /> Obtuviste: <strong>' + this.props.score + '</strong> de <strong>' + this.props.total + '</strong> respuestas correctas.'
            });
        }

        if (this.state.time === 'start')
            setTimeout(() => {
                this.popupHandle();
            }, 3000);
    }

    render() {

        let { title, text, styleButton } = this.state;

        let { style } = this.props;

        return (
            <div className="popup-container" style={style}>
                <div className="container">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="popup">
                            <h1>{title}</h1>
                            <p dangerouslySetInnerHTML={this.createMarkup(text)} />
                            <br></br><br></br>
                            <BotonOpcion id="btn-continuar-trivia" texto='Continuar' mostrar={styleButton} funClick={this.popupHandle}></BotonOpcion>
                            <br></br>
                            {/* <button style={{ display: styleButton }} className="fancy-btn item-focusable" onClick={this.popupHandle}>Continuar</button> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup
