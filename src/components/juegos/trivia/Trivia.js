import React from 'react';
import Answers from './Answers';
import Popup from './Popup';
import BotonOpcion from '../../identificate/BotonOpcion.js'

import './Trivia.css'

/* Basado en: https://github.com/florinpop17/quiz-app/tree/master/app */

class Trivia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nr: 0,
            total: dataTrivia.length,
            showButton: false,
            questionAnswered: false,
            score: 0,
            displayPopup: 'flex',
            final: false,
            premio: 0,
            seconds: 6
        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
    }

    pushData(nr) {
        this.setState({
            question: dataTrivia[nr].enunciado,
            answers: [dataTrivia[nr].alternativas[0].contenido, dataTrivia[nr].alternativas[1].contenido, dataTrivia[nr].alternativas[2].contenido, dataTrivia[nr].alternativas[3].contenido],
            correct: dataTrivia[nr].correcto,
            total: dataTrivia.length,
            nr: this.state.nr + 1
        });
    }

    nextQuestion() {
        let { nr, total, score } = this.state;

        if (nr === total) {
            this.setState({
                displayPopup: 'flex',
                correct: -1,
                final: true,
                seconds: 6
            });
            this.finalizarTrivia();
        } else {
            console.log("next")
            this.pushData(nr);
            this.setState({
                showButton: false,
                questionAnswered: false,
                seconds: 6
            });

        }

    }

    finalizarTrivia() {
        var elems = document.querySelectorAll(".item-focusable");
        [].forEach.call(elems, function (el) {
            el.classList.remove("item-focusable");
            el.classList.remove("focused-item");
        });
        document.getElementById("btn-continuar-trivia").className = "item-focusable focused-item";
        document.getElementById("btn-continuar-trivia").focus();
    }

    handleShowButton() {
        this.setState({
            questionAnswered: true,
            seconds: 5
        });
        setTimeout(() => {
            this.nextQuestion();
        }, 5000);
    }

    handleStartQuiz() {
        this.setState({
            displayPopup: 'none',
            nr: 1
        });
    }

    handleIncreaseScore() {
        this.setState({
            score: this.state.score + 1
        });
    }

    parsearDatos() {
        loopi:
        for (let i = 0; i < dataTrivia.length; i++) {
            loopj:
            for (let j = 0; j < dataTrivia[i].alternativas.length; j++) {
                if (dataTrivia[i].alternativas[j].esCorrecto == 1) {
                    dataTrivia[i].correcto = j + 1;
                    continue loopi;
                }
            }
            dataTrivia[i].correcto = 0;
        }
    }

    componentDidMount() {
        let localTelevisor = JSON.parse(localStorage.getItem("localTelevisor"));
        if (localTelevisor === null) {
            //alert("Por favor, seleccione primero un televisor.");
            window.location.pathname = "/configuracion";
        }
        //https://demo3419583.mockable.io/trivia
        fetch(`https://fmh7fxbfoh.execute-api.us-east-2.amazonaws.com/Despliegue/api/juegos/trivia/televisor/${localTelevisor.idTelevisor}`)
            .then(res => res.json())
            .then((data) => {
                console.log("BACK:")
                console.log(data.preguntas);
                dataTrivia = data.preguntas;
                this.setState({ premio: data.monto })
                this.parsearDatos();
                let { nr } = this.state;
                this.pushData(nr);
            })
            .catch(console.log)

        this.myInterval = setInterval(() => {
            const { seconds } = this.state
            if (seconds > 0) {
                if (this.state.seconds === 6) return;
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                this.setState({ seconds: 5 })
            }
        }, 1000)
    }

    render() {
        if (dataTrivia === null || dataTrivia.length === 0) {
            return (
                <div style={{ fontSize: '30px' }}>El juego no está implementado</div>
            )
        }

        let { nr, total, question, answers, correct, showButton, questionAnswered, displayPopup, score, premio, seconds } = this.state;
        return (
            <div className="container">

                <Popup style={{ display: displayPopup }} score={score} premio={premio} total={total} startQuiz={this.handleStartQuiz} final={this.state.final} />

                <div className="row">
                    <div className="col-lg-10 col-lg-offset-1">
                        <div id="question">
                            <h4>Pregunta {nr}/{total}</h4>
                            <p>{question}</p>
                        </div>
                        <Answers answers={answers} correct={correct} showButton={this.handleShowButton} isAnswered={questionAnswered} increaseScore={this.handleIncreaseScore} />


                        {seconds === 6 ?
                            ''
                            :
                            <div style={{
                                display: 'block',
                                borderRadius: '50%',
                                backgroundColor: '#0094da',
                                border: '2px solid white',
                                width: '36px',
                                height: '36px',
                                padding: '8px',
                                textAlign: 'center',
                                font: '32px Arial',
                                margin: 'auto',
                                color: 'black',
                                backgroundImage: valorGradient(seconds)
                            }}>
                                {seconds}
                            </div>
                        }

                    </div>
                </div>
            </div>
        );
    }
};

function valorGradient(sec) {
    const total = 5;
    switch (sec) {
        case 5:
            return 'none';
        case 4:
            return 'linear-gradient(180deg, transparent 50%, #0094da 50%),linear-gradient(90deg, white 50%, transparent 50%)';
        case 3:
            return 'linear-gradient(90deg, white 50%, transparent 50%)';
        case 2:
            return 'linear-gradient(180deg, transparent 50%, white 50%), linear-gradient(90deg, white 50%, transparent 50%)';
        case 1:
            return 'linear-gradient(126deg, transparent 50%, white 50%), linear-gradient(90deg, white 50%, transparent 50%)';
    }
}

export default Trivia;

var dataTrivia = [];