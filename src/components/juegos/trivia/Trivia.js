import React from 'react';
import data from './data';
import Answers from './Answers';
import Popup from './Popup';

import './Trivia.css'

/* Basado en: https://github.com/florinpop17/quiz-app/tree/master/app */

class Trivia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nr: 0,
            total: data.length,
            showButton: false,
            questionAnswered: false,
            score: 0,
            displayPopup: 'flex',
            final: false
        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
    }

    pushData(nr) {
        this.setState({
            question: data[nr].question,
            answers: [data[nr].answers[0], data[nr].answers[1], data[nr].answers[2], data[nr].answers[3]],
            correct: data[nr].correct,
            nr: this.state.nr + 1
        });
    }

    componentWillMount() {
        let { nr } = this.state;
        this.pushData(nr);
    }

    nextQuestion() {
        let { nr, total, score } = this.state;

        if (nr === total) {
            this.setState({
                displayPopup: 'flex',
                correct: -1,
                final: true
            });
        } else {
            console.log("next")
            this.pushData(nr);
            this.setState({
                showButton: false,
                questionAnswered: false
            });

        }

    }

    handleShowButton() {
        this.setState({
            showButton: true,
            questionAnswered: true
        })
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

    render() {
        let { nr, total, question, answers, correct, showButton, questionAnswered, displayPopup, score } = this.state;
        console.log("render: " + this.state.final)
        return (
            <div className="container">

                <Popup style={{ display: displayPopup }} score={score} total={total} startQuiz={this.handleStartQuiz} final={this.state.final} />

                <div className="row">
                    <div className="col-lg-10 col-lg-offset-1">
                        <div id="question">
                            <h4>Pregunta {nr}/{total}</h4>
                            <p>{question}</p>
                        </div>
                        <Answers answers={answers} correct={correct} showButton={this.handleShowButton} isAnswered={questionAnswered} increaseScore={this.handleIncreaseScore} />
                        <div id="submit">
                            {showButton ? <button className="item-focusable fancy-btn" onClick={this.nextQuestion} >{nr === total ? 'Terminar' : 'Siguiente pregunta'}</button> : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Trivia;