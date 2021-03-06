import React from 'react';
import Correct from '../correct.wav'
import Fail from '../fail.wav'

// var audioCorrect = new Audio(Correct);
// var audioFail = new Audio(Fail);

class Answers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false,
            classNames: ['', '', '', ''],
            seconds: 5
        }
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    checkAnswer(e) {
        let { isAnswered } = this.props;

        if (!isAnswered) {
            let elem = e.currentTarget;
            let { correct, increaseScore } = this.props;
            let answer = Number(elem.dataset.id);
            let updatedClassNames = this.state.classNames;

            if (answer === correct) {
                updatedClassNames = ['', '', '', ''];
                updatedClassNames[answer - 1] = 'right';
                // audioCorrect.currentTime = 0;
                // audioCorrect.play();
                increaseScore();
            }
            else {
                updatedClassNames = ['', '', '', ''];
                updatedClassNames[answer - 1] = 'wrong';
                // audioFail.currentTime = 0;
                // audioFail.play();
            }

            this.setState({
                classNames: updatedClassNames
            })

            this.props.showButton();
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds } = this.state
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                clearInterval(this.myInterval);
            }
        }, 1000)
    }

    render() {
        let { answers } = this.props;
        let { classNames } = this.state;


        if (!this.props.isAnswered)
            classNames = ['', '', '', ''];

        if (answers == null) {
            return (
                <div id="answers">
                    <ul>
                    </ul>
                </div>
            )
        }

        return (
            <div id="answers">
                <ul>
                    <li onClick={this.checkAnswer} className={classNames[0] + " item-focusable"} data-id="1"><span>A</span> <p>{answers[0]}</p></li>
                    <li onClick={this.checkAnswer} className={classNames[1] + " item-focusable"} data-id="2"><span>B</span> <p>{answers[1]}</p></li>
                    <li onClick={this.checkAnswer} className={classNames[2] + " item-focusable"} data-id="3"><span>C</span> <p>{answers[2]}</p></li>
                    <li onClick={this.checkAnswer} className={classNames[3] + " item-focusable"} data-id="4"><span>D</span> <p>{answers[3]}</p></li>
                </ul>
                
            </div>
        );
    }
}

export default Answers;