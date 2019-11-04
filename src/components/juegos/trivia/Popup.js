import React from 'react';

class Popup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: 'start',
            title: 'Bienvenido a la Trivia',
            text: 'Selecciona las opciones en las pantallas que aparecerán a continuación.',
            buttonText: 'Iniciar'
        };

        this.popupHandle = this.popupHandle.bind(this);
    }

    popupHandle() {
        console.log("click")
        let { time } = this.state;

        if (time === 'start') {
            this.setState({
                time: 'end',
                title: 'Felicitaciones!',
                buttonText: 'Reiniciar'
            });

            this.props.startQuiz();
        } else {
            window.location.reload();// restart the application
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("recive: " + nextProps.final)
        if (nextProps.final) {
            setTimeout(() => {
                window.location.reload();
            }, 6000);
        }
        this.setState({
            text: 'Has terminado la trivia. <br /> Obtuviste: <strong>' + this.props.score + '</strong> de <strong>' + this.props.total + '</strong> respuestas correctas.'
        });
    }

    createMarkup(text) {
        return { __html: text };
    }

    componentDidMount() {
        if (this.state.time == 'start')
            setTimeout(() => {
                this.popupHandle();
            }, 3000);
    }

    render() {

        let { title, text, buttonText } = this.state;

        let { style } = this.props;

        return (
            <div className="popup-container" style={style}>
                <div className="container">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="popup">
                            <h1>{title}</h1>
                            <p dangerouslySetInnerHTML={this.createMarkup(text)} />
                            <br></br><br></br>
                            {/* <button className="fancy-btn item-focusable" onClick={this.popupHandle}>{buttonText}</button> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup
